<template>
  <header>
    <img
      src="https://imgs.search.brave.com/QnGPl54HOvgbg_cv1p9eFKidgEQrXluzz_n_X8UztHw/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5z/cG9ydHNibG9jay5u/ZXQvdXBsb2Fkcy8x/LzEvMC8zLzExMDM1/NTk0L2hvbGx5X3Nw/cmluZ19oaWdoX3Nj/aG9vbF9sb2dvLnBu/Zw"
      alt="bk_logo"
    />
    <nav class="wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="store.role == 'Director'" to="/students">List</RouterLink>
      <RouterLink v-if="store.role == 'Professor'" to="/viewclass">View Classe</RouterLink>
      <RouterLink v-if="store.role == 'Director'" to="/addstudent">Add Student</RouterLink>
      <RouterLink v-if="store.role == 'Director'" to="/addprof">Add Professor</RouterLink>
      <RouterLink v-if="store.role" to="/logout">Logout</RouterLink>
    </nav>
    <nav class="wrapper-mobile">
      <span @click="OpenNav" class="material-icons"> menu </span>
      <div class="wrapper-mobile-link-hidden">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="store.role  == 'Director'" to="/students">List</RouterLink>
        <RouterLink v-if="store.role == 'Director'" to="/addstudent">Add Student</RouterLink>
        <RouterLink v-if="store.role == 'Director'" to="/addprof">Add Professor</RouterLink>
        <RouterLink v-if="store.role" to="/logout">Logout</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useTokenStore } from "@/stores/token";
const store = useTokenStore();

const OpenNav = () => {
  let nav = document.querySelector(".wrapper-mobile-link-hidden");
  nav?.classList.toggle("wrapper-mobile-link");
};
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 20px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(230, 230, 230);
  height: 100px;
  padding: 20px;
}

.wrapper a {
  text-decoration: none;
  color: black;
  font-weight: 600;
  text-decoration: underline rgba(255, 255, 255, 0);
  font-size: 20px;
  transition: 0.4s;
}

.wrapper a:hover {
  text-decoration: underline;
}

.wrapper a.router-link-active {
  color: white;
  background-color: black;
  padding: 10px;
}

.wrapper {
  display: flex;
  gap: 50px;
}

header img {
  height: 100%;
}

.wrapper-mobile {
  display: none;
}

.wrapper-mobile-link-hidden {
  display: none;
}

.wrapper-mobile-link {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
  background-color: black;
  height: 400px;
  position: absolute;
  top: 100px;
  left: 0px;
  width: 100%;
  z-index: 3;
}

.wrapper-mobile-link a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: 600;
  width: 50%;
  text-align: center;
  transition: 0.5s;
  background-color: black;
}

.wrapper-mobile-link a.router-link-active {
  background-color: white;
  color: black;
  text-decoration: none;
  font-weight: 600;
  width: 50%;
  text-align: center;
}

@media screen and (max-width: 800px) {
  .wrapper {
    display: none;
  }

  .wrapper-mobile {
    display: block;
  }

  .material-icons {
    font-size: 40px;
    cursor: pointer;
  }
}
</style>
