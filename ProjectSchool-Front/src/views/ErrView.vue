<template>
  <div class="main">
    <p>Err not found</p>
    <RouterLink to="/">Return to home ?</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
p {
  font-size: 40px;
}
</style>
