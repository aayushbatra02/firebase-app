  <template>
  <div class="flex justify-centerbg-white min-h-[100vh]">
    <div
      class="w-[50%] flex items-center justify-center pt-12 flex-col bg-gradient-to-r from-[#2c7af5] to-darkBg text-[white]"
    >
      <p class="text-xl mb-12">Welcome To</p>
      <h1 class="text-4xl font-bold font-sans mb-4 italic">SOCIOGRAM</h1>
      <p>Connect | Share | Explore</p>
    </div>
    <form
      class="flex flex-col gap-12 w-[50%] items-center justify-center my-12"
    >
      <h1 class="text-3xl font-bold text-center text">REGISTER</h1>
      <div class="flex flex-col gap-6 items-center w-[50%]">
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

      <button
        class="bg-darkBg border-2 border-darkBg text-[white] py-3 rounded-lg w-[50%] hover:bg-white hover:text-darkBg text-lg"
        @click="registerUser"
      >
        REGISTER
      </button>
    </form>
  </div>
</template>

  <script setup>
import { useRegister } from "@/composables/register";

const { userData, uploadImage, registerUser, errorMessage, validate } =
  useRegister();
</script>

  <style lang="scss" scoped>
</style>