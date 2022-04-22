<template>
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
      <td>{{ student.lastname }}</td>
      <td>{{ student.firstname }}</td>
      <td>{{ student.sexe }}</td>
      <td>{{ student.email }}</td>
      <td>
        {{ student.classename }}
      </td>
      <td>
        <router-link :to="{ name: 'modify', params: { id: student.id } }">
          <button>Modify</button>
        </router-link>
      </td>
      <td>
        <button @click="$emit('deletee', student)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { useStudentStore } from "../../stores/students";
const studentStore = useStudentStore();
</script>

<style></style>
