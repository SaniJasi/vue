<template>
  <div v-if="todo" class="single-todo">
    <div class="single-todo__title">
      <h1 v-if="!editItem">{{ name }}</h1>
      <input v-else v-model="newName" :placeholder="name" />
    </div>
    <ul v-if="todo && todo.item">
      <li v-for="(field, index) in todo.item.todos" :key="index">
        <input type="checkbox" v-model="field.checked" />
        <span v-if="!editItem">{{ field.name }}</span>
        <input type="text" v-else v-model="field.name" :placeholder="field.name" required />
        <button class="remove-me" @click="removeField(index)" v-if="editItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
            <path
              d="M488.110569,399.973984 L787.219512,100.852033 C795.447154,92.6178862 799.986992,81.6325203 800,69.9186992 C800,58.198374 795.460163,47.2 787.219512,38.9788618 L761.00813,12.7739837 C752.76748,4.5203252 741.782114,0 730.055285,0 C718.347967,0 707.362602,4.5203252 699.121951,12.7739837 L400.013008,311.876423 L100.891057,12.7739837 C92.6634146,4.5203252 81.6715447,0 69.9512195,0 C58.2439024,0 47.2520325,4.5203252 39.0243902,12.7739837 L12.8,38.9788618 C-4.26666667,56.0455285 -4.26666667,83.804878 12.8,100.852033 L311.915447,399.973984 L12.8,699.082927 C4.56585366,707.330081 0.0325203252,718.315447 0.0325203252,730.029268 C0.0325203252,741.743089 4.56585366,752.728455 12.8,760.969106 L39.0178862,787.173984 C47.2455285,795.421138 58.2439024,799.947967 69.9447154,799.947967 C81.6650407,799.947967 92.6569106,795.421138 100.884553,787.173984 L400.006504,488.065041 L699.115447,787.173984 C707.356098,795.421138 718.341463,799.947967 730.04878,799.947967 L730.061789,799.947967 C741.77561,799.947967 752.760976,795.421138 761.001626,787.173984 L787.213008,760.969106 C795.44065,752.734959 799.980488,741.743089 799.980488,730.029268 C799.980488,718.315447 795.44065,707.330081 787.213008,699.089431 L488.110569,399.973984 Z"
              transform="translate(0 .026)"
            />
          </svg>
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
</template>

<script>
import Popup from '../components/PopupConfirmation.vue'
import { computed, ref, provide, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoListStore } from '../stores/useTodoListStore'

export default {
  components: {
    Popup
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const todoListStore = useTodoListStore()
    const showPopup = ref(false)
    const editItem = ref(false)
    const checkedFields = ref([])
    const editableFields = reactive({})
    const newName = ref('')
    const originalFields = ref([])

    // Access the getTodoByName getter
    const getTodoByName = (name) => {
      return todoListStore.getTodoByName(name)
    }

    // Extract the name from the URL
    const name = computed(() => route.params.all[1])

    // Retrieve the todo using the name from the URL
    const todo = computed(() => getTodoByName(name.value))

    // Delete item
    const deleteItem = () => {
      if (todo.value) {
        todoListStore.deleteItem(todo.value.id)
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
        originalFields.value = [...todo.value.item.todos]
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
          router.push(`/todo/${newName.value}`)
        } else {
          newName.value = name.value
        }

        const updatedTodo = {
          ...todo.value,
          item: {
            ...todo.value.item,
            name: newName.value,
            fields: updatedFields
          }
        }

        console.log(updatedTodo.item.todos)
        editItem.value = false
        todoListStore.updateItem(updatedTodo)
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
      editableFields
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
