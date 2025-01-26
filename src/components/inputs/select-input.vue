<template>
  <el-select
    class="select"
    v-model="value4"  
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="3"
    placeholder="Status"
    style="width: 240px"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value4 = ref([]);
const options = [
  {
    value: "PENDING",
    label: "Pendente",
  },
  {
    value: "IN_PROGRESS",
    label: "Em Andamento",
  },
  {
    value: "DONE",
    label: "Concluída",
  },
];
</script>
