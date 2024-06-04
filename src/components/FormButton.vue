<template>
  <button
    class="bg-darkBg border-2 border-darkBg text-[white] py-3 rounded-lg w-[100%] text-lg h-16"
    :class="[
      loading ? 'cursor-not-allowed' : 'hover:bg-white hover:text-darkBg',
    ]"
    @click.prevent="$emit('onSubmit')"
    :disabled="loading"
  >
    <span v-if="loading"><spinning-loader /></span>
    <span v-else class="uppercase">{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import SpinningLoader from "@/components/SpinningLoader.vue";

defineProps(["buttonText", "loading"]);
defineEmits(["onSubmit"]);

</script>

