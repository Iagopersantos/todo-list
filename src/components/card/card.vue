<template>
  <div class="kanban-item">
    <span class="kanban-name">{{ task.name }}</span>
    <el-badge
      :value="getPriorityText(task.priority)"
      :status="
        task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning' : 'success'
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

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
.kanban-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  width: 94%;
  height: 60px;
}

.kanban-name {
  font-size: 16px;
  font-weight: bolder;
}
</style>
