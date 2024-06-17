<template>
  <div class="flex gap-2 3xl:gap-4 flex-wrap 3xl:text-2xl">
    <div v-for="user in taggedUsers" :key="user.uid">
      <div
        class="bg-gray-300 text-black p-2 3xl:p-4 rounded flex justify-center items-center gap-2 3xl:gap-4 capitalize"
      >
        {{ user?.firstName }} {{ user?.lastName }}
        <Icon
          icon="charm:cross"
          @click="confirmDelete(user)"
          class="cursor-pointer"
        />
      </div>
    </div>
    <confirmation-modal
      v-if="showConfirmationModal"
      @on-confirm-button="removeTag"
      @closeModal="() => manageConfirmationModalVisibility('delete')"
      title="Confirm Delete"
      description="Are you sure you want to Delete Tag?"
      confirm-button-text="Delete"
      :isClosable="true"
      :deleteTagUser="deleteTagUser"
    />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { usePostStore } from "@/stores/postStore";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useAddPost } from "@/composables/addPost";

const { taggedUsers } = storeToRefs(usePostStore());
const { removeTag } = usePostStore();
const { showConfirmationModal, manageConfirmationModalVisibility } =
  useAddPost();
const deleteTagUser = ref({});

const confirmDelete = (user) => {
  deleteTagUser.value = user;
  manageConfirmationModalVisibility("delete");
};
</script>