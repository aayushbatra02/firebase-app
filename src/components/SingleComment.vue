<template>
  <div class="mb-4 bg-lightGray p-4">
    <div class="flex gap-2 items-center mb-2">
      <img
        :src="commentedUser?.profilePhoto"
        class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
      />
      <div class="font-bold capitalize">
        {{ commentedUser?.firstName }}
        {{ commentedUser?.lastName }}
      </div>
      <div class="text-sm text-darkGray">
        {{ getUploadTime(comment?.updatedAt) }}
      </div>
    </div>
    <p>{{ comment?.commentTitle }}</p>
  </div>
</template>

<script setup>
import { usePostList } from "@/composables/postList";
import { useUserStore } from "@/stores/userStore";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps(["comment"]);
const { getUserByUID } = useUserStore();
const { getUploadTime } = usePostList();
const commentedUser = ref({});

onMounted(async () => {
  commentedUser.value = await getUserByUID(props.comment.userId);
  console.log(props.comment);
});
</script>
