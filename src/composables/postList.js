import { usePostStore } from "@/stores/postStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

export const usePostList = () => {
  const { getAllPosts } = usePostStore();
  const { loadingPosts, lastVisible, postList } = storeToRefs(usePostStore());
  const isExpanded = ref([]);
  const showButton = ref([]);
  const contentRef = ref([]);

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

  const plural = (number) => {
    if (Math.floor(number) > 1) {
      return "s";
    }
    return "";
  };

  const getUploadTime = (time) => {
    const now = Date.now();
    const secondsPast = (now - time) / 1000;

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} second${plural(secondsPast)} ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minute${plural(
        secondsPast / 60
      )} ago`;
    }
    if (secondsPast < 86400) {
      return `${Math.floor(secondsPast / 3600)} hour${plural(
        secondsPast / 3600
      )} ago`;
    }
    if (secondsPast < 2592000) {
      return `${Math.floor(secondsPast / 86400)} day${plural(
        secondsPast / 86400
      )} ago`;
    }
    if (secondsPast < 31536000) {
      return `${Math.floor(secondsPast / 2592000)} month${plural(
        secondsPast / 2592000
      )} ago`;
    }
    return `${Math.floor(secondsPast / 31536000)} year${plural(
      secondsPast / 31536000
    )} ago`;
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
  };
};
