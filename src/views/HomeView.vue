<template>
  <div>
    <div>Home Page</div>
    <button class="border border-black px-3 py-1" @click="handleSignout">
      Sign Out
    </button>
  </div>
</template>

<script setup>
import { auth, getCurrentUser } from "@/firebase";
import router from "@/router";
import { signOut } from "firebase/auth";
import { onMounted } from "vue";

const handleSignout = () => {
  signOut(auth);
  router.push("/login");
};

onMounted(async () => {
  const user = await getCurrentUser();
  console.log(user);
});
</script>
