<template>
  <div class="table-container">
    <el-table
      ref="tableRef"
      row-key="name"
      :data="filterTableData"
      style="width: 100%; cursor: pointer"
      @row-click="handleRowClick"
      :border="true"
    >
      <el-table-column width="180" label="Ações">
        <template #default="scope">
          <el-radio
            size="small"
            type="success"
            :disabled="scope.row.status === 'DONE' || !canComplete(scope.row)"
            @click.stop="completeTask(scope.row)"
          >
            {{ scope.row.status === "DONE" ? "Concluído" : "Pendente" }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nome" width="180" />
      <el-table-column
        width="180"
        prop="status"
        label="Status"
        :filters="[ 
          { text: 'Em Andamento', value: 'IN_PROGRESS' },
          { text: 'Pendente', value: 'PENDING' },
          { text: 'Concluída', value: 'DONE' },
        ]"
        :filter-method="filterHandler"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.status === 'PENDING' ? 'warning' : scope.row.status === 'IN_PROGRESS' ? 'info' : 'success'" disable-transitions>
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="Descrição" width="400" />
      <el-table-column
        width="180"
        prop="priority"
        label="Prioridade"
        :filters="[ 
          { text: 'Alta', value: 'HIGH' },
          { text: 'Média', value: 'MEDIUM' },
          { text: 'Baixa', value: 'LOW' },
        ]"
        :filter-method="filterHandler"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.priority === 'HIGH' ? 'danger' : scope.row.priority === 'MEDIUM' ? 'warning' : 'success'" disable-transitions>
            {{ getPriorityText(scope.row.priority) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="dependencies" label="Dependências" width="180">
        <template #default="scope">
          <el-tag v-for="depId in scope.row.dependencies" :key="depId" type="info" disable-transitions>
            {{ depId }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Ações" width="300">
        <template #header>
          <el-input v-model="search" size="medium" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"> Edit </el-button>
          <el-button size="small" type="danger" @click.stop="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="Detalhes da Tarefa" v-model="drawerEdit" :visible.sync="drawerEdit" size="50%">
      <Form :initialData="selectedRow" @submit="handleFormSubmit" />
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useTodoListStore } from "@/store/useTodoStore";
import Form from "../forms/form.vue";

const store = useTodoListStore();

const todos = ref([]);

onMounted(() => {
  todos.value = store.todos;
});

const drawerEdit = ref(false);
const selectedRow = ref({});

const handleRowClick = (row) => {
  selectedRow.value = { ...row };
  drawerEdit.value = true;
};

const handleEdit = (row) => {
  selectedRow.value = { ...row };
  drawerEdit.value = true;
};

const handleDelete = (row) => {
  store.deleteTodo(row.id);
  todos.value = store.todos; // Atualize a lista após a exclusão
};

const handleFormSubmit = (updatedData) => {
  // Atualize a tarefa no store
  const index = todos.value.findIndex(todo => todo.id === updatedData.id);
  if (index !== -1) {
    todos.value[index] = updatedData;
  }
  drawerEdit.value = false;
};

const search = ref("");
const filterTableData = computed(() =>
  todos.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const filterHandler = (value, row, column) => {
  const property = column["property"];
  return row[property] === value;
};

const getStatusText = (status) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "IN_PROGRESS":
      return "Em Andamento";
    case "DONE":
      return "Concluída";
    default:
      return status;
  }
};

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

const canComplete = (task) => {
  if (!task.dependencies || task.dependencies.length === 0) {
    return true;
  }
  return task.dependencies.every(depId => {
    const depTask = todos.value.find(todo => todo.id === depId);
    return depTask && depTask.status === 'DONE';
  });
};

const completeTask = (task) => {
  if (canComplete(task)) {
    task.status = 'DONE';
    store.updateTodoStatus(task);
  } else {
    alert('Você não pode completar esta tarefa até que todas as dependências sejam concluídas.');
  }
};
</script>

<style>
.table-container {
  padding: 20px;
}

</style>
