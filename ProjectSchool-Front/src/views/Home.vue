<script setup lang="ts">
import LoginController from "../components/form/LoginController.vue";
import { useTokenStore } from "@/stores/token";
import HomeCard from "../components/card/HomeCard.vue";

const store = useTokenStore();
</script>

<template>
  <main class="m">
    <LoginController class="loginController" v-if="store.token == ''" />
    <HomeCard v-if="store.token" />
    <HomeCard v-if="store.token" />
  </main>
</template>

<style>
main {
  background: url(https://images.adsttc.com/media/images/5e67/f394/b357/658e/fb00/036b/large_jpg/03_brenas_doucerain%C2%A9_Studio_Erick_Saillet.jpg?1583870856);
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}


@media screen and (max-width: 800px) {
  main {
    flex-direction: column;
    height: 120vh;
  }
}

</style>
