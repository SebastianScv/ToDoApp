import { createStore } from "vuex";
import categoriesModule from "./categories";
import tasksModule from "./tasks";

const store = createStore({
  modules: {
    CategoriesModule: categoriesModule,
    TasksModule: tasksModule,
  },
});

export default store;
