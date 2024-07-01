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
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
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
    postComment: "",
    singlePost: {},
    loadingPost: false,
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
        comments: [],
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
    console.log("HERE")
    if (state.noMorePosts) {
      return;
    }
    try {
      state.loadingPosts = true;
      let firebaseQuery;
      if (state.lastVisible) {
        firebaseQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(state.lastVisible),
          limit(5)
        );
      } else {
        firebaseQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(firebaseQuery);
      const newPosts = [];
      querySnapshot.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
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

  const getSinglePost = async (id) => {
    try {
      state.loadingPost = true;
      const postRef = doc(db, "posts", id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        state.singlePost = { id: postSnap.id, ...postSnap.data() };
      } else {
        console.error("No such document!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      state.loadingPost = false;
    }
  };

  const AddCommentInPost = async (id) => {
    const postRef = doc(db, "posts", id);
    const { userDetails } = storeToRefs(useUserStore());
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const updatedComments = [
      {
        userId: userDetails.value.uid,
        commentTitle: state.postComment,
        createdAt,
        updatedAt,
      },
      ...state.singlePost?.comments,
    ];
    console.log(updatedComments, state.singlePost);
    await updateDoc(postRef, {
      // comments: updatedComments,
      userDetails: {
        ...state.singlePost.userDetails,
        uid: 'WvYs7As577eYuDPgLbtzAKwLLLn1',
      },
    });
    console.log("DONE")
    // await getSinglePost(id);
  };
  return {
    ...toRefs(state),
    createPost,
    tagUser,
    removeTag,
    getAllPosts,
    AddCommentInPost,
    getSinglePost,
  };
});
