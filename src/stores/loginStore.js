import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuthStore } from "./authStore";
import { defineStore, storeToRefs } from "pinia";
import { reactive, toRefs } from "vue";
import { auth } from "@/firebase";
import router from "@/router";
import {
  FACEBOOK_PROVIDER_TYPE,
  GOOGLE_PROVIDER_TYPE,
  TWITTER_PROVIDER_TYPE,
} from "@/contants";
import { useUserStore } from "./userStore";

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
      localStorage.setItem("loggedIn", true);
      router.push("/post-list");
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

  const socialSignup = async (providerType) => {
    let provider = null;
    switch (providerType) {
      case GOOGLE_PROVIDER_TYPE: {
        provider = new GoogleAuthProvider();
        break;
      }
      case FACEBOOK_PROVIDER_TYPE: {
        provider = new FacebookAuthProvider();
        break;
      }
      case TWITTER_PROVIDER_TYPE: {
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
      const { getUserByUID } = useUserStore();
      const { userDetails: userDetailsFromFirebase } = storeToRefs(
        useUserStore()
      );
      await getUserByUID(uid, 'currentUser');
      if (!(userDetailsFromFirebase.value)) {
        await createUserInFireStore(userDetails, uid, true);
      }
      localStorage.setItem("loggedIn", true);
      router.push("/post-list");
    } catch (e) {
      if (e.message.includes("auth/account-exists-with-different-credential")) {
        state.error = `account exists with different credential`;
      }
      console.error(e.message);
    }
  };

  return {
    handleLogin,
    socialSignup,
    ...toRefs(state),
  };
});
