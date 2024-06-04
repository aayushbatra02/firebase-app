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

    <register-form v-if="!onLoginPage" />
    <login-form v-else />
    <confirmation-modal
      v-if="showConfirmationModal"
      @on-confirm-button="closeConfirmationModal"
      title="congratulations"
      description="User is created successfully !!!"
      confirm-button-text="OK"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRegister } from "@/composables/register";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import { useAuthStore } from "@/stores/authStore";
const { closeConfirmationModal, onLoginPage } = useRegister();
const { showConfirmationModal } = storeToRefs(useAuthStore());
</script>
