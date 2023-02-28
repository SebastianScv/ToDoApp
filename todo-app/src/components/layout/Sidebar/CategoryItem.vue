<template>
  <div class="cursor-pointer">
    <SidebarItemBase :name="category.name" :id="category._id">
      <template v-slot:actions>
        <AppIcon name="pen" @click="onEditCategory" />
        <AppIcon name="trash" @click="deleteCategory"
      /></template>
    </SidebarItemBase>
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
          <div @click="editCategory">Edit category</div>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import AppIcon from "@/components/icons/AppIcon.vue";
import SidebarItemBase from "./SidebarItemBase.vue";
import Modal from "@/components/modal";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const modalOpened = ref(false);
const modalTitle = ref("");
const newCategoryName = ref("");

const onEditCategory = () => {
  modalTitle.value = "Edit category";
  newCategoryName.value = props.category.name;
  modalOpened.value = true;
};

const editCategory = async () => {
  await store.dispatch("CategoriesModule/editCategory", {
    category: props.category,
    name: newCategoryName.value,
  });

  modalOpened.value = false;
};

const deleteCategory = () => {
  store.dispatch("CategoriesModule/deleteCategory", { id: props.category._id });
};

const onModalClose = () => {
  modalOpened.value = false;
};
</script>
