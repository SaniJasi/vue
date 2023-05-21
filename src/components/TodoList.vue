<template>
  <h1>Todo List</h1>
  <ul class="todo-list">
    <li v-for="todo in computedTodoList" :key="todo.id">
      <h2>
        <router-link :to="`/todo/${todo.item.name.toLowerCase().replace(/ /g, '-')}`">{{
          todo.item.name
        }}</router-link>
      </h2>
      <div v-for="(field, index) in todo.item.todos?.slice(0, 3)" :key="field + index">
        <input type="checkbox" v-model="field.checked" disabled />
        {{ field.name }}
      </div>
      <div class="todo-list__remove">
        <button class="btn btn--red" @click="showRemovePopup(todo)">Remove</button>
        <router-link
          :to="`/todo/${todo.item.name.toLowerCase().replace(/ /g, '-')}`"
          class="btn btn--outline"
          >View</router-link
        >
      </div>
    </li>
  </ul>
  <Popup :isOpen="showPopup" @confirm="handleConfirm" @cancel="handleCancel">
    <p>Are you sure you want to remove this item?</p>
  </Popup>
</template>

<script lang="ts">
import Popup from './PopupConfirmation.vue'
import { ref, computed, provide, defineComponent } from 'vue'
import { useTodoListStore } from '../stores/useTodoListStore'
import type { TodoItem } from '../stores/useTodoListStore'
import type { InjectionKey } from 'vue'

const popup = Symbol() as InjectionKey<boolean>

export default defineComponent({
  components: {
    Popup
  },
  setup() {
    const todoListStore = useTodoListStore()
    const showPopup = ref(false)
    let currentTodo = null as TodoItem | null

    const handleConfirm = () => {
      if (currentTodo) {
        todoListStore.deleteItem(currentTodo.id)
      }
      hideRemovePopup()
    }

    const handleCancel = () => {
      hideRemovePopup()
    }

    const showRemovePopup = (todo: TodoItem) => {
      currentTodo = todo
      showPopup.value = true
    }

    const hideRemovePopup = () => {
      showPopup.value = false
    }

    // Computed property to retrieve the todoList from the store
    const computedTodoList = computed(() => todoListStore.todoList)

    provide('popup', showPopup)

    return {
      computedTodoList,
      showRemovePopup,
      hideRemovePopup,
      handleConfirm,
      handleCancel,
      showPopup
    }
  }
})
</script>
