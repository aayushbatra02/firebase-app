import { usePostStore } from "@/stores/postStore";
import { ref } from "firebase/storage";
import { onMounted } from "vue";

export const usePostList = () => {
  const { getAllPosts } = usePostStore();
  const test = ref(null);
  onMounted(() => {
    getAllPosts();
  });
  return { test };
};
