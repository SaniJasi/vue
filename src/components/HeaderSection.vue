<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="site-header__logo">
      <img src="@/assets/logo.svg" alt="" />
      <span>Todo list</span>
    </RouterLink>
    <RouterLink to="/create" class="btn btn--primary">Create item</RouterLink>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 20px;
}

@media screen and (min-width: 992px) {
  .site-header {
    padding: 0 40px;
  }
}

.site-header__logo {
  font-size: 36px;
  color: var(--color-text);
  display: flex;
  align-items: center;
}

.site-header__logo img {
  max-height: 60px;
  width: auto;
  margin-right: 20px;
}

.site-header__logo span {
  flex-shrink: 0;
  letter-spacing: 0;
}
</style>
