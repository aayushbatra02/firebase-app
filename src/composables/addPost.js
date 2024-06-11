import { reactive, ref } from "vue";
import slugify from "slugify";
import { authenticate } from "@/utils/authenticate";
import { useRegister } from "./register";
import {
  ref as fireStoreRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { postsRef, storage } from "@/firebase";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { addDoc } from "firebase/firestore";

export const useAddPost = () => {
  const { isErrorPresent } = useRegister();
  const { clearData } = useRegister();
  const loading = ref(false);
  const postDetails = reactive({
    title: null,
    slug: null,
    description: "",
    postImage: null,
    imageUrl: null,
  });

  const errorMessage = reactive({
    title: null,
    description: null,
    postImage: null,
  });

  const validateForm = ref(false);

  const uploadImage = (e) => {
    postDetails.postImage = null;
    const profilePhoto = e.target.files[0];
    errorMessage.postImage = null;
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      postDetails.postImage = profilePhoto;
      postDetails.imageUrl = URL.createObjectURL(profilePhoto);
      validate("profilePhoto");
    } else {
      errorMessage.postImage = "Please Select Image Only";
    }
  };

  const deletePostImage = () => {
    postDetails.postImage = null;
    postDetails.imageUrl = null;
  };

  const validate = (fieldName) => {
    if (validateForm.value) {
      errorMessage[fieldName] = authenticate(
        fieldName,
        postDetails[fieldName],
        { min: 4 }
      );
    }
  };

  const addPost = async () => {
    validateForm.value = true;
    for (let key in errorMessage) {
      validate(key);
    }
    if (!isErrorPresent(errorMessage)) {
      loading.value = true;
      try {
        await createPostInFirebase(postDetails);
        clearData(postDetails);
      } catch (e) {
        console.error(e);
      } finally {
        validateForm.value = false;
      }
      loading.value = false;
    }
  };

  const createPostInFirebase = async ({
    title,
    description,
    slug,
    postImage,
  }) => {
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const storageRef = fireStoreRef(storage, `posts/${createdAt}`);
    const snapshot = await uploadBytes(storageRef, postImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const { userDetails } = storeToRefs(useUserStore());
    addDoc(postsRef, {
      title,
      description,
      slug,
      postImageUrl: downloadURL,
      createdAt,
      updatedAt,
      createdBy: userDetails.value.uid,
      userDetails: {
        firstName: userDetails.value.firstName,
        lastName: userDetails.value.lastName,
        profilePhoto: userDetails.value.profilePhoto,
      },
    });
  };

  const generateSlug = () => {
    validate("title");
    postDetails.slug = slugify(postDetails.title, {
      lower: true,
      strict: true,
    });
  };

  return {
    uploadImage,
    postDetails,
    deletePostImage,
    addPost,
    generateSlug,
    errorMessage,
    validate,
    loading
  };
};
