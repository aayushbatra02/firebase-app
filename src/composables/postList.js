import { usePostStore } from "@/stores/postStore";
import { authenticate } from "@/utils/authenticate";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

export const usePostList = () => {
  const { getAllPosts, AddCommentInPost, getSinglePost } = usePostStore();
  const { loadingPosts, lastVisible, postList, postComment } = storeToRefs(
    usePostStore()
  );
  const isExpanded = ref([]);
  const showButton = ref([]);
  const contentRef = ref([]);
  const isCommentBoxVisible = ref(false);
  const selectedCommentPostId = ref(null);
  const addCommentErrorMessage = ref("");
  const validateComment = ref(false);

  const manageCommentBoxVisibility = async (id) => {
    isCommentBoxVisible.value = !isCommentBoxVisible.value;
    if (id) {
      await getSinglePost(id);
    }
    selectedCommentPostId.value = id;
    postComment.value = "";
    addCommentErrorMessage.value = "";
    validateComment.value = false;
  };

  const validate = () => {
    if (validateComment.value) {
      addCommentErrorMessage.value = authenticate("comment", postComment.value);
    }
  };

  const addComment = async () => {
    validateComment.value = true;
    validate();
    if (!addCommentErrorMessage.value) {
      await AddCommentInPost(selectedCommentPostId.value);
      postComment.value = "";
      addCommentErrorMessage.value = "";
      validateComment.value = false;
    }
  };

  const buttonText = computed(() => {
    return isExpanded.value.map((expanded) =>
      expanded ? "Show less..." : "Show more..."
    );
  });

  onMounted(async () => {
    postList.value = [];
    lastVisible.value = null;
    await getAllPosts(5);
    postList.value = usePostStore().postList;
    isExpanded.value = new Array(postList.value.length).fill(false);
    showButton.value = new Array(postList.value.length).fill(false);

    contentRef.value.forEach((el, index) => {
      if (el && el.scrollHeight > el.offsetHeight) {
        showButton.value[index] = true;
      }
    });
  });

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + windowHeight >= documentHeight - 10 &&
      !loadingPosts.value
    ) {
      getAllPosts();
    }
  };

  window.addEventListener("scroll", handleScroll);

  const getUploadTime = (time) => {
    return moment(time).fromNow();
  };

  const toggleDescription = (index) => {
    isExpanded.value[index] = !isExpanded.value[index];
  };

  const setContentRef = (index) => (el) => {
    contentRef.value[index] = el;
  };

  return {
    getUploadTime,
    handleScroll,
    isExpanded,
    toggleDescription,
    buttonText,
    showButton,
    setContentRef,
    isCommentBoxVisible,
    manageCommentBoxVisibility,
    addComment,
    addCommentErrorMessage,
    validate,
  };
};
