<template>
  <transition>
    <div
      v-if="toggled"
      class="bg-secondary dark:bg-secondaryDark h-full w-full items-center flex flex-col relative text-black dark:text-darken"
    >
      <div
        class="flex flex-col w-full space-y-2 flex-1 max-h-[84svh] overflow-scroll sm:overflow-hidden sm:max-h-[91svh]"
      >
        <CategoryItem
          v-for="category in categories"
          :key="category._id"
          :category="category"
          @click="onCategoryClick($event, category)"
        />

        <div class="flex justify-center">
          <div
            @click="onAddCategory"
            class="p-1 bg-primary dark:bg-primaryDark rounded-full flex items-center cursor-pointer"
          >
            <AppIcon name="plus" />
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Modal
          :modalOpened="modalOpened"
          :title="modalTitle"
          @onClose="onModalClose"
        >
          <template v-slot:content>
            <TextInput v-model="newCategoryName" placeholder="Category name" />
          </template>
          <template v-slot:actions>
            <div @click="addNewCategory">Add Category</div>
          </template>
        </Modal>
      </Teleport>
    </div>
  </transition>
</template>

<script setup>
import TextInput from "@/components/textInput";
import Modal from "@/components/modal";
import AppIcon from "../../icons/AppIcon.vue";
import CategoryItem from "./CategoryItem.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

defineProps({
  toggled: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["toggleSidebar"]);

const modalOpened = ref(false);
const modalTitle = ref("");
const newCategoryName = ref("");

const categories = computed(() => store.getters["CategoriesModule/categories"]);

const onCategoryClick = ($event, category) => {
  if (!$event.target.id) {
    return;
  }
  router.push("/category/" + category._id);
  store.dispatch("TasksModule/getTasks", { categoryId: category._id });
  emits("toggleSidebar", false);
};

const onAddCategory = () => {
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

const onModalClose = () => {
  modalOpened.value = false;
};
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-400px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
