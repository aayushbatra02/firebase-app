import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDeyiRz4rxcWNXdhhFTv2zCCdGsZCCUYdM",
  authDomain: "test-10c5c.firebaseapp.com",
  projectId: "test-10c5c",
  storageBucket: "test-10c5c.appspot.com",
  messagingSenderId: "997620516950",
  appId: "1:997620516950:web:b04a4cc8d7ba3ed78753f7",
  measurementId: "G-PKP0MVPWDH",
};

const firebaseapp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseapp);

const todoRef = collection(db, "testCollection");
const usersRef = collection(db, "users");

const auth = getAuth();
const storage = getStorage();

export { todoRef, firebaseapp, auth, usersRef, storage };
