// import { useTokenStore } from "@/stores/token";
// import axios from "axios";
// const store = useTokenStore();

// Function Login
export default async function handleSubmit(user: object) {
  const response = await axios
    .post("http://127.0.0.1:8000/api/login_check", user)
    .then((r) => {
      return r.data;
    })
    .catch((err) => console.log(err));
  if (response.token && response.refresh_token) {
    store.token = response.token;
    store.refresh_token = response.refresh_token;
  }
}

// Function fetch eleves
