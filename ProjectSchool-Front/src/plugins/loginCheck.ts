import { useTokenStore } from "@/stores/token";

export default function isLog() {
  const store = useTokenStore();
  return store.role === "" ? false : store.role;
}
