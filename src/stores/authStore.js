import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    user: {},
    error: null,
    loading: false,
    showConfirmationModal: false,
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
      await createUserInFireStore(userData, state.user.uid);
      localStorage.setItem("loggedIn", true);
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        state.error = "Email already in use !";
      } else {
        state.error = error.message;
      }
    } finally {
      state.loading = false;
    }
  };

  const createUserInFireStore = async (
    { firstName, lastName, mobileNo, profilePhoto, email },
    uid,
    socialAuth
  ) => {
    const storageRef = ref(storage, `profilePhotos/${uid}`);
    const snapshot = await uploadBytes(storageRef, profilePhoto);

    const downloadURL = socialAuth
      ? profilePhoto
      : await getDownloadURL(snapshot.ref);
    const usersRef = collection(db, "users");
    addDoc(usersRef, {
      firstName,
      lastName,
      mobileNo,
      profilePhoto: downloadURL,
      email,
      uid,
    });
  };

  return { handleRegister, createUserInFireStore, ...toRefs(state) };
});
