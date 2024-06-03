import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createPinia } from "pinia";
// import "./firebase";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
