import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const tasksModule = {
  namespaced: true,
  state() {
    return {
      tasks: [],
      isLoading: false,
    };
  },
  getters,
  actions,
  mutations,
};

export default tasksModule;
