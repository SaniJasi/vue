import { defineStore } from 'pinia'

export interface TodoItem {
  id: number;
  item: any;
  completed: boolean;
}

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [] as TodoItem[],
    id: 0
  }),
  actions: {
    initialize() {
      return this.todoList
    },
    addItem(item: any) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteItem(itemId: number) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    },
    updateItem(updatedTodo: TodoItem) {
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
      return (name: string) =>
        state.todoList.find((todo) => todo?.item?.name.toLowerCase().replaceAll(' ', '-') === name)
    }
  },
  persist: true
})
