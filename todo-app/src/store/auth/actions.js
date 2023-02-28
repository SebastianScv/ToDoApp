export default {
  login(context) {
    context.commit("setIsLoggedIn", { isLoggedIn: true });
  },
  logout(context) {
    context.commit("setIsLoggedIn", { isLoggedIn: false });
  },
};
