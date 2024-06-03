import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SigninView from "../views/SigninView.vue";
import SignupView from "../views/SignupView.vue";
import AdminView from "../views/AdminView.vue";
import UsersView from "../views/UsersView.vue";
import PostsView from "../views/PostsView.vue";
import CommentsView from "../views/CommentsView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: SigninView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
  },
  {
    path: "/comments",
    name: "comments",
    component: CommentsView,
  },
  {
    path: "/",
    redirect: "/signin",
  },
  {
    path: "*",
    redirect: "/signin",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta && to.meta.requiresAuth && !token) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
