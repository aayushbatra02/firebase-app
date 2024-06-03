import { auth } from "@/firebase";
import router from "@/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useLoginStore = defineStore("loginStore", () => {
  const state = reactive({
    loading: false,
    error: null,
  });

  const handleLogin = async (loginData) => {
    try {
      state.loading = true;
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      router.push("/");
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/invalid-credential": {
          state.error = "Invalid Credential";
          break;
        }
        case "auth/too-many-requests": {
          state.error = "You have tried many times. Please try again later!!!";
          break;
        }
        default: {
          state.error = errorCode;
          break;
        }
      }
    } finally {
      state.loading = false;
    }
  };

  return { handleLogin, ...toRefs(state) };
});
