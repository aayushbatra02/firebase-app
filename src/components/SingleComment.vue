<template>
  <div class="mb-4 bg-lightGray p-4 relative">
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
    <div class="flex gap-2 absolute top-2 right-2" v-if="commentedUser?.id === userDetails?.id">
      <Icon
        icon="material-symbols:edit"
        class="w-5 h-5 text-green-700 cursor-pointer"
        @click="() => console.log('edit')"
      />
      <Icon
        icon="material-symbols:delete"
        class="w-5 h-5 text-red-500 cursor-pointer"
        @click="() => console.log('delete')"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { usePostList } from "@/composables/postList";
import { useUserStore } from "@/stores/userStore";
import { defineProps, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps(["comment"]);
const { getUserByUID } = useUserStore();
const { getUploadTime } = usePostList();
const commentedUser = ref({});
const { userDetails } = storeToRefs(useUserStore());

onMounted(async () => {
  commentedUser.value = await getUserByUID(props.comment.userId);
});
</script>
