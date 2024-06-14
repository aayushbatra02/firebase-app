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
  });

  const errorMessage = reactive({
    title: null,
    description: null,
    postImage: null,
  });

  const validateForm = ref(false);
  const showConfirmationModal = ref(false);
  const showTagUserModal = ref(false);

  const taggedUsers = ref([]);

  const closeConfirmationModal = () => {
    showConfirmationModal.value = false;
    router.push("/post-list");
  };

  const addImage = (e) => {
    postDetails.postImage = null;
    const profilePhoto = e.target.files[0];
    errorMessage.postImage = null;
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      postDetails.postImage = profilePhoto;
      postDetails.imageUrl = URL.createObjectURL(profilePhoto);
      validate("profilePhoto");
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

  const toggleTagUserModal = () => {
    showTagUserModal.value = !showTagUserModal.value;
  };

  const tagUser = (user) => {
    const isPresent = taggedUsers.value.find(({ uid }) => uid === user.uid);
    if (!isPresent) {
      taggedUsers.value.push(user);
    }
  };

  const removeTag = (user) => {
    taggedUsers.value = taggedUsers.value.filter(({ uid }) => uid !== user.uid);
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
    toggleTagUserModal,
    taggedUsers,
    tagUser,
    removeTag
  };
};
