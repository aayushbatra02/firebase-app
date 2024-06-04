import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
  measurementId: process.env.VUE_APP_MEASURMENT_ID,
};

const firebaseapp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseapp);

const usersRef = collection(db, "users");

const auth = getAuth();
const storage = getStorage();

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

export { firebaseapp, auth, usersRef, storage, getCurrentUser, getUserByUID };
