<script setup>
import { defineComponent, ref } from 'vue';
defineComponent({
  props: {
    selected: Boolean,
  }
});

const addTask = () => {
  console.log('Add task');
};

const removeTask = () => {
  console.log('Remove task');
};
</script>

<template>
  <button v-if="selected" class="btn-task" @click="removeTask">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M19 12H5"></path>
    </svg>
  </button>

  <button v-else class="btn-task" @click="addTask">
    <svg
      xmlns="http://www.w3.org/"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
  </button>
</template>

<style></style>
