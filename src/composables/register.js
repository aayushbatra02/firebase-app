import { useAuthStore } from "@/stores/authStore";
import { authenticate } from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useRegister = () => {
  const { handleRegister } = useAuthStore();
  const { error } = storeToRefs(useAuthStore());
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

  const errorMessage = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: null,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onLoginPage = ref(false);

  const validateForm = ref(false);
  const showConfirmationModal = ref(false);

  const uploadImage = async (e) => {
    const profilePhoto = e.target.files[0];
    userData.profilePhoto = profilePhoto;
    userData.imageUrl = URL.createObjectURL(profilePhoto);
    validate("profilePhoto");
  };

  const validate = (fieldName) => {
    error.value = false;
    if (validateForm.value) {
      if (fieldName === "confirmPassword") {
        errorMessage[fieldName] = authenticate(fieldName, [
          userData.password,
          userData.confirmPassword,
        ]);
      } else {
        const condition = fieldName === "mobileNo" ? { equal: 10 } : { min: 4 };
        errorMessage[fieldName] = authenticate(
          fieldName,
          userData[fieldName]?.toString(),
          condition
        );
      }
    }
  };

  const isErrorPresent = (errorMessage) => {
    let isPresent = false;
    for (let key in errorMessage) {
      if (errorMessage[key]) {
        isPresent = true;
      }
    }
    return isPresent;
  };

  const registerUser = async () => {
    validateForm.value = true;
    for (let key in errorMessage) {
      validate(key);
    }
    if (!isErrorPresent(errorMessage)) {
      await handleRegister(userData);
      if (!error.value) {
        showConfirmationModal.value = true;
      }
    }
  };

  const closeConfirmationModal = () => {
    showConfirmationModal.value = !showConfirmationModal.value;
    for (let key in userData) {
      userData[key] = null;
    }
  };
  const route = useRoute();
  watch(
    () => route.path,
    (newPath) => {
      onLoginPage.value = newPath === "/login";
    },
    { immediate: true }
  );
  return {
    userData,
    uploadImage,
    registerUser,
    errorMessage,
    validate,
    showConfirmationModal,
    closeConfirmationModal,
    onLoginPage,
  };
};
