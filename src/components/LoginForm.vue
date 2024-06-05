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
    <div class="w-[80%] sm:w-[70%] md:w-[50%] flex flex-col gap-4">
      <form-button
        v-for="({ buttonText, iconName, providerType }, i) in socialAuths"
        :key="i"
        :buttonText="buttonText"
        @onSubmit="socialSignup(providerType)"
        :loading="false"
        :iconName="iconName"
      />
    </div>
  </form>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useLogin } from "@/composables/login";
import { useShowPassword } from "@/composables/showPassword";
import { useLoginStore } from "@/stores/loginStore";
import FormButton from "@/components/FormButton.vue";
import { FACEBOOK_PROVIDER_TYPE, GOOGLE_PROVIDER_TYPE, TWITTER_PROVIDER_TYPE } from "@/contants";
const { loginData, loginErrorMessage, loginUser, validate } = useLogin();

const { showPassword, togglePassword } = useShowPassword();

const { error, loading } = storeToRefs(useLoginStore());
const { socialSignup } = useLoginStore();
const socialAuths = [
  {
    buttonText: "Google Signup",
    iconName: "devicon:google",
    providerType: GOOGLE_PROVIDER_TYPE,
  },
  {
    buttonText: "Facebook Signup",
    iconName: "devicon:facebook",
    providerType: FACEBOOK_PROVIDER_TYPE,
  },
  {
    buttonText: "Twitter Signup",
    iconName: "devicon:twitter",
    providerType: TWITTER_PROVIDER_TYPE,
  },
];
</script>
