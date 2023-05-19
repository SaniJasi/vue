<template>
  <div v-if="todo" class="single-todo">
    <div class="single-todo__title">
      <h1 v-if="!editItem">{{ todo.item.name }}</h1>
      <input v-else v-model="newName" :placeholder="todo.item.name" />
    </div>
    <ul v-if="todo && todo.item">
      <li v-for="(field, index) in todo.item.todos" :key="index">
        <input type="checkbox" v-model="field.checked" />
        <span v-if="!editItem">{{ field.name }}</span>
        <input type="text" v-else v-model="field.name" :placeholder="field.name" required />
        <button class="remove-me" @click="removeField(index)" v-if="editItem">
          <IconRemove />
        </button>
      </li>
    </ul>
    <button @click="addField" class="btn btn--secondary" v-if="editItem">Add Todo</button>
    <div class="todo-controls">
      <button class="btn btn--red" @click="confirmDelete">Remove</button>
      <button class="btn btn--secondary" @click="editFields">
        {{ editItem ? 'Cancel' : 'Edit' }}
      </button>
      <button class="btn btn--primary" @click="saveChanges">Save</button>
    </div>
  </div>
  <Popup :is-open="showPopup" @confirm="deleteItem" @cancel="cancelDelete">
    <p>Are you sure you want to delete this item?</p>
  </Popup>
  <div v-if="showMsg" class="success">Saved</div>
</template>

<script lang="ts">
import Popup from '../components/PopupConfirmation.vue'
import IconRemove from '../components/icons/IconRemove.vue'
import { computed, ref, provide, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoListStore } from '../stores/useTodoListStore'

interface Field {
  name: string
  checked: boolean
}

interface TodoItem {
  id: string
  item: {
    name: string
    todos: Field[]
  }
}

export default {
  components: {
    Popup,
    IconRemove
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const todoListStore = useTodoListStore()
    const showPopup = ref<boolean>(false)
    const editItem = ref<boolean>(false)
    const showMsg = ref<boolean>(false)
    const checkedFields = ref<string[]>([])
    const editableFields = reactive<{ [key: string]: string }>({})
    const newName = ref('')
    const originalFields = ref<Field[]>([])

    // Access the getTodoByName getter
    const getTodoByName = (name: string): TodoItem | undefined => {
      return todoListStore.getTodoByName(name)
    }

    // Extract the name from the URL
    const name = computed(() => route.params.all[1])

    // Retrieve the todo using the name from the URL
    const todo = computed(() => getTodoByName(name.value))

    // Delete item
    const deleteItem = () => {
      if (todo.value) {
        todoListStore.deleteItem(todo.value?.id)
        // Redirect to home or any other appropriate page
        router.push('/')
      }
    }

    // Show confirmation popup
    const confirmDelete = () => {
      showPopup.value = true
    }

    const editFields = () => {
      if (!editItem.value) {
        originalFields.value = [...todo.value?.item.todos]
      } else {
        todo.value.item.todos = [...originalFields.value]
      }
      editItem.value = !editItem.value
    }

    // Cancel delete
    const cancelDelete = () => {
      showPopup.value = false
    }

    const addField = () => {
      todo.value.item.todos.push({ name: '', checked: false })
    }

    const removeField = (index) => {
      todo.value.item.todos.splice(index, 1)
    }

    const saveChanges = () => {
      if (todo.value && todo.value.item) {
        const updatedFields = todo.value.item.todos.map((field) => {
          return {
            name: field.name,
            checked: checkedFields.value.includes(field.name)
          }
        })

        if (newName.value.length > 0) {
          const url = newName.value.toLowerCase().replaceAll(' ', '-')
          router.push(`/todo/${url}`)
        } else {
          newName.value = todo.value.item.name
        }

        const updatedTodo = {
          ...todo.value,
          item: {
            ...todo.value.item,
            name: newName.value,
            fields: updatedFields
          }
        }

        editItem.value = false
        todoListStore.updateItem(updatedTodo)
        showMsg.value = true

        setTimeout(() => {
          showMsg.value = false
        }, 2000)
      }
    }

    provide('popup', showPopup)

    return {
      todo,
      editItem,
      deleteItem,
      confirmDelete,
      cancelDelete,
      saveChanges,
      editFields,
      newName,
      addField,
      removeField,
      name,
      editableFields,
      showMsg
    }
  }
}
</script>

<style scoped>
.single-todo {
  max-width: 800px;
  margin: 0 auto;
}
.single-todo ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.single-todo ul li {
  margin: 0 0 10px;
  display: flex;
  align-items: center;
}
.single-todo ul li span {
  margin-left: 10px;
}
.single-todo__title h1 {
  margin-bottom: 30px;
}
.single-todo__title input {
  font-size: 60px;
  color: var(--color-text);
  text-align: center;
  width: 100%;
  border: 0;
  margin-bottom: 30px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.single-todo ul input[type='text'] {
  font-size: 14px;
  height: 24px;
  color: var(--color-text);
  border: 0;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 0 0 10px;
  flex: 1;
  max-width: 60%;
}
.remove-me {
  width: 20px;
  height: 20px;
  border: 0;
  padding: 0;
  background-color: transparent;
  margin-left: 20px;
  cursor: pointer;
}
.remove-me svg {
  fill: #d63031;
  max-width: 100%;
  height: auto;
}
</style>
