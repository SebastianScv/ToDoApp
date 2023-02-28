<template>
  <div
    :class="{
      'bg-accent dark:bg-accentDark': task.done,
      'bg-secondary dark:bg-secondaryDark sm:bg-secondary sm:dark:bg-primaryDark':
        !task.done,
    }"
    class="flex rounded text-white mx-4 px-4 py-2 items-center sm:w-[30svw]"
  >
    <div class="flex space-x-2">
      <Checkbox :initialValue="task.done" @onChange="onTaskChange" />
      <span>
        {{ task.name }}
      </span>
    </div>
    <div class="flex ml-auto">
      <div @click="onRemove">
        <AppIcon name="trash" color="#FFF" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Checkbox from "@/components/checkbox/index.vue";
import AppIcon from "@/components/icons/AppIcon.vue";
import store from "@/store";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const onTaskChange = (taskChecked) => {
  const updatedTask = structuredClone(props.task);
  updatedTask.done = taskChecked;
  store.dispatch("TasksModule/updateTask", { task: updatedTask });
};

const onRemove = () => {
  store.dispatch("TasksModule/deleteTask", { task: props.task });
};
</script>
