import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import {
  ref as fireStoreRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/firebase";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { addDoc, collection } from "firebase/firestore";

export const usePostStore = defineStore("postStore", () => {
  const state = reactive({
    loading: false,
  });
  const createPost = async (postDetails) => {
    try {
      state.loading = true;
      await createPostInFirebase(postDetails);
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  const createPostInFirebase = async ({
    title,
    description,
    slug,
    postImage,
    taggedUsers
  }) => {
    try {
      const createdAt = Date.now();
      const updatedAt = createdAt;
      const storageRef = fireStoreRef(storage, `posts/${createdAt}`);
      const snapshot = await uploadBytes(storageRef, postImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const { userDetails } = storeToRefs(useUserStore());
      const postsRef = collection(db, "posts");
      const post = {
        title,
        description,
        slug,
        postImageUrl: downloadURL,
        taggedUsers,
        createdAt,
        updatedAt,
        createdBy: userDetails.value.uid,
        userDetails: {
          firstName: userDetails.value.firstName,
          lastName: userDetails.value.lastName,
          profilePhoto: userDetails.value.profilePhoto,
        },
      };
      addDoc(postsRef, post);
    } catch (e) {
      console.log(e);
    }
  };
  return { ...toRefs(state), createPost };
});
