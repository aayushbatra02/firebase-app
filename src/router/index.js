import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundView from "../views/NotFoundView.vue";
import { useUser } from "@/composables/user";

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
  {
    path: "/login",
    name: "login",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { getCurrentUser } = useUser();
  const user = await getCurrentUser();
  if (!user && to.name !== "login" && to.name !== "register") {
    next({ name: "login" });
  } else if (user && (to.name === "login" || to.name === "register")) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
