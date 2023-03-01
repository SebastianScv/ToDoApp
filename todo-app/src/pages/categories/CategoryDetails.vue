<template>
  <div class="flex flex-col mt-4 h-[86svh] sm:items-center">
    <div
      class="flex flex-col flex-1 space-y-4 sm:items-center bg-primary dark:bg-primaryDark sm:bg-white sm:dark:bg-secondaryDark sm:rounded pt-4 mb-4 sm:w-[35svw]"
    >
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>

    <div class="flex justify-center">
      <div
        class="bg-accent dark:bg-accentDark rounded font-bold text-white py-2 px-4 cursor-pointer"
        @click="onAddNewTask"
      >
        Add new Task
      </div>
    </div>

    <Teleport to="body">
      <Modal
        :modalOpened="modalOpened"
        :title="modalTitle"
        @onClose="onModalClose"
      >
        <template v-slot:content>
          <TextInput v-model="newTaskName" placeholder="Task name" />
        </template>
        <template v-slot:actions>
          <div @click="addNewTask">Add new Task</div>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
import TextInput from "@/components/textInput";
import Modal from "@/components/modal";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const modalOpened = ref(false);
const modalTitle = ref("");
const newTaskName = ref("");

onMounted(() => {
  store.dispatch("TasksModule/getTasks", { categoryId: props.id });
});

const onAddNewTask = () => {
  modalTitle.value = "Add new task";
  modalOpened.value = true;
};

const addNewTask = async () => {
  await store.dispatch("TasksModule/addTask", {
    name: newTaskName.value,
    done: false,
    categoryId: props.id,
  });
  newTaskName.value = "";
  modalOpened.value = false;
};

const tasks = computed(() => store.getters["TasksModule/tasks"]);

const onModalClose = () => {
  modalOpened.value = false;
};
</script>
