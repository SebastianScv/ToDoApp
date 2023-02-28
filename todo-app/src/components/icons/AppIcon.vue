<template>
  <div class="flex items-center">
    <unicon :name="name" :fill="fillColor"></unicon>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

  return "#22BE74";
});
</script>
