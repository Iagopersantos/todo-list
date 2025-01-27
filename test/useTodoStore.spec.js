import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodoListStore = defineStore("todolist", {
  state: () => ({
    todos: useStorage("todos", []),
  }),
  getters: {
    allTodos() {
      return this.todos;
    },
    activeTodos() {
      return this.todos.filter((todo) => !todo.completed);
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.completed);
    },
  },
  actions: {
    addTodo(itemObj) {
      this.todos.unshift({ 
        ...{ id: new Date().getTime(), dependencies: [], hasChildren: false }, 
        ...itemObj 
      });
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    updateTodoStatus(todo) {
      const index = this.todos.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        this.todos[index] = todo;
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    reorderTodo(from, to) {
      const item = this.todos.splice(from, 1);
      this.todos.splice(to, 0, item[0]);
    },
    addDependency(taskId, dependencyObj) {
      const task = this.todos.find((t) => t.id === taskId);
    
      if (!task) {
        console.error("Tarefa não encontrada.");
        return;
      }
    
      if (!task.dependencies) {
        task.dependencies = [];
      }
    
      dependencyObj.id = new Date().getTime(); // Gera um ID único para a dependência
      task.dependencies.push(dependencyObj);
      task.hasChildren = true; // Marca que a tarefa possui dependências
    },    
    removeDependency(taskId, dependencyId) {
      const task = this.todos.find((t) => t.id === taskId);

      if (!task) {
        console.error("Tarefa não encontrada.");
        return;
      }

      task.dependencies = task.dependencies.filter((depId) => depId !== dependencyId);
    },
  },
});