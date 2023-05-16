<template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" id="name" v-model="name" placeholder="Name" required>
      </div>
      <div class="form-group" v-for="(field, index) in fields" :key="index">
        <input type="text" v-model="fields[index]" :placeholder="`Todo ${index + 1}`" required>
        <button class="remove-todo" @click="removeField(index)" v-show="fields.length > 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><path d="M488.110569,399.973984 L787.219512,100.852033 C795.447154,92.6178862 799.986992,81.6325203 800,69.9186992 C800,58.198374 795.460163,47.2 787.219512,38.9788618 L761.00813,12.7739837 C752.76748,4.5203252 741.782114,0 730.055285,0 C718.347967,0 707.362602,4.5203252 699.121951,12.7739837 L400.013008,311.876423 L100.891057,12.7739837 C92.6634146,4.5203252 81.6715447,0 69.9512195,0 C58.2439024,0 47.2520325,4.5203252 39.0243902,12.7739837 L12.8,38.9788618 C-4.26666667,56.0455285 -4.26666667,83.804878 12.8,100.852033 L311.915447,399.973984 L12.8,699.082927 C4.56585366,707.330081 0.0325203252,718.315447 0.0325203252,730.029268 C0.0325203252,741.743089 4.56585366,752.728455 12.8,760.969106 L39.0178862,787.173984 C47.2455285,795.421138 58.2439024,799.947967 69.9447154,799.947967 C81.6650407,799.947967 92.6569106,795.421138 100.884553,787.173984 L400.006504,488.065041 L699.115447,787.173984 C707.356098,795.421138 718.341463,799.947967 730.04878,799.947967 L730.061789,799.947967 C741.77561,799.947967 752.760976,795.421138 761.001626,787.173984 L787.213008,760.969106 C795.44065,752.734959 799.980488,741.743089 799.980488,730.029268 C799.980488,718.315447 795.44065,707.330081 787.213008,699.089431 L488.110569,399.973984 Z" transform="translate(0 .026)"/></svg>
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

<script>
import { ref } from 'vue';
import { useTodoListStore } from '../stores/useTodoListStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const name = ref('');
    const fields = ref(['']); 
    const todoListStore = useTodoListStore();
    const showCompletionMessage = ref(false);
    const completionMessage = ref('');

    const addField = () => {
      fields.value.push('');
    };

    const removeField = (index) => {
      fields.value.splice(index, 1);
    };

    const submitForm = () => {
      todoListStore.addItem({ name: name.value, fields: fields.value });
    
      showCompletionMessage.value = true;
      completionMessage.value = 'Form submitted successfully! <br> You will be directed to the main page';
      setTimeout(() => {
      router.push('/');
      }, 1000)
    };

    return {
      name,
      fields,
      addField,
      removeField,
      submitForm,
      showCompletionMessage,
      completionMessage,
    };
  }
};
</script>

