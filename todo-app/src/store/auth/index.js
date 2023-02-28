import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const authModule = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: true,
    };
  },
  getters,
  mutations,
  actions,
};

export default authModule;
