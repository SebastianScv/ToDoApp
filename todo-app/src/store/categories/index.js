import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const categoriesModule = {
  namespaced: true,
  state() {
    return {
      categories: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default categoriesModule;
