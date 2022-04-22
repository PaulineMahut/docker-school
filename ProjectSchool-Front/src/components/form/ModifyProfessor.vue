<template>
  <form @submit.prevent="verifDatas">
    <label for="lastname">Nom</label>
    <input
      type="text"
      name="lastname"
      v-model="prof.lastname"
      placeholder="LastName"
    />
    <label for="firstname">Prenom</label>
    <input
      type="text"
      name="firstname"
      v-model="prof.firstname"
      placeholder="FirstName"
    />
    <label for="email">Email</label>
    <input type="email" name="email" v-model="prof.email" placeholder="Email" />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      v-model="prof.password"
      placeholder="Password"
    />
    <label for="classe">Classe</label>
    <select name="classe-select" id="classe-select" v-model="prof.classe">
      <option
        v-for="classe in storeClasse.classes"
        :key="classe.id"
        :value="classe['@id']"
      >
        {{ classe.name }}
      </option>
    </select>
    <label for="salary">Salary</label>
    <input
      type="number"
      name="salary"
      v-model="prof.salary"
      placeholder="Salary"
    />
    <label for="seniority">Seniority</label>
    <input
      type="text"
      name="seniority"
      v-model="prof.seniority"
      placeholder="seniority"
    />
    <label for="age">Age</label>
    <input type="number" name="age" v-model="prof.age" placeholder="age" />
    <input type="submit" value="Modifier le professor" />
    <p class="red" v-if="professorStore.error !== ''">
      {{ professorStore.error }}
    </p>
  </form>
</template>

<script setup>
import { useClasseStore } from "../../stores/classes";
import { useProfessorStore } from "@/stores/professors";
import { useTokenStore } from "@/stores/token";
import { useRoute } from "vue-router";

import axios from "axios";

const store = useTokenStore();
const storeClasse = useClasseStore();
const route = useRoute();
const professorStore = useProfessorStore();
const id = route.params.id;
const prof = professorStore.professors.find((e) => e.id == id);

function verifDatas() {
  if (
    (prof.lastname,
    prof.firstname,
    prof.email,
    prof.password,
    prof.age,
    prof.seniority,
    prof.salary !== "")
  ) {
    return modifyProf();
  } else professorStore.error = "Certains champs sont vides";
}

async function modifyProf() {
  let r = await axios
    .put(`http://127.0.1:8000${prof["@id"]}`, prof, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log(e));
  console.log(r);

  if (r.status === 400) {
    professorStore.error = "Champs invalide";
  }

  if (r.status === 200) {
    professorStore.error = "La modification a été effectuée";
  }
}
</script>

<style></style>
