<template>
  <div @click="toggleDark()" class="ml-auto cursor-pointer flex items-center">
    <AppIcon :name="isDark ? 'brightness' : 'moon'" />
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<script>
import AppIcon from "../icons/AppIcon.vue";

export default {
  name: "ThemeSelector",
  components: { AppIcon },
};
</script>
