<template>
  <div class="flex flex-col items-center mt-4 space-y-4">
    <div
      v-for="category in categories"
      :key="category._id"
      class="bg-secondar dark:bg-secondaryDark w-[20svh] flex justify-center rounded py-2 cursor-pointer text-white font-bold"
      @click="onCategoryClick(category)"
    >
      {{ category.name }}
    </div>

    <div
      class="bg-accent dark:bg-accentDark w-[20svh] flex justify-center rounded py-2 cursor-pointer text-white font-bold"
      @click="onAddNewCategory"
    >
      Add Category
    </div>

    <Teleport to="body">
      <Modal
        :modalOpened="modalOpened"
        :title="modalTitle"
        @onClose="onModalClose"
      >
        <template v-slot:content>
          <input
            type="text"
            v-model="newCategoryName"
            class="text-black"
            placeholder="Category name"
          />
        </template>
        <template v-slot:actions>
          <div @click="addNewCategory">Add new Category</div>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import Modal from "@/components/modal";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const categories = computed(() => store.getters["CategoriesModule/categories"]);

const modalOpened = ref(false);
const modalTitle = ref("");
const newCategoryName = ref("");

const onAddNewCategory = () => {
  modalTitle.value = "Add new category";
  modalOpened.value = true;
};

const addNewCategory = async () => {
  await store.dispatch("CategoriesModule/addCategory", {
    name: newCategoryName.value,
  });
  newCategoryName.value = "";
  modalOpened.value = false;
};

const onCategoryClick = (category) => {
  if (!category) {
    return;
  }

  router.push(`/category/${category._id}`);
};

const onModalClose = () => {
  modalOpened.value = false;
};
</script>
