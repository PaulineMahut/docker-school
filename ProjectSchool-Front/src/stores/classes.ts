import { defineStore } from "pinia";

export const useClasseStore = defineStore({
  id: "classes",
  state: () => ({
    classes: [],
    classe: [],
  }),
  persist: true,
  getters: {
    getClasses: (state) => state.classes,
    getClasse: (state) => state.classe,
  },
  actions: {},
});
