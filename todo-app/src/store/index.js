import { createStore } from "vuex";
import authModule from "./auth";
import categoriesModule from "./categories";
import tasksModule from "./tasks";

const store = createStore({
  modules: {
    CategoriesModule: categoriesModule,
    TasksModule: tasksModule,
    AuthModule: authModule,
  },
});

export default store;
