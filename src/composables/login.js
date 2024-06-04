import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useLoginStore } from "@/stores/loginStore";
import { authenticate } from "@/utils/authenticate";


export const useLogin = () => {
  const { handleLogin } = useLoginStore();
  const { error } = storeToRefs(useLoginStore());
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

  const isErrorPresent = () => {
    let isPresent = false;
    for (let key in loginErrorMessage) {
      if (loginErrorMessage[key]) {
        isPresent = true;
      }
    }
    return isPresent;
  };

  const loginUser = () => {
    validateLoginForm.value = true;
    for (let key in loginData) {
      validate(key);
    }
    if (!isErrorPresent()) {
      handleLogin({ email: loginData.email, password: loginData.password });
    }
  };

  
  return { loginData, loginErrorMessage, loginUser, validate };
};
