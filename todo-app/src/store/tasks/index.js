import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const tasksModule = {
  namespaced: true,
  state() {
    return {
      tasks: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default tasksModule;
