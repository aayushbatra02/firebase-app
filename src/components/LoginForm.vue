<template>
  <form
    class="flex flex-col gap-6 w-[95%] md:w-[50%] sm:w-[80%] items-center justify-center mx-auto my-12 border border-[3px] border-darkBg rounded-xl py-8 md:py-0 md:border-none"
  >
    <h1 class="text-3xl font-bold text-center text">LOGIN</h1>

    <div class="flex flex-col gap-4 items-center w-[80%] sm:w-[70%] md:w-[50%]">
      <div class="w-[100%]">
        <input
          class="rounded p-3 bg-lightBg w-[100%]"
          type="text"
          placeholder="Email"
          v-model="loginData.email"
          @input="validate('email')"
        />
        <p class="text-[red] mt-2">{{ loginErrorMessage.email }}</p>
      </div>
      <div class="w-[100%] relative">
        <div class="flex items-center">
          <input
            class="rounded p-3 bg-lightBg w-[100%] pr-[15%]"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="loginData.password"
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
        <p class="text-[red] mt-2">{{ loginErrorMessage.password }}</p>
      </div>
    </div>
    <div class="w-[50%]">
      <p v-if="error" class="text-[red] mb-2">{{ error }}</p>
      <button
        class="bg-darkBg border-2 border-darkBg text-[white] py-3 rounded-lg w-[100%] text-lg h-16"
        :class="[
          loading ? 'cursor-not-allowed' : 'hover:bg-white hover:text-darkBg',
        ]"
        :disabled="loading"
        @click.prevent="loginUser"
      >
        <span v-if="loading"> <spinning-loader v-if="loading" /></span>
        <span v-else>LOGIN</span>
      </button>
      <p class="mt-4">
        Don't have an account?
        <RouterLink class="text-darkBg" to="/register">Register</RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { useLogin } from "@/composables/login";
import { useShowPassword } from "@/composables/showPassword";
import { useLoginStore } from "@/stores/loginStore";
import { storeToRefs } from "pinia";

const { loginData, loginErrorMessage, loginUser, validate } = useLogin();

const { showPassword, togglePassword } = useShowPassword();

const { loading, error } = storeToRefs(useLoginStore());
</script>
