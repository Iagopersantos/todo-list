<template>
  <el-input
    v-model="input1"
    style="width: 240px"
    size="large"
    placeholder="Please Input"
    :suffix-icon="Search"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const input1 = ref("");
</script>
