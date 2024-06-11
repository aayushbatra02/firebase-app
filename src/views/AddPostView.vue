<template>
  <div
    class="flex flex-col gap-6 my-10 w-max mx-auto"
  >
    <div class="font-bold text-2xl">Create a Post</div>
    <div>
      <input
        type="text"
        class="border border-darkBlue w-[15rem] md:w-[20rem] lg:w-[25rem] p-1 sm:p-2 rounded"
        @input="generateSlug"
        v-model.trim="postDetails.title"
        placeholder="Add Title"
      />
      <p class="text-red-500">{{ errorMessage.title }}</p>
    </div>
    <div>
      <input
        disabled
        type="text"
        class="border border-darkBlue w-[15rem] md:w-[20rem] lg:w-[25rem] p-1 sm:p-2 rounded bg-gray-300"
        v-model.trim="postDetails.slug"
        placeholder="Slug"
      />
    </div>
    <div>
      <div class="flex flex-col gap-4">
        <label
          class="font-bold inline-block text-sm sm:text-base w-[10rem] border-darkBlue"
          >Add a Description...</label
        >
        <div class="w-[15rem] md:w-[20rem] lg:w-[25rem] rounded">
          <Ckeditor
            :editor="ClassicEditor"
            v-model="postDetails.description"
            @input="validate('description')"
            placeholder="description"
          ></Ckeditor>
        </div>
      </div>
      <p class="text-red-500">{{ errorMessage.description }}</p>
    </div>
    <div>
      <div class="flex flex-col gap-4">
        <label class="font-bold inline-block text-sm sm:text-base w-[10rem]"
          >Upload Image</label
        ><input
          v-if="!postDetails.imageUrl"
          type="file"
          accept="image/*"
          @change="uploadImage"
          class="w-[15rem]"
        />
        <div v-if="postDetails.imageUrl" class="flex">
          <img
            :src="postDetails.imageUrl"
            alt="post image"
            class="w-[15rem] h-[15rem] object-cover"
          />
          <Icon
            icon="charm:cross"
            class="cursor-pointer w-6 h-6"
            @click="deletePostImage"
          />
        </div>
      </div>

      <p class="text-red-500">{{ errorMessage.postImage }}</p>
    </div>
    <div class="w-[60%] m-auto">
      <form-button
        buttonText="Add Post"
        @onSubmit="addPost"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useAddPost } from "@/composables/addPost";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormButton from "@/components/FormButton.vue";

const {
  uploadImage,
  postDetails,
  deletePostImage,
  addPost,
  generateSlug,
  errorMessage,
  validate,
  loading,
} = useAddPost();
</script>