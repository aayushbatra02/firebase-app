<template>
  <button
    class="border-2 border-darkBlue py-3 rounded-lg w-[100%] text-lg h-12 flex justify-center items-center"
    :class="[
      iconName
        ? 'bg-transparent text-darkBlue hover:bg-darkBlue hover:text-white capitalize'
        : 'bg-darkBlue text-white hover:bg-transparent hover:text-darkBlue uppercase',
      loading ? 'cursor-not-allowed hover:bg-darkBlue' : '',
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