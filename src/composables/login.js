import { auth, usersRef } from "@/firebase";
import { useLoginStore } from "@/stores/loginStore";
import { authenticate } from "@/utils/authenticate";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

export const useLogin = () => {
  const { handleLogin } = useLoginStore();
  const { error } = storeToRefs(useLoginStore());
  const loginData = reactive({
    email: "",
    password: "",
  });

  const loginErrorMessage = reactive({
    email: "",
    password: "",
  });

  const validateLoginForm = ref(false);

  const validate = (fieldName) => {
    error.value = null;
    if (validateLoginForm.value) {
      loginErrorMessage[fieldName] = authenticate(
        fieldName,
        loginData[fieldName],
        "login"
      );
    }
  };

  const isErrorPresent = () => {
    let isPresent = false;
    for (let key in loginErrorMessage) {
      if (loginErrorMessage[key]) {
        isPresent = true;
      }
    }
    return isPresent;
  };

  const loginUser = () => {
    validateLoginForm.value = true;
    for (let key in loginData) {
      validate(key);
    }
    if (!isErrorPresent()) {
      handleLogin({ email: loginData.email, password: loginData.password });
    }
  };

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

  return { loginData, loginErrorMessage, loginUser, validate, getCurrentUser, getUserByUID };
};
