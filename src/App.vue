<template>
  <nav-bar v-if="user" />
  <router-view />
</template>

<script setup>
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { ref, watch } from "vue";
const user = ref(null)
const route = useRoute()
watch(()=> route.name, () => {
  user.value = localStorage.getItem("loggedIn")
})
</script>

<style>
* {
  box-sizing: border-box;
}
</style>