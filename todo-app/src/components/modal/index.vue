<template>
  <transition name="modal">
    <div
      v-show="modalOpened"
      class="fixed bg-[#0008] top-0 h-full w-full flex text-white items-center justify-center"
    >
      <div
        class="flex flex-col bg-secondary dark:bg-secondaryDark p-4 rounded min-w-[300px] sm:min-w-[300px]"
      >
        <div class="flex">
          <div class="font-bold text-xl">{{ title }}</div>
          <AppIcon
            class="flex ml-auto cursor-pointer"
            name="times-square"
            @click="onClose"
          />
        </div>
        <div class="my-4">
          <slot name="content"> </slot>
        </div>
        <div
          class="flex justify-center bg-accent dark:bg-accentDark rounded cursor-pointer py-1 px-2 max-w-[200px]"
        >
          <slot name="actions"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import AppIcon from "../icons/AppIcon.vue";

const emit = defineEmits(["onClose"]);
const onClose = () => {
  emit("onClose");
};

defineProps({
  modalOpened: {
    type: Boolean,
    requred: true,
  },
  title: {
    type: String,
    requred: true,
  },
});
</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-out;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
