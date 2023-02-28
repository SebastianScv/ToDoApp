<template>
  <div class="flex items-center">
    <unicon :name="name" :fill="fillColor"></unicon>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
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
  const isDark = useDark();
  if (props.color) {
    return props.color;
  }

  return isDark ? "#22BE74" : "#F3EADA";
});
</script>
