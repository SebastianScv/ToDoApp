import axios from "axios";

export default {
  async getTasks(context, { categoryId }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/tasks/${categoryId}`
      );
      context.commit("setTasks", { tasks: response.data.tasks });
    } catch (error) {
      console.log(error);
    }
  },
  async addTask(context, { name, done, categoryId }) {
    try {
      await axios.post("http://localhost:3000/tasks/add", {
        name,
        done,
        categoryId,
      });
      context.dispatch("getTasks", { categoryId });
    } catch (error) {
      console.log(error);
    }
  },
  async updateTask(context, { task }) {
    try {
      await axios.put(`http://localhost:3000/tasks/update/${task._id}`, task);
      context.dispatch("getTasks", { categoryId: task.categoryId });
    } catch (error) {
      console.log(error);
    }
  },
  async deleteTask(context, { task }) {
    try {
      await axios.delete(`http://localhost:3000/tasks/remove/${task._id}`);
      context.dispatch("getTasks", { categoryId: task.categoryId });
    } catch (error) {
      console.log(error);
    }
  },
};
