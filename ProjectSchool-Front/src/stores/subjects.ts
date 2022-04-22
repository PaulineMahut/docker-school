import { defineStore } from "pinia";

export const useSubjectStore = defineStore({
  id: "subjects",
  state: () => ({
    subjects: [],
    error: ""
  }),
  persist: true,
  getters: {
    // getSubjects: (state) =>
    // state.subjects.map((subject: studentType) => {

    // })
  },
  actions: {},
});

// type studentType = { classe: string; classename?: string };
