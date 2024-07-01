import { usePostStore } from "@/stores/postStore";
import { authenticate } from "@/utils/authenticate";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export const usePostList = () => {
  const { getAllPosts, manageComments, getSinglePost } = usePostStore();
  const { loadingPosts, postComment, selectedCommentPostId, inputFieldType } = storeToRefs(
    usePostStore()
  );
  const isExpanded = ref([]);
  const showButton = ref([]);
  const contentRef = ref([]);
  const isCommentBoxVisible = ref(false);
  const addCommentErrorMessage = ref("");
  const validateComment = ref(false);

  const manageCommentBoxVisibility = async (id) => {
    isCommentBoxVisible.value = !isCommentBoxVisible.value;
    if (id) {
      inputFieldType.value = 'add'
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
      await manageComments('add');
      postComment.value = "";
      addCommentErrorMessage.value = "";
      validateComment.value = false;
    }
  };

  const deleteComment = async (index) => {
    await manageComments('delete', index)
  }

  const setContentInField = async (title) => {
    inputFieldType.value = 'edit'
    postComment.value = title
    inputFieldType.value = 'edit'

  }

  const editComment = async (index) => {
    console.log('in composable ',index)
    await manageComments('edit', index)
    inputFieldType.value = 'add'
  }

  const buttonText = computed(() => {
    return isExpanded.value.map((expanded) =>
      expanded ? "Show less..." : "Show more..."
    );
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
    contentRef,
    deleteComment,
    setContentInField,
    editComment
  };
};
