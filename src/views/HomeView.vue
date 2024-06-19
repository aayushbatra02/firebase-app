<template>
  <div class="bg-lightGray mt-[3rem] 3xl:mt-[5rem]">
    <div class="w-[40%] m-auto bg-white shadow-lg pt-2">
      <div
        v-for="post in postList"
        :key="post?.createdAt"
        class="mt-4 border-b-2 border-darkGray"
      >
        <div class="m-4 flex gap-4 items-center">
          <img
            :src="post?.userDetails?.profilePhoto"
            class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
          />
          <div class="font-bold capitalize">
            @{{ post?.userDetails?.firstName }}
            {{ post?.userDetails?.lastName }}
          </div>

          <div class="text-gray-700 flex items-center gap-2">
            <Icon icon="icon-park-outline:dot" class="text-gray-500" />{{
              getUploadTime(post?.createdAt)
            }}
          </div>
        </div>
        <div class="text-center font-bold text-lg mb-4">{{ post?.title }}</div>
        <img :src="post?.postImageUrl" class="w-full object-cover" />
        <div class="description">
          <div class="p-4" v-html="post.description"></div>
        </div>
      </div>
    </div>
    <div v-if="loadingPosts" class="mt-8 bg-lightGray w-max">
      <spinning-loader :large="true" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { usePostList } from "@/composables/postList";
import { usePostStore } from "@/stores/postStore";

const { postList, loadingPosts } = storeToRefs(usePostStore());
const { getUploadTime } = usePostList();
</script>

<style>
.description img {
  width: 5rem !important;
  height: 5rem !important;
  display: inline-block;
}

.description figure {
  display: inline;
}
</style>
