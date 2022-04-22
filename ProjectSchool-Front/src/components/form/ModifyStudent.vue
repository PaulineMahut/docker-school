<template>
  <form @submit.prevent="verifDatas">
    <label for="lastname">Nom</label>
    <input
      type="text"
      name="lastname"
      v-model="std.lastname"
      placeholder="LastName"
      required
    />
    <label for="firstname">Prenom</label>
    <input
      type="text"
      name="firstname"
      v-model="std.firstname"
      placeholder="FirstName"
      required
    />
    <label for="sexe">Sexe</label>
    <select name="sexe" id="sexe" v-model="std.sexe" required>
      <option value="male">male</option>
      <option value="female">female</option>
    </select>
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      v-model="std.email"
      placeholder="Email"
      required
    />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      v-model="std.password"
      placeholder="Password"
    />
    <label for="classe">Classe</label>
    <select
      name="classe-select"
      id="classe-select"
      v-model="std.classe"
      required
    >
      <option
        v-for="classe in storeClasse.classes"
        :key="classe.id"
        :value="classe['@id']"
      >
        {{ classe.name }}
      </option>
    </select>
    <input type="submit" value="Valider la modification" />
  </form>
  <p v-if="studentStore.error !== ''">{{ studentStore.error }}</p>
</template>

<script setup>
import { useClasseStore } from "../../stores/classes";
import { useStudentStore } from "@/stores/students";
import { useTokenStore } from "@/stores/token";
import { useRoute } from "vue-router";
import axios from "axios";

const studentStore = useStudentStore();
const store = useTokenStore();
const storeClasse = useClasseStore();
const route = useRoute();
const id = route.params.id;
const std = studentStore.students.find((e) => e.id == id);

function verifDatas() {
  if ((std.lastname, std.firstname, std.email, std.password !== "")) {
    return modify();
  } else studentStore.error = "Certains champs sont vides";
}

async function modify() {
  let r = await axios
    .put(`http://127.0.0.1:8000${std["@id"]}`, std, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log(e));
  console.log(r);

  if (r.status == 400) {
    studentStore.error = "Champs invalide";
  }

  if (r.status == 200) {
    studentStore.error = "La modification a été effectuée";
  }
}
</script>

<style></style>
