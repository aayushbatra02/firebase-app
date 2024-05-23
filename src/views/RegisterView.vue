  <template>
  <div class="md:flex justify-centerbg-white min-h-[100vh]">
    <div
      class="md:w-[50%] flex items-center justify-center pt-12 flex-col md:bg-gradient-to-r from-[#2c7af5] to-darkBg md:text-[white]"
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
      class="flex flex-col gap-8 w-[95%] md:w-[50%] sm:w-[80%] items-center justify-center mx-auto my-12 border border-[3px] border-darkBg rounded-xl py-8 md:py-0 md:border-none"
    >
      <h1 class="text-3xl font-bold text-center text">REGISTER</h1>
      <div
        class="flex flex-col gap-6 items-center w-[80%] sm:w-[70%] md:w-[50%]"
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
          <div class="flex">
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
              v-if="userData.profilePhoto"
              :src="userData.profilePhoto"
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
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="password"
            placeholder="Password"
            v-model="userData.password"
            @input="validate('password')"
          />
          <p class="text-[red] mt-2">{{ errorMessage.password }}</p>
        </div>
        <div class="w-[100%]">
          <input
            class="rounded p-3 bg-lightBg w-[100%]"
            type="password"
            placeholder="Confirm Password"
            v-model="userData.confirmPassword"
            @input="validate('confirmPassword')"
          />
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
  </div>
</template>

  <script setup>
import { useRegister } from "@/composables/register";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import SpinningLoader from "@/components/SpinningLoader.vue"

const { userData, uploadImage, registerUser, errorMessage, validate } =
  useRegister();

const { error, loading } = storeToRefs(useAuthStore());
</script>
