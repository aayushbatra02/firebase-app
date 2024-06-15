<template>
  <nav
    class="bg-darkBlue text-white flex justify-between items-center relative h-[3rem] 3xl:h-[5rem] px-4 3xl:px-8 text-sm"
  >
    <div class="flex gap-8 3xl:gap-16">
      <button v-for="(link, id) in navLinks" :key="id">
        <RouterLink
          :to="link.path"
          class="hover:font-bold 3xl:text-xl"
          active-class="font-bold border-b-2 pb-1 3xl:pb-2"
          >{{ link.name }}</RouterLink
        >
      </button>
    </div>
    <button @click="toggleLogout">
      <img
        :src="userDetails?.profilePhoto"
        alt="profile photo"
        class="w-8 3xl:w-12 h-8 3xl:h-12 rounded-full object-cover"
        v-if="userDetails?.profilePhoto"
      />
      <Icon
        v-else
        icon="mdi:account-circle"
        class="w-8 3xl:w-12 h-8 3xl:h-12"
      />
    </button>
    <div v-if="showLogout" class="absolute inset-0" @click.self="toggleLogout">
      <div
        v-if="showLogout"
        class="absolute top-[3rem] 3xl:top-[5rem] right-[0] flex flex-col items-left border-l-2 border-b-2 border-darkBlue border-t-none w-[10rem] 3xl:w-[20rem] 3xl:text-xl"
      >
        <RouterLink
          to="/profile"
          class="w-full py-2 3xl:py-4 pl-6 3xl:pl-12 text-center text-darkBlue border-b-2 border-darkBlue cursor-pointer hover:font-bold bg-white"
          @click="toggleLogout"
        >
          <div class="flex gap-2 3xl:gap-4 justify-left items-center">
            <Icon icon="gg:profile" class="w-6 3xl:w-10 h-6 3xl:h-10" />
            <div>User Profile</div>
          </div>
        </RouterLink>
        <div
          @click="handleSignout"
          class="flex gap-2 3xl:gap-4 pl-6 3xl:pl-12 justify-left w-full items-center py-2 3xl:py-4 cursor-pointer text-darkBlue hover:font-bold bg-white"
        >
          <Icon
            icon="material-symbols:logout"
            class="w-6 3xl:w-10 h-6 3xl:h-10 text-red-400"
          />
          <span>Logout</span>
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
const navLinks = [
  {
    name: "Posts",
    path: "/post-list",
  },
  {
    name: "Add Post",
    path: "/add-post",
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