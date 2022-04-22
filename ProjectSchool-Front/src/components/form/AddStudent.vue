<template>
  <div class="main">
    <form @submit.prevent="verifDatas">
      <div class="side-form">
        <div>
          <label for="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            v-model="newStudent.lastname"
            placeholder="LastName"
          />
        </div>
        <div>
          <label for="firstname">Prenom</label>
          <input
            type="text"
            name="firstname"
            v-model="newStudent.firstname"
            placeholder="FirstName"
          />
        </div>
      </div>
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        v-model="newStudent.email"
        placeholder="Email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        v-model="newStudent.password"
        placeholder="Password"
      />
      <div class="side-form">
        <div>
          <label for="sexe">Sexe</label>
          <select name="sexe" id="sexe" v-model="newStudent.sexe">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div>
          <label for="classe">Classe</label>
          <select
            name="classe-select"
            id="classe-select"
            v-model="newStudent.classe"
          >
            <option
              v-for="classe in storeClasse.classes"
              :key="classe.id"
              :value="classe['@id']"
            >
              {{ classe.name }}
            </option>
          </select>
        </div>
      </div>
      <input type="submit" value="ADD STUDENT" />
      <p class="red" v-if="studentStore.error !== ''">
        {{ studentStore.error }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useClasseStore } from "../../stores/classes";
import { useTokenStore } from "@/stores/token";
import { useStudentStore } from "@/stores/students";
import axios from "axios";
const studentStore = useStudentStore();
const store = useTokenStore();
const storeClasse = useClasseStore();
const newStudent = {
  sexe: "",
  classe: "",
  email: "",
  roles: ["Student"],
  password: "",
  lastname: "",
  firstname: "",
};
const verifDatas = () => {
  if (
    (newStudent.lastname,
    newStudent.firstname,
    newStudent.email,
    newStudent.password !== "")
  ) {
    return addStudent();
  } else studentStore.error = "Certains champs sont vides";
};

async function addStudent() {
  let r = await axios
    .post("http://127.0.0.1:8000/api/students", newStudent, {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${store.token}`,
      },
    })
    .then((resp) => {
      return resp;
    })
    .catch((e) => console.log(e));

  if (r.status == 201) {
    studentStore.error = "Ajout remine ";
  }

  if (r.status == 400) {
    studentStore.error = "Champs invalide";
  }

  if (r.status == 422) {
    studentStore.error = "Unprocessable entity";
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
  display: flex;
}
.red {
  color: red;
}

form {
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  background-color: rgba(255, 255, 255, 0.261);
  padding: 40px;
  border-radius: 10px;
  gap: 40px;
  margin-top: 20%;
  box-shadow: 1px 1px 2px 1px rgb(0, 0, 0);
  height: min-content;
  margin: auto;
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

.main {
  height: 100vh;
}
@media screen and (max-height: 700px) {
  form {
    margin-top: 10%;
    margin-bottom: 10%;
  }
}

@media screen and (max-width: 800px) {
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
form {
  width: 70%;
}
</style>
