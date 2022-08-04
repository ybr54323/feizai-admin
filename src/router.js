import { createWebHistory, createRouter } from "vue-router";
// import Form from "@/views/form.vue";
import Login from "@/views/login.vue";
import Posts from "@/views/post/index.vue";
import nprogress from "nprogress";
const routes = [
  // { path: "/", component: Form },
  { path: "/login", component: Login },
  { path: "/", component: Posts },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});
router.beforeEach((to, from, next) => {
  nprogress.start();
  if (to.path === "/login") return next();
  const logined = window.sessionStorage.getItem("logined");
  if (!logined) {
    next({ path: "/login" });
  } else next();
});
router.afterEach(nprogress.done);
export default router;
