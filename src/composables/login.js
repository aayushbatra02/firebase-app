import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useLoginStore } from "@/stores/loginStore";
import { authenticate } from "@/utils/authenticate";
import { useRegister } from "./register";

export const useLogin = () => {
  const { handleLogin } = useLoginStore();
  const { error } = storeToRefs(useLoginStore());
  const { isErrorPresent } = useRegister();
  const loginData = reactive({
    email: "",
    password: "",
  });

  const loginErrorMessage = reactive({
    email: "",
    password: "",
  });

  const validateLoginForm = ref(false);

  const validate = (fieldName) => {
    error.value = null;
    if (validateLoginForm.value) {
      loginErrorMessage[fieldName] = authenticate(
        fieldName,
        loginData[fieldName],
        "login"
      );
    }
  };

  const loginUser = () => {
    validateLoginForm.value = true;
    for (let key in loginData) {
      validate(key);
    }
    if (!isErrorPresent(loginErrorMessage)) {
      handleLogin({ email: loginData.email, password: loginData.password });
    }
  };

  return { loginData, loginErrorMessage, loginUser, validate };
};
