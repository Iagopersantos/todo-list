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
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Salvar</el-button>
      <el-button @click="onCancel">Cancelar</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useTodoListStore } from '@/store/useTodoStore';

const store = useTodoListStore();

const form = reactive({
  name: '',
  desc: '',
  status: 'PENDING',
  priority: 'MEDIUM',
});

const rules = {
  name: [
    { required: true, message: 'O nome é obrigatório', trigger: 'blur' }
  ]
};

const formRef = ref(null);

const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        store.addTodo({
          name: form.name,
          desc: form.desc,
          status: form.status,
          priority: form.priority,
        });
        console.log('Tarefa criada:', form);
        form.name = '';
        form.desc = '';
        form.status = '';
        form.priority = '';
      } else {
        console.log('Erro na validação do formulário: O nome é obrigatório');
      }
    });
  } else {
    alert('Erro: formRef não está definido');
  }
};

const onCancel = () => {
  form.name = '';
  form.desc = '';
  form.status = 'PENDING';
  form.priority = 'MEDIUM';
};
</script>
