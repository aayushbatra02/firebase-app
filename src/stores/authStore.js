import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive({
    user: {},
  });

  const handleRegister = (userData) => {
    console.log("Registered", userData);
  };

  return { handleRegister, ...toRefs(state) };
});
