<template>
  <div
    class="border border-darkBlue w-max p-4 mx-auto mt-12 rounded-lg flex flex-col gap-6 my-10"
  >
    <div>
      <label class="font-bold inline-block text-sm md:text-base w-[10rem]"
        >TITLE</label
      ><input
        type="text"
        class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded"
        @input="generateSlug"
        v-model.trim="postDetails.title"
      />
    </div>
    <div>
      <label class="font-bold inline-block text-sm md:text-base w-[10rem]"
        >SLUG</label
      ><input
        disabled
        type="text"
        class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded bg-gray-300"
        v-model.trim="postDetails.slug"
      />
    </div>
    <div>
      <label class="font-bold inline-block text-sm md:text-base w-[10rem]"
        >DESCRIPTION</label
      ><input
        type="text"
        class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded"
        v-model.trim="postDetails.description"
      />
    </div>
    <div>
      <label class="font-bold inline-block text-sm md:text-base w-[10rem]"
        >UPLOAD IMAGE</label
      ><input
        v-if="!postDetails.imageUrl"
        type="file"
        accept="image/*"
        @change="uploadImage"
      />
    </div>
    <div v-if="postDetails.imageUrl" class="flex">
      <img :src="postDetails.imageUrl" alt="post image" width="w-15 h-15" />
      <Icon
        icon="charm:cross"
        class="cursor-pointer w-6 h-6"
        @click="deletePostImage"
      />
    </div>
    <button
      @click="addPost"
      class="border border-darkBlue w-max px-4 py-1 m-auto rounded hover:bg-darkBlue hover:text-white"
    >
      Add Post
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useAddPost } from "@/composables/addPost";

const { uploadImage, postDetails, deletePostImage, addPost, generateSlug } = useAddPost();
</script>