<template>
  <nav
    class="bg-darkBlue text-white flex justify-between items-center relative h-[4rem] px-4"
  >
    <div class="flex gap-8">
      <button v-for="(link, id) in navLinks" :key="id">
        <RouterLink :to="link.path" class="hover:font-bold">{{
          link.name
        }}</RouterLink>
      </button>
    </div>
    <button @click="toggleLogout">
      <img
        :src="userDetails?.profilePhoto"
        alt="profile photo"
        class="w-8 h-8 rounded-full object-cover"
        v-if="userDetails?.profilePhoto"
      />
      <Icon v-else icon="mdi:account-circle" class="w-8 h-8" />
    </button>
    <div v-if="showLogout" class="fixed inset-0" @click.self="toggleLogout">
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
        <RouterLink
          to="/profile"
          class="w-full py-2 text-center text-darkBlue border-t-2 border-darkBlue cursor-pointer hover:font-bold bg-white"
          @click="toggleLogout"
        >
          User Profile
        </RouterLink>
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
const navLinks = [
  {
    name: "Posts",
    path: "/post-list",
  },
  {
    name: "Add Post",
    path: "/post-list",
  },
];

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