import axios from "axios";
import { BASE_URL } from "@/api";

export default {
  async getCategories(context) {
    try {
      context.commit("setIsLoading", true);
      const response = await axios.get(`${BASE_URL}/categories`);
      context.commit("setCategories", { categories: response.data.categories });
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async addCategory(context, { name }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.post(`${BASE_URL}/categories/add`, { name });
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async deleteCategory(context, { id }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.delete(`${BASE_URL}/categories/remove/${id}`);
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
  async editCategory(context, { category, name }) {
    if (context.getters.isLoading) {
      return;
    }
    try {
      context.commit("setIsLoading", true);
      await axios.put(`${BASE_URL}/categories/update/${category._id}`, {
        name,
      });
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    } finally {
      context.commit("setIsLoading", false);
    }
  },
};
