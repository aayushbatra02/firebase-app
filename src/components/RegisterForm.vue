<template>
  <form
    class="flex flex-col gap-6 w-[95%] md:w-[50%] sm:w-[80%] items-center justify-center mx-auto my-12 border border-[3px] border-darkBg rounded-xl py-8 md:py-0 md:border-none"
  >
    <h1 class="text-3xl font-bold text-center text">REGISTER</h1>
    <div class="flex flex-col gap-4 items-center w-[80%] sm:w-[70%] md:w-[50%]">
      <div class="w-[100%]">
        <input
          class="rounded p-3 bg-lightBg w-[100%]"
          type="text"
          placeholder="First Name"
          v-model.trim="userData.firstName"
          @input="validate('firstName')"
        />
        <p class="text-[red] mt-2">{{ signupErrorMessage.firstName }}</p>
      </div>
      <div class="w-[100%]">
        <input
          class="rounded p-3 bg-lightBg w-[100%]"
          type="text"
          placeholder="Last Name"
          v-model.trim="userData.lastName"
          @input="validate('lastName')"
        />
        <p class="text-[red] mt-2">{{ signupErrorMessage.lastName }}</p>
      </div>
      <div class="w-[100%]">
        <input
          class="rounded p-3 bg-lightBg w-[100%]"
          type="text"
          placeholder="Mobile No"
          v-model.trim="userData.mobileNo"
          @input="handleMobileInput"
        />
        <p class="text-[red] mt-2">{{ signupErrorMessage.mobileNo }}</p>
      </div>
      <div class="w-[100%]">
        <div class="flex justify-between gap-2 flex-row flex-wrap">
          <div class="flex flex-col">
            <label class="text-[gray]">Profile Photo</label>
            <input
              type="file"
              @change="uploadImage"
              class="mt-4 w-[15rem]"
              accept="image/*"
            />
          </div>
          <img
            v-if="userData.imageUrl"
            :src="userData.imageUrl"
            class="w-[6rem] h-[6rem] rounded-[50%] object-cover"
          />
        </div>
        <p class="text-[red] mt-2">{{ signupErrorMessage.profilePhoto }}</p>
      </div>
      <div class="w-[100%]">
        <input
          class="rounded p-3 bg-lightBg w-[100%]"
          type="text"
          placeholder="Email"
          v-model.trim="userData.email"
          @input="validate('email')"
        />
        <p class="text-[red] mt-2">{{ signupErrorMessage.email }}</p>
      </div>
      <div class="w-[100%] relative">
        <div class="flex items-center">
          <input
            class="rounded p-3 bg-lightBg w-[100%] pr-[15%]"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model.trim="userData.password"
            @input="validate('password')"
          />
          <div class="absolute right-[5%] cursor-pointer">
            <Icon
              icon="mdi:eye-outline"
              class="text-black"
              v-if="showPassword"
              @click="togglePassword"
            />
            <Icon
              v-else
              icon="mdi:eye-off-outline"
              class="text-black cursor-pointer"
              @click="togglePassword"
            />
          </div>
        </div>
        <p class="text-[red] mt-2">{{ signupErrorMessage.password }}</p>
      </div>
      <div class="w-[100%] relative">
        <div class="flex items-center">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm Password"
            v-model.trim="userData.confirmPassword"
            @input="validate('confirmPassword')"
          />
          <div class="absolute right-[5%] cursor-pointer">
            <Icon
              icon="mdi:eye-outline"
              class="text-black"
              v-if="showConfirmPassword"
              @click="toggleConfirmPassword"
            />
            <Icon
              v-else
              icon="mdi:eye-off-outline"
              class="text-black cursor-pointer"
              @click="toggleConfirmPassword"
            />
          </div>
        </div>
        <p class="text-[red] mt-2">
          {{ signupErrorMessage.confirmPassword }}
        </p>
      </div>
    </div>
    <div class="w-[50%]">
      <p v-if="error" class="text-[red] mb-2">{{ error }}</p>
      <button
        class="bg-darkBg border-2 border-darkBg text-[white] py-3 rounded-lg w-[100%] text-lg h-16"
        :class="[
          loading ? 'cursor-not-allowed' : 'hover:bg-white hover:text-darkBg',
        ]"
        @click.prevent="registerUser"
        :disabled="loading"
      >
        <span v-if="loading"><spinning-loader /></span>
        <span v-else>REGISTER</span>
      </button>

      <p class="mt-4">
        Already have an account?
        <RouterLink class="text-darkBg" to="/login">Login</RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { useRegister } from "@/composables/register";
import { useShowPassword } from "@/composables/showPassword";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

const {
  userData,
  uploadImage,
  registerUser,
  signupErrorMessage,
  validate,
  handleMobileInput,
} = useRegister();

const {
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
} = useShowPassword();

const { error, loading } = storeToRefs(useAuthStore());
</script>
