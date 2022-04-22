<template>
  <div>{{ logout() }}</div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useTokenStore } from "@/stores/token";
const store = useTokenStore();

function logout() {
  store.token = "";
  store.refresh_token = "";
  store.role = "";
  router.push("/");
}
</script>

<style scoped></style>
