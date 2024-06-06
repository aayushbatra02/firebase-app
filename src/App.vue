<template>
  <nav-bar v-if="showNav()" />
  <router-view />
</template>

<script setup>
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const showNav = () => {
  const route = useRoute();
  if (route.path === "/login" || route.path === "/register") {
    return false;
  }
  return true;
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>