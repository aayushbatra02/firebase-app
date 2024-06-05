<template>
  <div class="flex flex-col justify-center items-center gap-4 mt-12">
    <div>Home Page</div>
    <button
      class="border border-black px-3 py-1 rounded"
      @click="handleSignout"
    >
      Sign Out
    </button>
    <div v-if="loading">LOADING USER...</div>
    <div
      class="border border-black w-max m-auto p-4 rounded-lg flex flex-col gap-4"
      v-else
    >
      <div>
        <label class="font-bold inline-block w-[8rem]">NAME</label
        >{{ userDetails?.firstName ? userDetails?.firstName : "N/A" }}
        {{ userDetails?.lastName }}
      </div>
      <div>
        <label class="font-bold inline-block w-[8rem]">EMAIL</label>
        {{ userDetails?.email ? userDetails?.email : "N/A" }}
      </div>
      <div>
        <label class="font-bold inline-block w-[8rem]">Mobile No</label>
        {{ userDetails?.mobileNo ? userDetails?.mobileNo : "N/A" }}
      </div>
      <div class="flex items-center">
        <label class="font-bold inline-block w-[8rem]">Profile Pic</label>
        <img
          v-if="userDetails?.profilePhoto"
          :src="userDetails?.profilePhoto"
          alt="profile pic"
          class="w-16 h-16 rounded-[50%] object-cover"
        />
        <div v-else>N/A</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { signOut } from "firebase/auth";
import { onMounted, ref } from "vue";
import { auth } from "@/firebase";
import router from "@/router";
import { useUser } from "@/composables/user";

const loading = ref(false);
const { getCurrentUser, getUserByUID, userDetails } = useUser();

const handleSignout = () => {
  signOut(auth);
  router.push("/login");
};

onMounted(async () => {
  loading.value = true;
  const user = await getCurrentUser();
  await getUserByUID(user?.uid);
  loading.value = false;
});
</script>
