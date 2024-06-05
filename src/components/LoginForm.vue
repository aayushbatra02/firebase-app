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
          v-model.trim="loginData.email"
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
            v-model.trim="loginData.password"
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
    <div class="w-[80%] sm:w-[70%] md:w-[50%]">
      <p v-if="error" class="text-[red] mb-2">{{ error }}</p>
      <form-button
        buttonText="login"
        @onSubmit="loginUser"
        :loading="loading"
      />
      <p class="mt-4">
        Don't have an account?
        <RouterLink class="text-darkBg" to="/register">Register</RouterLink>
      </p>
    </div>
    <div>OR</div>
    <button
      @click.prevent="googleSignup"
      class="border-2 border-darkBg text-darkBg hover:bg-darkBg hover:text-white w-[80%] sm:w-[70%] md:w-[50%] p-4 rounded-lg flex justify-center items-center gap-4 md:text-lg"
    >
      <Icon icon="devicon:google" class="w-6 h-6" /><span
        >Sign up with Google</span
      >
    </button>
    <button
      @click.prevent="facebookSignup"
      class="border-2 border-darkBg text-darkBg hover:bg-darkBg hover:text-white w-[80%] sm:w-[70%] md:w-[50%] p-4 rounded-lg flex justify-center items-center gap-4 md:text-lg"
    >
      <Icon icon="devicon:facebook" class="w-6 h-6" />
      <span>Sign up with Facebook</span>
    </button>
    <button
      @click.prevent="twitterSignup"
      class="border-2 border-darkBg text-darkBg hover:bg-darkBg hover:text-white w-[80%] sm:w-[70%] md:w-[50%] p-4 rounded-lg flex justify-center items-center gap-4 md:text-lg"
    >
      <Icon icon="devicon:twitter" class="w-6 h-6" />
      <span>Sign up with Twitter</span>
    </button>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useLogin } from "@/composables/login";
import { useShowPassword } from "@/composables/showPassword";
import { useLoginStore } from "@/stores/loginStore";
import FormButton from "@/components/FormButton.vue";
const { loginData, loginErrorMessage, loginUser, validate } = useLogin();

const { showPassword, togglePassword } = useShowPassword();

const { error, loading } = storeToRefs(useLoginStore());
const { googleSignup, facebookSignup, twitterSignup } = useLoginStore();
</script>
