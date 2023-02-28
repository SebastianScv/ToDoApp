<template>
  <div class="bg-primary dark:bg-primaryDark w-full rounded flex p-4 sm:mr-4">
    <span class="text-lg font-bold dark:text-accentBlack">{{ name }}</span>
    <div class="ml-auto flex space-x-4 items-center">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
});
</script>
