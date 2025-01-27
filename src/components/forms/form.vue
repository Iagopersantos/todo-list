<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
    <el-form-item label="Nome" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Status">
      <el-select v-model="form.status" placeholder="Status">
        <el-option label="Pendente" value="PENDING" />
        <el-option label="Em Andamento" value="IN_PROGRESS" />
        <el-option label="Concluido" value="DONE" />
      </el-select>
    </el-form-item>
    <el-form-item label="Descrição">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="Prioridade">
      <el-select v-model="form.priority" placeholder="Prioridade">
        <el-option label="Alta" value="HIGH" />
        <el-option label="Média" value="MEDIUM" />
        <el-option label="Baixa" value="LOW" />
      </el-select>
    </el-form-item>
    <el-form-item label="Dependências">
      <el-select v-model="form.dependencies" multiple placeholder="Selecione dependências">
        <el-option v-for="task in taskOptions" :key="task.id" :label="task.name" :value="task.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Salvar</el-button>
      <el-button @click="onCancel">Cancelar</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from "vue";
import { useTodoListStore } from "../../store/useTodoListStore";

const emit = defineEmits(["submit", "cancel"]);
const store = useTodoListStore();

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const form = reactive({
  id: null,
  name: "",
  desc: "",
  status: "PENDING",
  priority: "MEDIUM",
  dependencies: [],
});

const rules = {
  name: [{ required: true, message: "O nome é obrigatório", trigger: "blur" }],
};

const formRef = ref(null);

const taskOptions = computed(() => store.todos.filter((t) => t.id !== form.id)); // Exclui a própria tarefa

watch(
  () => props.initialData,
  (newData) => {
    Object.assign(form, newData);
  },
  { immediate: true }
);

const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        if (!form.id) {
          // Criação de uma nova tarefa
          store.addTodo({
            id: Date.now(), // Gera um ID único
            name: form.name,
            desc: form.desc,
            status: form.status,
            priority: form.priority,
            dependencies: form.dependencies,
          });
          console.log("Tarefa criada:", form);
        } else {
          // Emite o evento para o pai atualizar a tarefa existente
          emit("submit", { ...form });
        }

        resetForm(); // Limpa o formulário após salvar
      } else {
        console.error("Erro na validação do formulário");
      }
    });
  } else {
    console.error("Erro: formRef não está definido");
  }
};

const onCancel = () => {
  emit("cancel");
  resetForm();
};

const resetForm = () => {
  form.name = "";
  form.desc = "";
  form.status = "PENDING";
  form.priority = "MEDIUM";
  form.dependencies = [];
};
</script>
