<template>
  <div
    class="bg-lightGray min-h-[calc(100vh-4rem)] 3xl:min-h-[calc(100vh-7rem)] py-8 3xl:py-14 3xl:text-3xl"
  >
    <div class="w-max mx-auto bg-white shadow-lg rounded-xl 3xl:rounded-2xl">
      <div
        class="font-bold text-2xl 3xl:text-4xl text-center bg-darkBlue text-white rounded-t-xl 3xl:rounded-t-2xl py-4 3xl:py-8 px-8 3xl:px-16 3xl:px-16"
      >
        Create a Post
      </div>
      <div
        class="px-8 3xl:px-16 flex flex-col gap-6 3xl:gap-12 my-6 3xl:my-12 3xl:text-2xl"
      >
        <div>
          <input
            type="text"
            class="border border-gray-300 w-[15rem] md:w-[20rem] lg:w-[25rem] 3xl:w-[40rem] p-1 3xl:p-4 sm:p-2 rounded"
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
            class="border border-gray-300 w-[15rem] md:w-[20rem] lg:w-[25rem] 3xl:w-[40rem] p-1 3xl:p-4 sm:p-2 rounded bg-gray-300"
            v-model.trim="postDetails.slug"
            placeholder="Slug"
          />
        </div>
        <div>
          <div class="flex flex-col gap-4">
            <label
              class="font-bold inline-block text-sm 3xl:text-2xl sm:text-base w-[10rem] 3xl:w-[20rem] border-darkBlue"
              >Add a Description...</label
            >
            <div
              class="w-[15rem] md:w-[20rem] lg:w-[25rem] 3xl:w-[40rem] rounded"
            >
              <Ckeditor
                :editor="ClassicEditor"
                v-model="postDetails.description"
                @input="validate('description')"
                placeholder="description"
                class="text-2xl"
              ></Ckeditor>
            </div>
          </div>
          <p class="text-red-500">{{ errorMessage.description }}</p>
        </div>
        <div>
          <div class="flex flex-col gap-4">
            <label
              class="font-bold inline-block text-sm sm:text-base 3xl:text-2xl w-[10rem]"
              >Upload Image</label
            ><input
              v-if="!postDetails.imageUrl"
              type="file"
              accept="image/*"
              @change="addImage"
              class="w-[15rem] 3xl:w-[25rem] bg-lightGray border border-gray-300 rounded-md p-4 cursor-pointer hover:bg-[#e0e0e0] custom-upload-button"
            />
            <div v-if="postDetails.imageUrl" class="flex">
              <img
                :src="postDetails.imageUrl"
                alt="post image"
                class="w-[15rem] 3xl:w-[25rem] h-[15rem] 3xl:h-[25rem] object-cover"
              />
              <Icon
                icon="charm:cross"
                class="cursor-pointer w-6 3xl:w-12 h-6 3xl:h-12"
                @click="deletePostImage"
              />
            </div>
          </div>

          <p class="text-red-500">{{ errorMessage.postImage }}</p>
        </div>
      </div>
      <div
        class="p-4 3xl:p-6 flex justify-between bg-gray-300 rounded-b-xl 3xl:text-2xl"
      >
        <button
          class="text-darkBlue rounded-lg leading-tight flex gap-1 3xl:gap-2 justify-left items-center hover:font-bold 3xl:text-2xl"
        >
          <Icon icon="ion:arrow-back" class="w-4 3xl:w-8 h-6 3xl:h-8 mt-1" />
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
  addImage,
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

@media (min-width: 2500px) {
  .ck-content {
    height: 10rem;
  }
  .ck.ck-editor {
    font-size: 1.5rem !important;
  }
  .ck-reset_all :not(.ck-reset_all-excluded *),
  .ck.ck-reset_all {
    font: initial;
  }

  .ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__button .ck-button__label {
    font-size: 1.5rem;
  }
}
</style>