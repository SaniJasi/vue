import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0
  }),
  actions: {
    addItem(item) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteItem(itemId) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    }
  },
  getters: {
    getTodoByName: (state) => {
      return (name) => state.todoList.find((todo) => todo.item.name === name)
    }
  },
  persist: true
})
