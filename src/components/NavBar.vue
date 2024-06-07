<template>
  <nav
    class="bg-darkBlue text-white flex justify-between items-center relative h-[4rem]"
  >
    <div class="flex gap-8 ml-4">
      <button>
        <RouterLink to="/" class="hover:font-bold">Home</RouterLink>
      </button>
      <button class="hover:font-bold">Add Post</button>
    </div>
    <button @click="toggleLogout" class="w-[10rem] flex justify-center">
      <img
        :src="userDetails?.profilePhoto"
        alt="profile photo"
        class="w-8 h-8 rounded-full object-cover"
        v-if="userDetails?.profilePhoto"
      />
      <Icon v-else icon="mdi:account-circle" class="w-8 h-8" />
    </button>
    <div v-if="showLogout" class="fixed inset-0" @click="toggleLogout">
      <div
        v-if="showLogout"
        class="absolute top-[4rem] right-[0] flex flex-col items-center border-l-2 border-b-2 border-darkBlue border-t-none w-[10rem]"
      >
        <div
          @click="handleSignout"
          class="flex gap-2 justify-center items-center px-6 py-2 cursor-pointer text-darkBlue hover:font-bold bg-white"
        >
          <Icon icon="material-symbols:logout" class="w-6 h-6 text-red-400" />
          <span>Logout</span>
        </div>
        <div
          class="w-full py-2 text-center text-darkBlue border-t-2 border-darkBlue cursor-pointer hover:font-bold bg-white"
        >
          <RouterLink to="/profile">User Profile</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { signOut } from "firebase/auth";
import router from "@/router";
import { auth } from "@/firebase";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const { getCurrentUser, getUserByUID } = useUserStore();
const { userDetails } = storeToRefs(useUserStore());
const showLogout = ref(false);
const route = useRoute();

watch(
  () => route.path,
  async () => {
    const user = await getCurrentUser();
    await getUserByUID(user?.uid);
  },
  { immediate: true }
);

const toggleLogout = () => {
  showLogout.value = !showLogout.value;
};

const handleSignout = () => {
  signOut(auth);
  localStorage.removeItem("loggedIn");
  router.push("/login");
};
</script>