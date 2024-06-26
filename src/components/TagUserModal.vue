<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-10"
    @click.self="$emit('changeTagUserModalVisibility')"
  >
    <div
      class="bg-white p-8 rounded-lg relative w-[95%] md:w-[40%] 2xl:w-[30%]"
    >
      <Icon
        icon="charm:cross"
        class="cursor-pointer w-6 3xl:w-12 h-6 3xl:h-12 absolute top-4 right-4"
        @click="$emit('changeTagUserModalVisibility')"
      />
      <h2 class="font-bold mb-4 3xl:mb-8 text-center text-xl 3xl:text-4xl">
        Tag Users
      </h2>
      <input
        type="text"
        placeholder="Search User"
        class="border border-darkBlue rounded p-2 3xl:p-4 3xl:text-2xl w-full"
        v-model="searchedUser"
      />
      <div class="h-[10rem] 3xl:h-[20rem]" v-if="loadingUsers">
        <spinning-loader :large="true" />
      </div>
      <ul
        class="h-[10rem] 3xl:h-[20rem] overflow-auto mt-4 3xl:mt-8 border border-darkBlue rounded 3xl:text-2xl"
        v-else
      >
        <div
          v-if="filteredUsers.length === 0"
          class="p-2 3xl:p-4 text-center text-lg text-gray-400"
        >
          No Users
        </div>
        <li
          v-else
          v-for="user in filteredUsers"
          :key="user.uid"
          class="cursor-pointer border-b-2 border-gray-400 p-2 3xl:p-4 flex gap-4 3xl:gap-8 hover:bg-gray-400"
          @click="tagUser(user)"
        >
          <img
            :src="user.profilePhoto"
            class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
          />
          <div class="capitalize">
            {{ user?.firstName }} {{ user?.lastName }}
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <tagged-users-list />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineEmits, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/userStore";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { usePostStore } from "@/stores/postStore";
import TaggedUsersList from "@/components/TaggedUsersList";

defineEmits(["changeTagUserModalVisibility"]);
const { taggedUsers } = storeToRefs(usePostStore());
const { tagUser } = usePostStore();
const { getAllUsers } = useUserStore();
const { loadingUsers, userDetails } = storeToRefs(useUserStore());
const users = ref([]);
const searchedUser = ref("");
const filteredUsers = ref([]);

onMounted(async () => {
  users.value = await getAllUsers();
});

watchEffect(() => {
  filteredUsers.value = users.value;
  filteredUsers.value = users.value.filter(
    ({ uid }) => uid !== userDetails.value?.uid
  );

  filteredUsers.value = filteredUsers.value.filter((user) => {
    let isPresent = false;
    for (let i = 0; i < taggedUsers.value.length; i++) {
      if (taggedUsers.value[i]?.uid === user?.uid) {
        isPresent = true;
      }
    }
    return !isPresent;
  });

  if (searchedUser.value !== "") {
    filteredUsers.value = filteredUsers.value.filter(
      ({ firstName, lastName }) => {
        const name = [firstName, lastName].join(" ");
        return name.toLowerCase().includes(searchedUser.value.toLowerCase());
      }
    );
  }
});
</script>
