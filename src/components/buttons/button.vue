<script setup>
</script>

<template>
  <button id="btn-add" class="btn-task" @click="addTask">
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  </button>
</template>

<style scoped>
.btn-task {
  background-color: #3242f6;
  color: #fff;
  border: none;
  height: 40px;
  width: 50px;
  align-content: end;
  padding: 8px 8px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
