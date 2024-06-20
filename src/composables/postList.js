import { usePostStore } from "@/stores/postStore";
import moment from "moment";
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
    const millisecodsPassed = now - time;
    const duration = moment.duration(millisecodsPassed);

    const seconds = Math.floor(duration.asSeconds());
    const minutes = Math.floor(duration.asMinutes());
    const hours = Math.floor(duration.asHours());
    const days = Math.floor(duration.asDays());
    const months = Math.floor(duration.asMonths());
    const years = Math.floor(duration.asYears());

    if (years) {
      return `${years} year${plural(years)} ago`;
    }
    if (months) {
      return `${months} month${plural(months)} ago`;
    }
    if (days) {
      return `${days} day${plural(days)} ago`;
    }
    if (hours) {
      return `${hours} hour${plural(hours)} ago`;
    }
    if (minutes) {
      return `${minutes} minute${plural(minutes)} ago`;
    }
    if (seconds) {
      return `${seconds} second${plural(seconds)} ago`;
    }
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
