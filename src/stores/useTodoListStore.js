import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0
  }),
  actions: {
    initialize() {
      return this.todoList
    },
    addItem(item) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteItem(itemId) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    },
    updateItem(updatedTodo) {
      this.todoList.map((obj) => {
        if (obj.id === updatedTodo.id) {
          obj.item = { ...obj.item, ...updatedTodo.item }
        }
        return obj
      })
    }
  },
  getters: {
    getTodoByName: (state) => {
      return (name) =>
        state.todoList.find((todo) => todo.item.name.toLowerCase().replaceAll(' ', '-') === name)
    }
  },
  persist: true
})
