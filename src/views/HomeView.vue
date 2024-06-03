<template>
  <div>
    <div>Home Page</div>
    <button class="border border-black px-3 py-1" @click="handleSignout">
      Sign Out
    </button>
  </div>
</template>

<script setup>
import { auth } from "@/firebase";
import router from "@/router";
import { signOut } from "firebase/auth";

const handleSignout = () => {
  signOut(auth);
  router.push('/login')
};
</script>
