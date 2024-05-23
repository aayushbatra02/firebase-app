
<template>
  <div class="relative">
    <span
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <span
        class="inline-block border-blue-dark rounded-full animate-spin"
        :class="[
          large ? 'w-16 h-16 text-blue border-t-4' : 'w-4 h-4 border-t-2',
        ]"
      ></span>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["large"]);
</script>
