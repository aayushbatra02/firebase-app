import { reactive, toRefs } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const state = reactive({
    userDetails: null,
  });

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  const getUserByUID = async (uid) => {
    try {
      if (uid) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          state.userDetails = doc.data();
          state.userDetails.id = doc.id;
        } else {
          console.error("No user found with the specified UID");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return {
    getCurrentUser,
    getUserByUID,
    ...toRefs(state),
  };
});
