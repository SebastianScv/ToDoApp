import axios from "axios";
import { BASE_URL } from "@/api";

export default {
  async getTasks(context, { categoryId }) {
    try {
      context.commit("setIsLoading", true);
      const response = await axios.get(`${BASE_URL}/tasks/${categoryId}`);
      context.commit("setTasks", { tasks: response.data.tasks });
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async addTask(context, { name, done, categoryId }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.post(`${BASE_URL}/tasks/add`, {
        name,
        done,
        categoryId,
      });
      context.dispatch("getTasks", { categoryId });
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async updateTask(context, { task }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.put(`${BASE_URL}/tasks/update/${task._id}`, task);
      context.dispatch("getTasks", { categoryId: task.categoryId });
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async deleteTask(context, { task }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.delete(`${BASE_URL}/tasks/remove/${task._id}`);
      context.dispatch("getTasks", { categoryId: task.categoryId });
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
};
