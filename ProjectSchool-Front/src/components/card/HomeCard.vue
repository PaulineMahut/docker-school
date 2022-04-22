<template>
  <div class="contenu1">
    <img
      class="image"
      src="https://i0.wp.com/www.lppasteur.fr/wp-content/uploads/2019/10/DSC07646.jpg?resize=768%2C432"
      alt=""
    />
    <h2>Le CDI est de nouveau ouvert !</h2>
    <p>
      Eh oui, après de nombreux mois de travaux, le CDI réouvre enfin ses
      portes. D'ailleurs pour cette occasion un livre est offert pour chaque
      étudiant voulant s'y inscrire. Alors n'hésitez pas, venez nombreux !
    </p>
    <div class="link">
      <p>DECOUVRIR</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.contenu1 {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  align-items: center;
  height: 500px;
  width: 30%;
}
@media screen and (max-width: 800px) {
.contenu1 {
    width: 60%;
    min-width: 50%;
}
}
.contenu1 h2,
p {
  color: rgb(0, 0, 0);
  padding: 10px;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.link {
  display: flex;
  justify-content: flex-end;
  padding: 0px 10px 20px 10px;
  width: 100%;
}
.link p {
  background-color: black;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.link p:hover {
  background-color: rgba(198, 198, 198, 0.158);
  color: rgb(0, 0, 0);
}
</style>
