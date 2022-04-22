import { defineStore } from "pinia";
import VueJwtDecode from "vue-jwt-decode";

export const useTokenStore = defineStore({
  id: "token",
  state: () => ({
    token: "",
    refresh_token: "",
    role: "",
  }),
  persist: true,
  getters: {
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refresh_token,
    getRole: (state) => {
      const decodedToken = VueJwtDecode.decode(state.token);
      state.role = decodedToken.roles[0];
    },
  },
  actions: {
    setToken(tk: string) {
      this.token == tk;
    },
    setRefreshToken(rtk: string) {
      this.token == rtk;
    },
  },
});
