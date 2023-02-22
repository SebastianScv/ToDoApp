import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/NotFound.vue";
import CategoriesList from "./pages/categories/CategoriesList";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/categories" },
    { path: "/categories", component: CategoriesList },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
