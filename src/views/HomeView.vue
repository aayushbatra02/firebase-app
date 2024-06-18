<template>
  <div>
    <div v-if="loadingPosts" class="fixed inset-0 flex justify-center">
      <spinning-loader :large="true" />
    </div>
    <div v-else>
      <div v-for="post in postList" :key="post?.createdAt" class="mt-4">
        <div class="text-center">Title: {{ post?.title }}</div>
          <div class="text-center">Slug: {{ post?.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SpinningLoader from "@/components/SpinningLoader.vue";
import { usePostList } from "@/composables/postList";
import { usePostStore } from "@/stores/postStore";
import { storeToRefs } from "pinia";

const { postList, loadingPosts } = storeToRefs(usePostStore());
const { test } = usePostList();
console.log(postList.value);
console.log(test);
</script>

<style scoped>
img {
  width: 5rem !important;
  height: 5rem !important;
}
</style>
