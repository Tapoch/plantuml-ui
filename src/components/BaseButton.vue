<template>
  <button class="p-1 text-gray-700 active:bg-gray-100 active:text-black">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      v-html="svgs[props.type]"
    ></svg>
  </button>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: String,
});

const svgs = {
  save: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />',
  load: '<path stroke-linecap="round" stroke-linejoin="round"  stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />',
  delete:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',
};
</script>
