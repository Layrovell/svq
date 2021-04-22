import axios from 'axios';
import { writable } from 'svelte/store';
import { baseUrl } from 'data/helpers.js';

export const user = writable({ name: '', id: null });
export const topics = writable([]);
export const questions = writable([]);
export const session = writable(null);
export const userResults = writable([]);

axios.defaults.withCredentials = true;
axios.get(`${baseUrl}/login`).then((response) => {
  user.set({
    name: response.data.user[0].username,
    id: response.data.user[0].id,
  });
});

axios.get(`${baseUrl}/topics`).then((response) => {
  topics.set(response.data.topics);
});
