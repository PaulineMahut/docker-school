<template>
  <div class="main">
    <p>Bonjour Eric</p> 
  <router-link :to="{ name: 'addnote' }">
    <button>Formulaire note</button>
  </router-link>
  <table>
    <thead>
      Liste Eleves
    </thead>
    <tr>
      <th>nom</th>
      <th>prenom</th>
      <th>sexe</th>
      <th>email</th>
      <th>classe</th>
    </tr>
    <tr v-for="student in studentStore.students" :key="student['@id']">
      <td v-if="student.classename == storeClasse.classe[0]['name']"> {{ student.lastname }}</td>
      <td v-if="student.classename == storeClasse.classe[0]['name']">{{ student.firstname }}</td>
      <td v-if="student.classename == storeClasse.classe[0]['name']">{{ student.sexe }}</td>
      <td v-if="student.classename == storeClasse.classe[0]['name']">{{ student.email }}</td>
      <td v-if="student.classename == storeClasse.classe[0]['name']">
        {{ student.classename }}
      </td>
      <td v-if="student.classename == storeClasse.classe[0]['name']">  
      </td>
    </tr>
  </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import { useSubjectStore } from "@/stores/subjects";
import { useClasseStore } from "@/stores/classes";
import { useStudentStore } from "@/stores/students";
import axios from "axios";

const store = useTokenStore();
const storeClasse = useClasseStore();
const subjectStore = useSubjectStore();
const studentStore = useStudentStore();

onMounted(() => {
  FetchClasse();
  fetchSubjects();
  fetchStudents();
});

async function fetchStudents() {
  let response = await fetch("http://127.0.0.1:8000/api/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((promise) => promise.json())
    .catch((e) => console.log(e));
  if (response) {
    studentStore.students = response["hydra:member"];   
  }
}

async function fetchSubjects() {
    let r = await axios.get("http://localhost:8000/api/subjects", {
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${store.token}`,
        },
    })
    .then((r) => {
        return r;
    })
    .catch((e) => console.log(e)); 

    if (r.status == 200) {
      subjectStore.subjects = r.data['hydra:member']
    }
}

const FetchClasse = async () => {
 let r = await axios
    .get("http://localhost:8000/api/classes", {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((r) => {
      return r;
    })
    .catch((err) => console.log(err));
    console.log(r);
    storeClasse.classe = r.data['hydra:member'];
    
};
</script>

<style scoped>
.main {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.main p {
  font-weight: 800;
  font-size: 40px;
}

table {

}
</style>
