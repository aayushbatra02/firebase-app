import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createPinia } from "pinia";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "@/assets/ckeditor-reset.css";
const pinia = createPinia();

createApp(App).use(pinia).use(router).use(CKEditor).mount("#app");
