<template>
  <div class="bg-lightGray mt-[3rem] 3xl:mt-[5rem]">
    <div
      class="w-[100%] sm:w-[60%] md:w-[40%] m-auto bg-white shadow-lg pt-2 3xl:pt-4 text-sm md:text-base 3xl:text-2xl"
    >
      <div
        v-for="post in postList"
        :key="post?.createdAt"
        class="mt-4 3xl:mt-8 border-b-2 border-darkGray"
      >
        <div class="m-4 3xl:m-8 flex gap-4 3xl:gap-8 items-center">
          <img
            :src="post?.userDetails?.profilePhoto"
            class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
          />
          <div class="font-bold capitalize">
            @{{ post?.userDetails?.firstName }}
            {{ post?.userDetails?.lastName }}
          </div>

          <div class="text-gray-700 flex items-center gap-2 3xl:gap-4">
            <Icon icon="icon-park-outline:dot" class="text-gray-500" />{{
              getUploadTime(post?.createdAt)
            }}
          </div>
        </div>
        <div class="text-center font-bold text-lg 3xl:text-3xl mb-4 3xl:mb-8">{{ post?.title }}</div>
        <img
          :src="post?.postImageUrl"
          class="w-full object-cover max-h-[15rem] 3xl:max-h-[30rem]"
        />
        <div class="description">
          <div class="p-4 3xl:p-8" v-html="post.description"></div>
        </div>
        <div v-if="post?.taggedUsers.length !== 0" class="p-4 3xl:p-8 pt-0 3xl:pt-0">
          <h3 class="font-bold">Tagged Users:</h3>
          <div class="flex gap-2 3xl:gap-4 mt-2 3xl:mt-4 flex-wrap">
            <div
              v-for="user in post?.taggedUsers"
              :key="user?.id"
              class="flex gap-2 3xl:gap-4 items-center border-2 border-darkGray px-3 3xl:px-6 py-1 3xl:py-2 rounded-full"
            >
              <img
                :src="user?.profilePhoto"
                class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
              />
              <div class="font-bold text-xs flex gap-1 sm:text-sm md:text-base 3xl:text-2xl">
                <span>@</span> <span>{{ user?.firstName }}</span>
                <span>{{ user?.lastName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="loadingPosts"
      class="bg-lightGray w-max m-auto"
      :class="[postList.length === 0 ? 'mt-[7rem]' : 'mt-[4rem]']"
    >
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
