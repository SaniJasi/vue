<template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" id="name" v-model="name" placeholder="Name" required />
      </div>
      <div class="form-group" v-for="(field, index) in fields" :key="index">
        <input type="text" v-model="fields[index]" :placeholder="`Todo ${index + 1}`" required />
        <button class="remove-todo" @click="removeField(index)" v-show="fields.length > 1">
          <IconRemove />
        </button>
      </div>
      <button @click="addField" class="btn btn--secondary">Add Todo</button>
      <div class="form__submit">
        <button type="submit" class="btn btn--primary btn--full">Create todo</button>
      </div>
    </form>
    <div v-if="showCompletionMessage" class="success" v-html="completionMessage"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useTodoListStore } from '../stores/useTodoListStore'
import { useRouter } from 'vue-router'
import IconRemove from './icons/IconRemove.vue'

export default {
  components: {
    IconRemove
  },
  setup() {
    const router = useRouter()
    const name = ref('')
    const fields = ref<string[]>([''])
    const todoListStore = useTodoListStore()
    const showCompletionMessage = ref<boolean>(false)
    const completionMessage = ref<string>('')
    const addField = () => {
      fields.value.push('')
    }
    const removeField = (index: number) => {
      fields.value.splice(index, 1)
    }
    const submitForm = () => {
      const todos = fields.value.map((todo) => ({ name: todo, checked: false }))
      todoListStore.addItem({ name: name.value, todos })
      showCompletionMessage.value = true
      completionMessage.value =
        'Form submitted successfully! <br> You will be directed to the main page'
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
    return {
      name,
      fields,
      addField,
      removeField,
      submitForm,
      showCompletionMessage,
      completionMessage
    }
  }
}
</script>
