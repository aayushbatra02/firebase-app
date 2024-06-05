import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuthStore } from "./authStore";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { auth } from "@/firebase";
import router from "@/router";

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

  const socialSignup = async (buttonText) => {
    let provider = null;
    switch (buttonText) {
      case "Google Signup": {
        provider = new GoogleAuthProvider();
        break;
      }
      case "Facebook Signup": {
        provider = new FacebookAuthProvider();
        break;
      }
      case "Twitter Signup": {
        provider = new TwitterAuthProvider();
        break;
      }
      default: {
        break;
      }
    }
    await signupWithFirebase(provider);
  };

  const signupWithFirebase = async (provider) => {
    try {
      const { createUserInFireStore } = useAuthStore();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const {
        displayName,
        email,
        photoURL: profilePhoto,
        phoneNumber: mobileNo,
        uid,
      } = user;
      const [firstName, lastName] = displayName.split(" ");
      const userDetails = {
        firstName,
        lastName,
        mobileNo,
        profilePhoto,
        email,
      };
      await createUserInFireStore(userDetails, uid, true);
      router.push("/");
    } catch (e) {
      if (e.message.includes("auth/account-exists-with-different-credential")) {
        state.error = `account exists with different credential`;
      }
      console.error(
        e.message,
        e.message.includes("auth/account-exists-with-different-credential")
      );
    }
  };

  return {
    handleLogin,
    socialSignup,
    ...toRefs(state),
  };
});
