const { describe, it, expect } = require("@jest/globals");
const { setActivePinia, createPinia } = require("pinia");
const { useTodoListStore } = require("../src/store/useTodoStore");

describe("useTodoListStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("deve adicionar um novo todo", () => {
    const store = useTodoListStore();
    const todoItem = { text: "Aprender Vue", completed: false };

    store.addTodo(todoItem);

    expect(store.todos).toHaveLength(1);
    expect(store.todos[0]).toMatchObject(todoItem);
    expect(store.todos[0]).toHaveProperty("id");
  });

  it("deve retornar todos os todos", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    expect(store.allTodos).toEqual(store.todos);
  });

  it("deve retornar apenas os todos ativos", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    expect(store.activeTodos).toEqual([{ id: 1, text: "Task 1", completed: false }]);
  });

  it("deve retornar apenas os todos concluídos", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    expect(store.completedTodos).toEqual([{ id: 2, text: "Task 2", completed: true }]);
  });

  it("deve limpar todos os todos concluídos", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    store.clearCompleted();

    expect(store.todos).toEqual([{ id: 1, text: "Task 1", completed: false }]);
  });

  it("deve atualizar o status de um todo", () => {
    const store = useTodoListStore();
    store.todos = [{ id: 1, text: "Task 1", completed: false }];

    const updatedTodo = { id: 1, text: "Task 1", completed: true };
    store.updateTodoStatus(updatedTodo);

    expect(store.todos[0]).toEqual(updatedTodo);
  });

  it("deve deletar um todo", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    store.deleteTodo(1);

    expect(store.todos).toEqual([{ id: 2, text: "Task 2", completed: true }]);
  });

  it("deve reordenar os todos", () => {
    const store = useTodoListStore();
    store.todos = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];

    store.reorderTodo(0, 1);

    expect(store.todos).toEqual([
      { id: 2, text: "Task 2", completed: true },
      { id: 1, text: "Task 1", completed: false },
    ]);
  });

  it("deve adicionar uma dependência a uma tarefa", () => {
    const store = useTodoListStore();
    store.todos = [{ id: 1, text: "Task 1", completed: false, dependencies: [] }];

    const dependency = { text: "Subtask 1" };
    store.addDependency(1, dependency);

    expect(store.todos[0].dependencies).toHaveLength(1);
    expect(store.todos[0].dependencies[0]).toHaveProperty("id");
    expect(store.todos[0].hasChildren).toBe(true);
  });

  it("deve remover uma dependência de uma tarefa", () => {
    const store = useTodoListStore();
    store.todos = [
      {
        id: 1,
        text: "Task 1",
        completed: false,
        dependencies: [{ id: 1, text: "Subtask 1" }],
      },
    ];
  
    store.removeDependency(1, 1);
  
    expect(store.todos[0].dependencies).toHaveLength(0);
    expect(store.todos[0].hasChildren).toBe(false);
  });
  
});
