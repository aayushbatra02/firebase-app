import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundView from "../views/NotFoundView.vue";
import { getCurrentUser } from "@/firebase";

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
  const user = await getCurrentUser();
  console.log(user)
  if (!user && to.name !== "login" && to.name !== "register") {
    next({ name: "login" });
  } else if (
    user &&
    (to.name === "login" || to.name === "register")
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
