<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-10"
  >
    <div class="bg-white p-8 rounded-lg relative w-[40%] 2xl:w-[30%]">
      <Icon
        icon="charm:cross"
        class="cursor-pointer w-6 3xl:w-12 h-6 3xl:h-12 absolute top-1 right-1"
        @click="$emit('toggleTagUserModal')"
      />
      <h2 class="font-bold mb-4 text-center text-xl">Tag Users</h2>
      <input
        type="text"
        placeholder="Search User"
        class="border border-darkBlue rounded p-2 w-full"
        v-model="searchedUser"
      />
      <div class="h-[10rem] w-[16rem]" v-if="loadingUsers">
        <spinning-loader :large="true" />
      </div>
      <ul
        class="h-[10rem] overflow-auto mt-4 border border-darkBlue rounded"
        v-else
      >
        <div v-if="filteredUsers.length === 0" class="p-2">No Users</div>
        <li
          v-else
          v-for="user in filteredUsers"
          :key="user.uid"
          class="cursor-pointer border-b-2 border-gray-400 p-2 flex gap-4 hover:bg-gray-400"
          @click="$emit('tagUser', user)"
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
        <div class="flex gap-2 flex-wrap">
          <div
            v-for="user in taggedUsers"
            :key="user.uid"
            class="bg-gray-500 text-white p-2 rounded-lg cursor-pointer"
            @click="$emit('removeTag', user)"
          >
            {{ user?.firstName }} {{ user?.lastName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineEmits, ref, computed, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/userStore";
import SpinningLoader from "@/components/SpinningLoader.vue";

defineEmits(["toggleTagUserModal", "tagUser", "removeTag"]);
const props = defineProps(["taggedUsers"]);
const { getAllUsers } = useUserStore();
const { loadingUsers, userDetails } = storeToRefs(useUserStore());
const users = ref([]);
const searchedUser = ref("");

onMounted(async () => {
  users.value = await getAllUsers();
  console.log("in onmounted", props.taggedUsers);
});

const filteredUsers = computed(() => {
  let userList = users.value;
  userList = users.value.filter(({ uid }) => uid !== userDetails.value?.uid);
  if (searchedUser.value !== "") {
    userList = userList.filter(({ firstName, lastName }) => {
      const name = [firstName, lastName].join(" ");
      return name.toLowerCase().includes(searchedUser.value.toLowerCase());
    });
  }
  return userList;
});
</script>
