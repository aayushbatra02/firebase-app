import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundView from "../views/NotFoundView.vue";

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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
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
