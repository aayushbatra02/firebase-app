<template>
  <button
    class="border-2 border-darkBg py-3 rounded-lg w-[100%] text-lg h-16"
    :class="[
      iconName
        ? 'bg-white text-darkBg hover:bg-darkBg hover:text-white capitalize'
        : 'bg-darkBg text-white hover:bg-[white] hover:text-darkBg uppercase',
      loading ? 'cursor-not-allowed hover:bg-darkBg' : '',
    ]"
    @click.prevent="$emit('onSubmit')"
    :disabled="loading"
  >
    <span v-if="loading"><spinning-loader /></span>
    <span
      v-else
      class="flex justify-center items-center gap-4"
      :class="[alignLeft ? 'flex-row-reverse' : '']"
    >
      <Icon v-if="iconName" :icon="iconName" class="w-6 h-6" />{{
        buttonText
      }}</span
    >
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { Icon } from "@iconify/vue";

defineProps(["buttonText", "loading", "iconName", "alignLeft"]);
defineEmits(["onSubmit"]);
</script>

