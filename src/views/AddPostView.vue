<template>
  <div class="bg-lightGray min-h-[calc(100vh-4rem)] py-8">
    <div class="w-max mx-auto bg-white shadow-lg rounded-xl">
      <div
        class="font-bold text-2xl text-center bg-darkBlue text-white rounded-t-xl py-4 px-8"
      >
        Create a Post
      </div>
      <div class="px-8 flex flex-col gap-6 my-6">
        <div>
          <input
            type="text"
            class="border border-gray-300 w-[15rem] md:w-[20rem] lg:w-[25rem] p-1 sm:p-2 rounded"
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
            class="border border-gray-300 w-[15rem] md:w-[20rem] lg:w-[25rem] p-1 sm:p-2 rounded bg-gray-300"
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
              class="w-[15rem] bg-lightGray border border-gray-300 rounded-md p-4 cursor-pointer hover:bg-[#e0e0e0] custom-upload-button"
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
      </div>
      <div
        class="p-4 border-t-2 border-gray-300 flex justify-between bg-lightGray rounded-b-xl"
      >
        <button
          class="text-darkBlue rounded-lg leading-tight flex gap-1 justify-left items-center hover:font-bold"
        >
          <Icon icon="ion:arrow-back" class="w-4 h-4 mt-1" />
          <div @click="goBack">Back</div>
        </button>
        <div class="w-[40%]">
          <form-button
            buttonText="Add Post"
            @onSubmit="addPost"
            :loading="loading"
          />
        </div>
      </div>
      <confirmation-modal
        v-if="showConfirmationModal"
        @on-confirm-button="closeConfirmationModal"
        title="Congratulations"
        description="Post Created Successfully"
        confirm-button-text="OK"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useAddPost } from "@/composables/addPost";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormButton from "@/components/FormButton.vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/postStore";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

const {
  uploadImage,
  postDetails,
  deletePostImage,
  addPost,
  generateSlug,
  errorMessage,
  validate,
  showConfirmationModal,
  closeConfirmationModal,
  goBack,
} = useAddPost();

const { loading } = storeToRefs(usePostStore());
</script>

<style>
.ck-content {
  height: 8rem;
}

@media (max-width: 768px) {
  .ck-content {
    height: 5rem;
  }
}
</style>