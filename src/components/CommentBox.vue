<template>
  <div
    class="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center cursor-pointer"
    @click.self="$emit('manageCommentBoxVisibility')"
  >
    <div class="bg-white p-4 rounded-lg shadow-lg cursor-default">
      <h3 class="text-center font-bold text-xl mb-4 text-darkBlue">Comments</h3>
      <div v-if="loadingPost" class="h-[10rem]">
        <spinning-loader :large="true" />
      </div>
      <div v-else class="min-h-[10rem]">
        <div
          v-if="singlePost?.comments.length === 0"
          class="text-center text-gray-500"
        >
          <p class="font-bold">No Comments Yet!!!</p>
          <p>Be the first one to Comment...</p>
        </div>
        <div v-else>
          <div v-for="comment in singlePost?.comments" :key="comment.createdAt">
              <single-comment :comment="comment" />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4">
        <input
          type="text"
          class="border border-darkBlue px-2 py-1 rounded-lg"
          placeholder="Add a Comment"
          v-model="postComment"
        /><button @click="$emit('addComment')">
          <Icon icon="pepicons-pop:send" class="w-6 h-6 text-darkBlue" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/postStore";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { defineEmits } from "vue";
import SpinningLoader from "./SpinningLoader.vue";
import SingleComment from "./SingleComment.vue";

defineEmits(["manageCommentBoxVisibility", "addComment"]);
const { postComment, singlePost, loadingPost } = storeToRefs(usePostStore());
</script>