import axios from "axios";
import { writable } from "svelte/store";

export const user = writable('Guest');

axios.defaults.withCredentials = true;
axios.get("http://localhost:3003/login").then((response) => {
  user.set(response.data.user[0].username);
});
