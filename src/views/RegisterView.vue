  <template>
  <div class="md:flex justify-centerbg-white min-h-[100vh]">
    <div class="md:w-[50%]"></div>
    <div
      class="md:w-[50%] flex items-center justify-center pt-12 flex-col md:bg-gradient-to-r from-[#2c7af5] to-darkBg md:text-[white] md:fixed top-0 bottom-0"
    >
      <p class="text-xl mb-4 md:mb-12">Welcome To</p>
      <h1
        class="text-4xl font-bold font-sans mb-4 italic text-darkBg md:text-white"
      >
        SOCIOGRAM
      </h1>
      <p>Connect | Share | Explore</p>
    </div>
    <form
      class="flex flex-col gap-6 w-[95%] md:w-[50%] sm:w-[80%] items-center justify-center mx-auto my-12 border border-[3px] border-darkBg rounded-xl py-8 md:py-0 md:border-none"
    >
      <h1 class="text-3xl font-bold text-center text">REGISTER</h1>
      <div
        class="flex flex-col gap-4 items-center w-[80%] sm:w-[70%] md:w-[50%]"
      >
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="First Name"
            v-model="userData.firstName"
            @input="validate('firstName')"
          />
          <p class="text-[red] mt-2">{{ errorMessage.firstName }}</p>
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Last Name"
            v-model="userData.lastName"
            @input="validate('lastName')"
          />
          <p class="text-[red] mt-2">{{ errorMessage.lastName }}</p>
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="number"
            placeholder="Mobile No"
            v-model="userData.mobileNo"
            @input="validate('mobileNo')"
          />
          <p class="text-[red] mt-2">{{ errorMessage.mobileNo }}</p>
        </div>
        <div class="w-[100%]">
          <div class="flex justify-between gap-2 flex-row flex-wrap">
            <div class="flex flex-col">
              <label class="text-[gray]">Profile Photo</label>
              <input
                type="file"
                @change="uploadImage"
                class="mt-4 w-[15rem]"
                accept="profilePhoto/*"
              />
            </div>
            <img
              v-if="userData.imageUrl"
              :src="userData.imageUrl"
              class="w-[6rem] h-[6rem] rounded-[50%] object-cover"
            />
          </div>
          <p class="text-[red] mt-2">{{ errorMessage.profilePhoto }}</p>
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="text"
            placeholder="Email"
            v-model="userData.email"
            @input="validate('email')"
          />
          <p class="text-[red] mt-2">{{ errorMessage.email }}</p>
        </div>
        <div class="w-[100%] relative">
          <div class="flex items-center">
            <input
              class="rounded p-3 bg-lightBg w-[100%] pr-[15%]"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="userData.password"
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

          <p class="text-[red] mt-2">{{ errorMessage.password }}</p>
        </div>
        <div class="w-[100%] relative">
          <div class="flex items-center">
            <input
              class="rounded p-3 bg-lightBg w-[100%]"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm Password"
              v-model="userData.confirmPassword"
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
          <p class="text-[red] mt-2">{{ errorMessage.confirmPassword }}</p>
        </div>
      </div>
      <div class="w-[50%]">
        <p v-if="error" class="text-[red] mb-2">{{ error }}</p>
        <button
          class="bg-darkBg border-2 border-darkBg text-[white] py-3 rounded-lg w-[100%] text-lg h-16"
          :class="[
            loading ? 'cursor-not-allowed' : 'hover:bg-white hover:text-darkBg',
          ]"
          @click="registerUser"
          :disabled="loading"
        >
          <span v-if="loading"> <spinning-loader v-if="loading" /></span>
          <span v-else>REGISTER</span>
        </button>
      </div>
    </form>
    <confirmation-modal v-if="showConfirmationModal" @on-confirm-button="closeConfirmationModal" title="congratulations" description="User is created successfully !!!" confirm-button-text="OK"/>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";

import { useRegister } from "@/composables/register";
import { useAuthStore } from "@/stores/authStore";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { useShowPassword } from "@/composables/showPassword";
import ConfirmationModal from "@/components/ConfirmationModal.vue"

const { userData, uploadImage, registerUser, errorMessage, validate, showConfirmationModal, closeConfirmationModal } =
  useRegister();

const {
  showPassword,
  showConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
} = useShowPassword();

const { error, loading } = storeToRefs(useAuthStore());
</script>
