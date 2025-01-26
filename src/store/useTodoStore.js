import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodoListStore = defineStore("todolist", {
  state: () => ({
    todos: useStorage("todos", []),
    activeFilter: useStorage("activeFilter", "all"),
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
    isEmpty() {
      return this.todos.length <= 0;
    },
  },
  actions: {
    addTodo(itemObj) {
      this.todos.unshift({
        id: new Date().getTime(),
        dependencies: [],
        completed: false,
        ...itemObj,
      });
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    updateTodoStatus(id) {
      const todo = this.todos.find((t) => t.id === id);

      if (!todo) return;

      const allDependenciesCompleted = todo.dependencies.every((depId) =>
        this.todos.find((t) => t.id === depId)?.completed
      );

      if (allDependenciesCompleted) {
        todo.completed = !todo.completed;
      } else {
        console.error(
          `A tarefa "${todo.name}" não pode ser concluída porque suas dependências não foram concluídas.`
        );
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    reorderTodo(from, to) {
      const item = this.todos.splice(from, 1);
      this.todos.splice(to, 0, item[0]);
    },
    addDependency(taskId, dependencyId) {
      const task = this.todos.find((t) => t.id === taskId);
      const dependency = this.todos.find((t) => t.id === dependencyId);

      if (!task || !dependency) {
        console.error("Tarefa ou dependência não encontrada.");
        return;
      }

      if (task.dependencies.includes(dependencyId)) {
        console.warn("Essa dependência já foi adicionada.");
        return;
      }

      task.dependencies.push(dependencyId);
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
