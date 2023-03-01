export default {
  setTasks(state, { tasks }) {
    state.tasks = tasks;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};
