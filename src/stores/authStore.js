import { createUserWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { auth, usersRef, storage } from "@/firebase";
import router from "@/router";
import { addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    user: {},
    error: null,
    loading: false,
  });

  const handleRegister = async (userData) => {
    state.loading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      state.user = userCredential.user;
      await createUserInFireStore(userData);
      router.push("/");
    } catch (error) {
      state.error = error.message;
    } finally {
      state.loading = false;
    }
  };

  const createUserInFireStore = async ({
    firstName,
    lastName,
    mobileNo,
    image,
    email,
  }) => {
    const storageRef = ref(storage, image.name);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    addDoc(usersRef, {
      firstName,
      lastName,
      mobileNo,
      image: downloadURL,
      email,
    });
  };

  return { handleRegister, ...toRefs(state) };
});
