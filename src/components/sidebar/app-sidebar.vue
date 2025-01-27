<script setup>
import { defineComponent } from "vue";
import Modal from "../modal/modal.vue";
import User from "../containers/user.vue";

defineComponent({
  name: "AppSidebar",
});
</script>

<template>
  <div class="app-sidebar">
    <User />
    <div class="left-sidebar">
      <Modal />
    </div>
  </div>
</template>

<style scoped>
.app-sidebar {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 94%;
  height: 50px;
  margin-top: 8px;
  background-color: #fff;
  box-shadow: 0 0 2px #a7a4a4;
  border-radius: 6px;
  justify-content: space-between;
}

.title {
  font-size: 20px;
  font-weight: bold;
  font-family: Inter, Arial, sans-serif;
  margin-left: 10px;
  align-content: center;
  cursor: pointer;
}
.select {
  align-content: center;
  margin-left: 10px;
}

</style>
