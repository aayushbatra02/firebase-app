// import { ref } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   // const authStore = useAuthStore();
//   // const { user } = storeToRefs(authStore);
//   const user = ref(false);
//   if (to.name !== "register" && !user.value) {
//     next({ name: "register" || to.name === "login"  });
//   } else if ((to.name === "register" || to.name === "login") && user.value) {
//     next({ name: "PollList" });
//   } else {
//     next();
//   }
// });

export default router;
