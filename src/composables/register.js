import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { authenticate } from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useRegister = () => {
  const { handleRegister } = useAuthStore();
  const { error, showConfirmationModal } = storeToRefs(useAuthStore());

  const userData = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    imageUrl: null,
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const signupErrorMessage = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: null,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onLoginPage = ref(false);

  const validateSignupForm = ref(false);

  const uploadImage = (e) => {
    userData.imageUrl = null;
    const profilePhoto = e.target.files[0];
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      userData.profilePhoto = profilePhoto;
      userData.imageUrl = URL.createObjectURL(profilePhoto);
      validate("profilePhoto");
    } else {
      signupErrorMessage.profilePhoto = "Please Select Image Only";
    }
  };

  const validate = (fieldName) => {
    error.value = false;
    if (validateSignupForm.value) {
      if (fieldName === "confirmPassword") {
        signupErrorMessage[fieldName] = authenticate(fieldName, [
          userData.password,
          userData.confirmPassword,
        ]);
      } else {
        const condition = fieldName === "mobileNo" ? { equal: 10 } : { min: 4 };
        signupErrorMessage[fieldName] = authenticate(
          fieldName,
          userData[fieldName]?.toString(),
          condition
        );
      }
    }
  };

  const isErrorPresent = (signupErrorMessage) => {
    let isPresent = false;
    for (let key in signupErrorMessage) {
      if (signupErrorMessage[key]) {
        isPresent = true;
      }
    }
    return isPresent;
  };

  const clearData = (obj) => {
    for (let key in obj) {
      obj[key] = null;
    }
  };

  const registerUser = async () => {
    validateSignupForm.value = true;
    for (let key in signupErrorMessage) {
      validate(key);
    }
    if (!isErrorPresent(signupErrorMessage)) {
      await handleRegister(userData);
      if (!error.value) {
        clearData(userData);
        showConfirmationModal.value = true;
      }
    }
  };

  const closeConfirmationModal = () => {
    showConfirmationModal.value = !showConfirmationModal.value;
    router.push("/");
  };

  const route = useRoute();
  watch(
    () => route.path,
    (newPath) => {
      onLoginPage.value = newPath === "/login";
    },
    { immediate: true }
  );
  const handleMobileInput = () => {
    userData.mobileNo = userData.mobileNo.replace(/\D/g, "");
    validate("mobileNo");
  };

  return {
    userData,
    uploadImage,
    registerUser,
    signupErrorMessage,
    validate,
    closeConfirmationModal,
    onLoginPage,
    handleMobileInput,
  };
};
