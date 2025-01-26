<script setup></script>
<template>
    <div class="empty-tasks">
        <img src="../assets/empty.png" alt="empty">
        <h1>No tasks here</h1>
        <p>Start adding tasks by clicking the button below</p>
        <button @click="addTask">Add task</button>
    </div>
</template>
<style scoped>
    .empty-tasks {
        text-align: center;
        padding: 10px;
    }
</style>