<template>
  <div @click="toggleCheck" class="flex items-center cursor-pointer">
    <AppIcon :name="icon" color="#FFF" />
  </div>
</template>

<script setup>
import AppIcon from "../icons/AppIcon.vue";
import { ref, computed } from "vue";

const props = defineProps({
  initialValue: {
    type: Boolean,
    default: false,
  },
});

const isChecked = ref(props.initialValue);

const emits = defineEmits(["onChange"]);
const icon = computed(() => {
  return isChecked.value ? "check-circle" : "circle";
});
const toggleCheck = () => {
  isChecked.value = !isChecked.value;
  emits("onChange", isChecked.value);
};
</script>
