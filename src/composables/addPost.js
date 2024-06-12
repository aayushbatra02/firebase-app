import { reactive, ref } from "vue";
import slugify from "slugify";
import { authenticate } from "@/utils/authenticate";
import { useRegister } from "./register";
import { usePostStore } from "@/stores/postStore";
import router from "@/router";

export const useAddPost = () => {
  const { isErrorPresent } = useRegister();
  const { clearData } = useRegister();
  const { handleAddPost } = usePostStore();
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

  const closeConfirmationModal = () => {
    showConfirmationModal.value = false;
    router.push("/post-list");
  };
  const uploadImage = (e) => {
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
      await handleAddPost(postDetails);
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

  return {
    uploadImage,
    postDetails,
    deletePostImage,
    addPost,
    generateSlug,
    errorMessage,
    validate,
    showConfirmationModal,
    closeConfirmationModal,
  };
};
