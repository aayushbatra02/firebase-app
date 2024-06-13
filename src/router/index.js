import { createRouter, createWebHashHistory } from "vue-router";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/post-list",
    name: "postList",
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
    path: "/add-post",
    name: "addPost",
    component: () => import("../views/AddPostView.vue"),
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
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn && to.name !== "login" && to.name !== "register") {
    next({ name: "login" });
  } else if (
    loggedIn &&
    (to.name === "login" || to.name === "register")
  ) {
    next({ name: "postList" });
  } else {
    next();
  }
});

export default router;
