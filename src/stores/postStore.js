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
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

export const usePostStore = defineStore("postStore", () => {
  const state = reactive({
    loading: false,
    taggedUsers: [],
    descriptonImagesId: [],
    loadingPosts: false,
    postList: [],
    lastVisible: null,
    noMorePosts: false,
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
      state.postList = [];
      state.lastVisible = null;
      getAllPosts(5);
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
    if (state.noMorePosts) {
      return;
    }
    try {
      state.loadingPosts = true;
      let q;
      if (state.lastVisible) {
        q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(state.lastVisible),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);
      const newPosts = [];
      querySnapshot.forEach((doc) => {
        newPosts.push(doc.data());
      });
      if (newPosts.length === 0) {
        state.noMorePosts = true;
      } else {
        state.postList.push(...newPosts);
        state.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      }
    } catch (e) {
      console.error(e);
    } finally {
      state.loadingPosts = false;
    }
  };
  return { ...toRefs(state), createPost, tagUser, removeTag, getAllPosts };
});
