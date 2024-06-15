import { reactive, ref } from "vue";
import slugify from "slugify";
import { authenticate } from "@/utils/authenticate";
import { useRegister } from "./register";
import { usePostStore } from "@/stores/postStore";
import router from "@/router";

export const useAddPost = () => {
  const { isErrorPresent, clearData } = useRegister();
  const { createPost } = usePostStore();
  const postDetails = reactive({
    title: null,
    slug: null,
    description: "",
    postImage: null,
    imageUrl: null,
    taggedUsers: [],
  });

  const errorMessage = reactive({
    title: null,
    description: null,
    postImage: null,
  });

  const validateForm = ref(false);
  const showConfirmationModal = ref(false);
  const showTagUserModal = ref(false);

  const closeConfirmationModal = () => {
    showConfirmationModal.value = false;
    router.push("/post-list");
  };  

  const addImage = (e) => {
    postDetails.postImage = null;
    const postImage = e.target.files[0];
    errorMessage.postImage = null;
    if (postImage && postImage.type.startsWith("image/")) {
      postDetails.postImage = postImage;
      postDetails.imageUrl = URL.createObjectURL(postImage);
      validate("postImage");
    } else {
      errorMessage.postImage = "Please Select Image Only";
    }
  };

  const deletePostImage = () => {
    postDetails.postImage = null;
    postDetails.imageUrl = null;
  };

  const validate = (fieldName) => {
    if (validateForm.value) {
      errorMessage[fieldName] = authenticate(
        fieldName,
        postDetails[fieldName],
        { min: 4 }
      );
    }
  };

  const addPost = async () => {
    validateForm.value = true;
    for (let key in errorMessage) {
      validate(key);
    }
    if (!isErrorPresent(errorMessage)) {
      await createPost(postDetails);
      validateForm.value = false;
      clearData(postDetails);
      showConfirmationModal.value = true;
    }
  };

  const generateSlug = () => {
    validate("title");
    postDetails.slug = slugify(postDetails.title, {
      lower: true,
      strict: true,
    });
  };

  const goBack = () => {
    router.push("/post-list");
  };

  const changeTagUserModalVisibility = () => {
    showTagUserModal.value = !showTagUserModal.value;
  };

  const tagUser = (user) => {
    const isPresent = postDetails.taggedUsers.find(
      ({ uid }) => uid === user.uid
    );
    if (!isPresent) {
      postDetails.taggedUsers.push(user);
    }
  };

  const removeTag = (user) => {
    postDetails.taggedUsers = postDetails.taggedUsers.filter(
      ({ uid }) => uid !== user.uid
    );
  };

  return {
    addImage,
    postDetails,
    deletePostImage,
    addPost,
    generateSlug,
    errorMessage,
    validate,
    showConfirmationModal,
    closeConfirmationModal,
    goBack,
    showTagUserModal,
    changeTagUserModalVisibility,
    tagUser,
    removeTag,
  };
};
