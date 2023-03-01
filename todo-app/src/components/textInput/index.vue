<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    class="text-black py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    :placeholder="placeholder"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
