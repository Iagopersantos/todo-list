<script setup>
import { ref } from "vue";
import TodoList from "@/components/table/todo-list.vue";
import Kanban from "@/components/table/kanban.vue";

const render = ref(false);
</script>

<template>
  <div class="home">
    <div class="body">
      <el-button @click="render = !render">{{ render ? 'Mostrar Kanban' : 'Mostrar Lista' }}</el-button>
      <TodoList v-if="render" />
      <Kanban v-else />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 98%;
  height: 90%;
  margin-top: 8px;
  box-shadow: 0 0 2px #a7a4a4;
  background-color: #fff;
  border-radius: 6px;
}

.body {
  width: 94%;
  margin: 18px 28px;
  align-items: center;
  justify-content: center;
}
</style>
