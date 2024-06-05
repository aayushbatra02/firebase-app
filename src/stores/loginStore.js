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
  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();
    await socialSignup(provider);
  };

  const facebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    await socialSignup(provider);
  };

  const twitterSignup = async () => {
    const provider = new TwitterAuthProvider();
    await socialSignup(provider);
  };

  const socialSignup = async (provider) => {
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
      state.error = e;
      console.error(e);
    }
  };

  return {
    handleLogin,
    googleSignup,
    facebookSignup,
    twitterSignup,
    ...toRefs(state),
  };
});
