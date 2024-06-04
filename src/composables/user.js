import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { auth, usersRef } from "@/firebase";

export const useUser = () => {
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

  async function getUserByUID(uid) {
    const q = query(usersRef, where("uid", "==", uid));
    let user = {};
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });
        return user;
      } else {
        console.log("No user found with the specified UID");
        return {};
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return { getCurrentUser, getUserByUID };
};
