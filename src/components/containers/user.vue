<template>
  <div class="user">
    <div class="user-info">
      <img src="@/assets/user.png" class="photo" alt="Gerenciador de Tarefas" title="John Doe" />
      <span class="title">Iago Pereira dos Santos</span>
    </div>
  </div>
</template>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 30px;
  margin-right: 8px;
  margin-left: 10px;
  border-radius: 26px;
  color: #2367D9;
  background-color: #eaebf3;
}

.photo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 12px;
  padding: 8px 4px 16px 4px;
  cursor: pointer;
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-left: 10px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  font-family: Inter, Arial, sans-serif;
  margin-left: 10px;
  align-content: center;
  cursor: pointer;
}
</style>
