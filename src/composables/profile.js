import { onMounted, reactive, ref } from "vue";
import { getDocs, query, updateDoc, where } from "firebase/firestore";
import { storage, usersRef } from "@/firebase";
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRegister } from "./register";
import { authenticate } from "@/utils/authenticate";

export const useProfile = () => {
  const loading = ref(false);
  const buttonLoader = ref(false);
  const { getCurrentUser, getUserByUID } = useUserStore();
  const { userDetails } = storeToRefs(useUserStore());
  const { isErrorPresent } = useRegister();
  const editProfile = ref(false);
  const uploadedImage = ref(null);

  const editUserDetails = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: "",
  });

  const errorMessages = reactive({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: "",
  });

  const validateForm = ref(false);

  onMounted(async () => {
    loading.value = true;
    await updateUser();
    for (let key in userDetails.value) {
      editUserDetails[key] = userDetails.value[key]
        ? userDetails.value[key]
        : key === "profilePhoto"
        ? null
        : "N/A";
    }
    uploadedImage.value = userDetails.profilePhoto;
    loading.value = false;
  });

  const updateUser = async () => {
    const user = await getCurrentUser();
    await getUserByUID(user?.uid);
  };

  const validate = (fieldName) => {
    if (validateForm.value) {
      const condition = fieldName === "mobileNo" ? { equal: 10 } : { min: 4 };
      errorMessages[fieldName] = authenticate(
        fieldName,
        editUserDetails[fieldName]?.toString(),
        condition
      );
    }
  };

  const handleProfile = async () => {
    if (!editProfile.value) {
      editProfile.value = true;
      for (let key in editUserDetails) {
        if (editUserDetails[key] === "N/A") {
          editUserDetails[key] = "";
        }
      }
    } else {
      buttonLoader.value = true;
      validateForm.value = true;
      for (let key in errorMessages) {
        validate(key);
      }
      if (!isErrorPresent(errorMessages)) {
        const q = query(usersRef, where("uid", "==", userDetails.value?.uid));
        const querySnapshot = await getDocs(q);
        const docRef = querySnapshot.docs[0].ref;
        const storageRef = firebaseRef(
          storage,
          `profilePhotos/${userDetails.value.uid}`
        );
        if (uploadedImage.value) {
          const snapshot = await uploadBytes(storageRef, uploadedImage.value);
          const downloadURL = await getDownloadURL(snapshot.ref);
          editUserDetails.profilePhoto = downloadURL;
        }
        await updateDoc(docRef, editUserDetails);
        editProfile.value = false;
        await updateUser();
      }
      buttonLoader.value = false;
    }
  };

  const uploadImage = (e) => {
    editUserDetails.profilePhoto = null;
    const profilePhoto = e.target.files[0];
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      uploadedImage.value = profilePhoto;
      editUserDetails.profilePhoto = URL.createObjectURL(profilePhoto);
      validate("profilePhoto");
    } else {
      errorMessages.profilePhoto = "Please Select Image Only";
    }
  };

  const deleteProfilePic = () => {
    editUserDetails.profilePhoto = null;
  };

  return {
    handleProfile,
    uploadImage,
    deleteProfilePic,
    loading,
    editProfile,
    editUserDetails,
    validate,
    errorMessages,
    buttonLoader,
    userDetails
  };
};
