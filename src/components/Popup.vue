<template>
  <div class="popup" v-if="isOpen">
    <div class="popup__content">
      <slot></slot>
      <div class="popup__actions">
        <button class="btn btn--red" @click="confirm">Yes</button>
        <button class="btn btn--secondary" @click="cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
      const confirm = () => {
        emit('confirm');
      };

      const cancel = () => {
        emit('cancel');
      };

      return {
        confirm,
        cancel
      };
    }
  };
</script>

<style scoped>
  .popup {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
  }

  .popup__content {
    padding: 50px;
    background-color: #fff;
    border-radius: 5px;
  }

  .popup__content p {
    font-size: 18px;
  }

  .popup__actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-top: 15px;
  }
</style>
