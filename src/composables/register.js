import router from "@/router";
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

  const uploadImage = (e) => {
    userData.imageUrl = null;
    const profilePhoto = e.target.files[0];
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      userData.profilePhoto = profilePhoto;
      userData.imageUrl = URL.createObjectURL(profilePhoto);
      validate("profilePhoto");
    } else {
      errorMessage.profilePhoto = "Please Select Image Only";
    }
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
        for (let key in userData) {
          userData[key] = null;
        }
        showConfirmationModal.value = true;
      }
    }
  };

  const closeConfirmationModal = () => {
    showConfirmationModal.value = !showConfirmationModal.value;
    router.push("/");
  };

<<<<<<< HEAD
  const route = useRoute();
  watch(
    () => route.path,
    (newPath) => {
      onLoginPage.value = newPath === "/login";
    },
    { immediate: true }
  );
=======
  const handleMobileInput = () => {
    userData.mobileNo = userData.mobileNo.replace(/\D/g, '')
    validate('mobileNo')
  }


>>>>>>> 2957769838dd01c1262ac2dce1e4873d6689dc9c
  return {
    userData,
    uploadImage,
    registerUser,
    errorMessage,
    validate,
    showConfirmationModal,
    closeConfirmationModal,
<<<<<<< HEAD
    onLoginPage,
=======
    handleMobileInput
>>>>>>> 2957769838dd01c1262ac2dce1e4873d6689dc9c
  };
};
