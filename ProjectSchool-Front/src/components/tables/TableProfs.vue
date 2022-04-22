<template>
  <table>
    <thead>
      Liste Professeurs
    </thead>
    <tr>
      <th>nom</th>
      <th>prenom</th>
      <th>email</th>
      <th>salary</th>
      <th>seniority</th>
      <th>age</th>
      <th>classe</th>
    </tr>
    <tr v-for="professor in professorStore.professors" :key="professor['@id']">
      <td>{{ professor.lastname }}</td>
      <td>{{ professor.firstname }}</td>
      <td>{{ professor.email }}</td>
      <td>{{ professor.salary }}</td>
      <td>{{ professor.seniority }}</td>
      <td>{{ professor.age }}</td>
      <td>la classe du prof</td>
      <td>
        <router-link :to="{ name: 'modifyprof', params: { id: professor.id } }">
          <button>Modify</button>
        </router-link>
      </td>
      <td>
        <button @click="$emit('deleteprof', professor)" class="redbutton">
          Delete
        </button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { useProfessorStore } from "@/stores/professors";
const professorStore = useProfessorStore();
</script>

<style>
table,
tr,
td,
th {
  border: 1px solid black;
}
table td,
th {
  width: 10%;
}
table {
  width: 80vw;
}
table td button {
  width: 100%;
}
</style>
