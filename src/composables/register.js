import { useAuthStore } from "@/stores/authStore";
import { authenticate } from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

export const useRegister = () => {
  const { handleRegister } = useAuthStore();
  const { error } = storeToRefs(useAuthStore());
  const userData = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: null,
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
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

  const validateForm = ref(false);

  const uploadImage = async (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    const readFileAsync = (file) => {
      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      userData.profilePhoto = await readFileAsync(image);
      userData.image = image;
      validate("profilePhoto");
    } catch (error) {
      console.error(error);
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
        const minChar = fieldName === "mobileNo" ? 10 : 4;
        errorMessage[fieldName] = authenticate(
          fieldName,
          userData[fieldName]?.toString(),
          minChar
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

  const registerUser = () => {
    validateForm.value = true;
    for (let key in userData) {
      validate(key);
    }
    if (!isErrorPresent(errorMessage)) {
      handleRegister(userData);
    }
  };
  return { userData, uploadImage, registerUser, errorMessage, validate };
};
