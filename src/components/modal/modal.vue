<template>
  <el-button type="primary" class="btn-task" style="margin-left: 16px" @click="drawer2 = true">
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
  </el-button>

  <el-drawer v-model="drawer2" :direction="direction"  size="50%" title="Crie uma nova tarefa">
    <template #title>
      <h2>Crie uma nova tarefa</h2>
    </template>
      <Form />
      <Uploads />
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { DrawerProps } from "element-plus";
import Form from "../forms/form.vue";
import Uploads from "../upload/uploads.vue";

const drawer2 = ref(false);
const direction = ref<DrawerProps["direction"]>("rtl");
</script>

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
