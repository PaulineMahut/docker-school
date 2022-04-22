<template>
  <div class="main">
    <TableStudents @deletee="deleteStudent" />
    <TableProfs @deleteprof="deleteProfessor" />
  </div>
</template>

<script setup lang="ts">
import TableStudents from "./tables/TableStudents.vue";
import TableProfs from "./tables/TableProfs.vue";
import { onMounted } from "vue";
import { useTokenStore } from "@/stores/token";
import { useStudentStore } from "@/stores/students";
import { useClasseStore } from "@/stores/classes";
import { useProfessorStore } from "@/stores/professors";
import router from "@/router";
import axios from "axios";

const store = useTokenStore();
const professorStore = useProfessorStore();
const studentStore = useStudentStore();
const classeStore = useClasseStore();

onMounted(() => {
  fetchStudents();
  fetchClasses();
  fetchProfessors();
});

// CLASSES //

async function fetchClasses() {
  let r = await fetch("http://127.0.0.1:81/api/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((resp) => resp.json())
    .catch((e) => console.log(e));
  if (r) {
    classeStore.classes = r["hydra:member"];
  }
}

// STUDENT

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
  if (response.code == 401) {
    router.push("logout");
  }
}

async function deleteStudent(student) {
  let r = await axios(`http://127.0.0.1:8000${student["@id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((r) => {
      return r;
    })
    .catch((e) => console.log(e));

  if (r.status == 204) {
    deleteBdd(student);
  }
}

function deleteBdd(student) {
  var index = studentStore.students.findIndex((e) => e.id == student.id);
  studentStore.students.splice(index, 1);
}

// PROFESSORS //

async function fetchProfessors() {
  let response = await fetch("http://127.0.0.1:8000/api/professors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((promise) => promise.json())
    .catch((e) => console.log(e));
  if (response) {
    professorStore.professors = response["hydra:member"];
  }
}

async function deleteProfessor(professor) {
  let resp = await axios
    .delete(`http://127.0.0.1:8000${professor["@id"]}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((resp) => {
      return resp;
    })
    .catch((e) => console.log(e));

  if (resp.status == 204) {
    deleteProfBdd(professor);
  }
}

function deleteProfBdd(professor) {
  var index = professorStore.professors.findIndex((e) => e.id == professor.id);
  professorStore.professors.splice(index, 1);
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  gap: 30px;
  width: 100%;
}
</style>
