import axios from "axios";

export default {
  async getCategories(context) {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      context.commit("setCategories", { categories: response.data.categories });
    } catch (error) {
      console.log(error);
    }
  },
  async addCategory(context, { name }) {
    try {
      await axios.post("http://localhost:3000/categories/add", { name });
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    }
  },
  async deleteCategory(context, { id }) {
    try {
      await axios.delete(`http://localhost:3000/categories/remove/${id}`);
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    }
  },
  async editCategory(context, { category, name }) {
    try {
      await axios.put(
        `http://localhost:3000/categories/update/${category._id}`,
        {
          name,
        }
      );
      context.dispatch("getCategories");
    } catch (error) {
      console.log(error);
    }
  },
};
