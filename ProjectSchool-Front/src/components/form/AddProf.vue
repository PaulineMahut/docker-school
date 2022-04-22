<template>
  <div class="main">
    <form @submit.prevent="addProfessor">
      <div class="side-form">
        <div>
          <label for="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            v-model="newProf.lastname"
            placeholder="LastName"
          />
        </div>
        <div>
          <label for="firstname">Prenom</label>
          <input
            type="text"
            name="firstname"
            v-model="newProf.firstname"
            placeholder="FirstName"
          />
        </div>
      </div>
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        v-model="newProf.email"
        placeholder="Email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        v-model="newProf.password"
        placeholder="Password"
      />
      <label for="classe">Classe</label>
      <select name="classe-select" id="classe-select" v-model="newProf.classe">
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
        v-model="newProf.salary"
        placeholder="Salary"
      />
      <label for="seniority">Seniority</label>
      <input
        type="text"
        name="seniority"
        v-model="newProf.seniority"
        placeholder="seniority"
      />
      <label for="age">Age</label>
      <input type="number" name="age" v-model="newProf.age" placeholder="age" />
      <input type="submit" value="ADD PROFESSOR" />
      <p class="red" v-if="professorStore.error !== ''">{{ professorStore.error }}</p>
    </form>
  </div>
</template>

<script setup>
import { useClasseStore } from "../../stores/classes";
import { useProfessorStore } from "@/stores/professors";
import { useTokenStore } from "@/stores/token";
import axios from "axios";

const professorStore = useProfessorStore();
const store = useTokenStore();
const storeClasse = useClasseStore();

const newProf = {
  lastname: "",
  firstname: "",
  roles: ["Professor"],
  password: "",
  classe: "",
  email: "",
  seniority: "",
  age: 0,
  salary: 0,
};

async function addProfessor() {
  let r =
   await axios
    .post("http://127.0.0.1:8000/api/professors", newProf, {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((resp) => {
      return resp;
    });

    if (r.status == 201) {
      professorStore.error = "L'ajout a été effectuée";
    }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130vh;
}
.red {
  color: rgb(0, 255, 42);
}

form {
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  background-color: rgb(255, 255, 255);
  padding: 40px;
  border-radius: 10px;
  gap: 40px;
  box-shadow: 1px 1px 2px 1px rgb(0, 0, 0);
}

form input {
  padding: 15px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.447);
}

form div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea:focus,
input:focus {
  outline: none;
}

form h1 {
  text-align: center;
}

form input[type="submit"] {
  background-color: #628bc2;
  color: white;
  border-radius: 20px;
  margin-top: 3%;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

form input[type="submit"]:hover {
  background-color: rgba(151, 111, 74, 0.897);
}

.side-form {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 30px;
}

.side-form div {
  width: 100%;
}

@media screen and (max-width: 820px) {
.side-form {
    flex-direction: column;
}

.main {
  height: 150vh;
}
form {
  width: 70%;
}
}
</style>
