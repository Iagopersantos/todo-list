<template>
  <div class="kanban">
    <div class="kanban-body">
      <div class="kanban-column">
        <h3>Pendente</h3>
        <Card v-for="task in pendingTasks" :key="task.id" :task="task" />
      </div>
      <div class="kanban-column">
        <h3>Em Andamento</h3>
       <Card v-for="task in inProgressTasks" :key="task.id" :task="task" />
      </div>
      <div class="kanban-column">
        <h3>Concluída</h3>
        <Card v-for="task in doneTasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useTodoListStore } from "@/store/useTodoListStore";
import Card from "../card/card.vue";

const store = useTodoListStore();

const todos = ref([]);

onMounted(() => {
  todos.value = store.todos;
});

const pendingTasks = computed(() => todos.value.filter(task => task.status === 'PENDING'));
const inProgressTasks = computed(() => todos.value.filter(task => task.status === 'IN_PROGRESS'));
const doneTasks = computed(() => todos.value.filter(task => task.status === 'DONE'));

const getPriorityText = (priority) => {
  switch (priority) {
    case "HIGH":
      return "Alta";
    case "MEDIUM":
      return "Média";
    case "LOW":
      return "Baixa";
    default:
      return priority;
  }
};
</script>

<style scoped>
.kanban {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 98%;
  height: 90%;
  margin-top: 8px;
}

.kanban-body {
  display: flex;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.kanban-column {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 30%;
  height: 100%;
  padding: 10px;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.kanban-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  width: 94%;
}
</style>
