import { reactive, toRefs } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const state = reactive({
    userDetails: null,
    loadingUsers: false,
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
        const firebaseQuery = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(firebaseQuery);
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

  const getAllUsers = async () => {
    try {
      state.loadingUsers = true;
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return users;
    } catch (e) {
      console.error(e);
    } finally {
      state.loadingUsers = false;
    }
  };

  return {
    getCurrentUser,
    getUserByUID,
    getAllUsers,
    ...toRefs(state),
  };
});
