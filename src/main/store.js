import axios from "axios";
import { writable } from "svelte/store";

export const user = writable({name: 'Guest'});
export const topics = writable([]);
export const questions = writable([]);
export const session = writable(null);
export const userResults = writable([]);

axios.defaults.withCredentials = true;
axios.get("http://localhost:3003/login").then((response) => {
  user.set({name: response.data.user[0].username, id: response.data.user[0].id});
});

axios.get('http://localhost:3003/topics').then(response => {
  topics.set(response.data.topics);
});
