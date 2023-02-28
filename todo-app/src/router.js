import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import CategoryDetails from "./pages/categories/CategoryDetails.vue";
import LoginPage from "./pages/LoginPage.vue";
import Categories from "./pages/categories";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/categories" },
    { path: "/login", component: LoginPage },
    { path: "/categories", component: Categories },
    {
      path: "/category/:id",
      component: CategoryDetails,
      meta: { requiresAuth: true },
      props: true,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// Add navigation guard to check authentication before navigating to protected routes
router.beforeEach((to, from, next) => {
  // Auth functionality not implemented
  const isLoggedIn = true;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (isLoggedIn && to.path === "/login") {
    next("/");
  } else {
    next();
  }
});

export default router;
