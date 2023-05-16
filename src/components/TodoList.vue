<template>
  <main>
    <h1>Todo List</h1>
    <ul class="todo-list">
      <li v-for="todo in computedTodoList" :key="todo.id">
        <h2>
          <router-link :to="`/todo/${todo.item.name}`">{{ todo.item.name }}</router-link>
        </h2>
        <div v-for="(field, index) in todo.item.fields.slice(0, 3)" :key="field + index">
          <input type="checkbox" readonly>
          {{ field }}
        </div>
        <div class="todo-list__remove">
          <button class="btn btn--red" @click="showRemovePopup(todo)">Remove</button>
          <router-link :to="`/todo/${todo.item.name}`" class="btn btn--outline">View</router-link>
        </div>
      </li>
    </ul>
    <Popup :is-open="showPopup" @confirm="removeTodo" @cancel="hideRemovePopup">
      <p>Are you sure you want to remove this item?</p>
    </Popup>
  </main>
</template>

<script>
  import Popup from './Popup.vue';
  import { ref, computed } from 'vue';
  import { useTodoListStore } from '../stores/useTodoListStore';

  export default {
    components: {
      Popup
    },
    setup() {
      const todoListStore = useTodoListStore();
      const showPopup = ref(false);
      let currentTodo = null;

      const showRemovePopup = (todo) => {
        currentTodo = todo;
        showPopup.value = true;
      };

      const hideRemovePopup = () => {
        showPopup.value = false;
      };

      const removeTodo = () => {
        if (currentTodo) {
          todoListStore.deleteItem(currentTodo.id);
        }
        hideRemovePopup();
      };

      // Computed property to retrieve the todoList from the store
      const computedTodoList = computed(() => todoListStore.todoList);

      return {
        computedTodoList,
        showPopup,
        showRemovePopup,
        hideRemovePopup,
        removeTodo,
      };
    },
  };
</script>
