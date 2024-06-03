import { ref } from "vue";

export const useShowPassword = () => {
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };
  return {
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
  };
};
