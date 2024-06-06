<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center"
  >
    <div class="bg-[white] p-12 flex flex-col items-center gap-6 relative">
      <h1 class="text-2xl text-[green] font-bold">{{ title }}</h1>
      <P class="text-xl">{{ description }}</P>
      <button
        class="bg-darkBlue border-2 border-darkBlue text-white px-12 py-2 text-xl rounded-lg hover:bg-[white] hover:text-darkBlue mt-4"
        @click="$emit('onConfirmButton')"
      >
        {{ confirmButtonText }}
      </button>
      <button v-if="isClosable" class="absolute top-4 right-4">
        <Icon icon="akar-icons:cross" class="text-[black] w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { defineProps, defineEmits } from "vue";
defineProps(["isClosable", "title", "description", "confirmButtonText"]);
defineEmits(["onConfirmButton"]);
</script>