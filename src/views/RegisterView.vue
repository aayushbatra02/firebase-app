<template>
  <div class="flex justify-center w-[100vw] bg-white h-[100vh]">
    <div
      class="w-[50%] flex items-center justify-center pt-12 flex-col bg-darkBg text-white"
    >
      <p class="text-xl mb-12">Welcome To</p>
      <h1 class="text-4xl font-bold font-sans mb-4 italic">SOCIOGRAM</h1>
      <p>Connect | Share | Explore</p>
    </div>
    <form
      class="rounded flex flex-col gap-12 border w-[50%] items-center justify-center"
    >
      <h1 class="text-3xl font-bold text-center text">REGISTER</h1>
      <div class="flex flex-col gap-6 items-center w-[50%]">
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Mobile No"
          />
        </div>
        <div class="w-[100%]">
          <label class="text-gray">Profile Photo</label>
          <input type="file" @change="uploadImage" class="my-4" />
          <img
            v-if="previewImage"
            :src="previewImage"
            class="w-[6rem] h-[6rem] rounded-[50%] object-cover"
          />
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Password"
          />
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <button
        class="bg-darkBg border-2 border-darkBg text-white py-3 rounded-lg w-[50%] hover:bg-white hover:text-darkBg text-lg"
        @click="console.log('Registerd')"
      >
        REGISTER
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const previewImage = ref(null);
const uploadImage = (e) => {
  console.log(e);
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    previewImage.value = e.target.result;
    console.log(previewImage.value);
  };
};
console.log(uploadImage);
</script>

<style lang="scss" scoped>
</style>