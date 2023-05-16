<template>
  <main>
    <h1>{{ todo && todo.item ? todo.item.name : '' }}</h1>
    <ul v-if="todo && todo.item">
      <li v-for="field in todo.item.fields" :key="field">
        <input type="checkbox">
        {{ field }}
      </li>
    </ul>
    <div class="todo-controls">
      <button class="btn btn--red" @click="confirmDelete">Remove</button>
      <button class="btn btn--secondary">Edit</button>
      <button class="btn btn--primary" @click="saveChanges">Save</button>
    </div>

    <Popup :is-open="showConfirmation" @confirm="deleteItem" @cancel="cancelDelete">
      <p>Are you sure you want to delete this item?</p>
    </Popup>
  </main>
</template>

<script>
  import Popup from '../components/Popup.vue';
  import { computed, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTodoListStore } from '../stores/useTodoListStore';

  export default {
    components: {
      Popup
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const todoListStore = useTodoListStore();
      const showConfirmation = ref(false);

      // Access the getTodoByName getter
      const getTodoByName = (name) => {
        return todoListStore.getTodoByName(name);
      };

      // Extract the name from the URL
      const name = computed(() => route.params.articleName);

      // Retrieve the todo using the name from the URL
      const todo = computed(() => getTodoByName(name.value));

      // Delete item
      const deleteItem = () => {
        if (todo.value) {
          todoListStore.deleteItem(todo.value.id);
          // Redirect to home or any other appropriate page
          router.push('/');
        }
      };

      // Show confirmation popup
      const confirmDelete = () => {
        showConfirmation.value = true;
      };

      // Cancel delete
      const cancelDelete = () => {
        showConfirmation.value = false;
      };

      return {
        todo,
        showConfirmation,
        deleteItem,
        confirmDelete,
        cancelDelete
      };
    },
  };
</script>
