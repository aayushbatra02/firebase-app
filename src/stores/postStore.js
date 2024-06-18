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
import { addDoc, collection, getDocs } from "firebase/firestore";

export const usePostStore = defineStore("postStore", () => {
  const state = reactive({
    loading: false,
    taggedUsers: [],
    descriptonImagesId: [],
    loadingPosts: false,
    postList: [],
  });
  const createPost = async (postDetails) => {
    try {
      state.loading = true;
      await createPostInFirebase(postDetails);
    } catch (e) {
      console.error(e);
    } finally {
      state.loading = false;
    }
  };

  const createPostInFirebase = async ({
    title,
    description,
    slug,
    postImage,
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
        descriptonImagesId: state.descriptonImagesId,
        taggedUsers: state.taggedUsers,
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
      console.error(e);
    }
  };

  const tagUser = (user) => {
    const isPresent = state.taggedUsers.find(({ uid }) => uid === user.uid);
    if (!isPresent) {
      state.taggedUsers.push(user);
    }
  };

  const removeTag = (user) => {
    state.taggedUsers = state.taggedUsers.filter(
      (currentUser) => currentUser?.uid !== user?.uid
    );
  };

  const getAllPosts = async () => {
    try {
      state.loadingPosts = true;
      let posts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      state.postList = posts;
    } catch (e) {
      console.error(e);
    } finally {
      state.loadingPosts = false;
    }
  };
  return { ...toRefs(state), createPost, tagUser, removeTag, getAllPosts };
});
