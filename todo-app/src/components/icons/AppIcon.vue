<template>
  <div class="flex items-center">
    <unicon :name="name" :fill="fillColor"></unicon>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

const fillColor = computed(() => {
  if (props.color) {
    return props.color;
  }

  return isDark.value ? "#22BE74" : "#FFA17A";
});
</script>
