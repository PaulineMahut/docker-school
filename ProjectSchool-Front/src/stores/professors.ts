import { defineStore } from "pinia";

export const useProfessorStore = defineStore({
  id: "professors",
  state: () => ({
    professors: [],
    error: ""
  }),
  persist: true,
  getters: {},
  actions: {},
});
