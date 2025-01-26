<script setup>
import AppSidebar from "@/components/sidebar/app-sidebar.vue";
import home from "@/views/home.vue";

const components = {
  AppSidebar,
  home,
};
</script>

<template>
  <div class="root">
    <div class="nav">
      <img
        src="@/assets/image.png"
        class="logo"
        alt="Gerenciador de Tarefas"
        title="Gerenciador de Tarefas"
      />
    </div>
    <div class="app">
      <AppSidebar />
      <home />
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 12px;
  cursor: pointer;
}

.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: unset;
  cursor: pointer;
}

.root {
  display: flex;
  flex-direction: row;
  background-color: #fff;
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 3%;
  margin-top: 4px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 2px #a7a4a4;
}

.app {
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  height: 98vh;
  width: 100%;
  color: #000;
  background-color: #f1f3fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
