import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import CategoryDetails from "./pages/categories/CategoryDetails.vue";
import LoginPage from "./pages/LoginPage.vue";
import Categories from "./pages/categories";
import store from "./store";

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
      props: true, // Pass route params as props to component
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// Add navigation guard to check authentication before navigating to protected routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["AuthModule/userIsAuthenticated"];
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
