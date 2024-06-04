import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { auth, usersRef } from "@/firebase";

export const useUser = () => {
  const userDetails = ref({});

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
    const q = query(usersRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          userDetails.value = doc.data();
        });
      } else {
        console.log("No user found with the specified UID");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return { getCurrentUser, getUserByUID, userDetails };
};
