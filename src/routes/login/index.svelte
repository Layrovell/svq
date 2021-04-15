<script>
  import { goto } from '@sapper/app';
  import axios from "axios";
  import { user } from "main/store.js";

  export let username = "";
  export let password = "";
  let loginStatus = "";

  const handleSubmit = () => {
    axios
      .post("http://localhost:3003/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.message) {
          loginStatus = response.data.message;
        } else {
          user.set(response.data[0].username);
          localStorage.setItem("username", response.data[0].username);
        }
      });

    goto('./');
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section>
  <h2>Login:</h2>
  <form on:submit|preventDefault={(e) => handleSubmit(e)}>
    <label>Username: <input bind:value={username} type="text" /></label>
    <label>Password: <input bind:value={password} type="password" /></label>
    <button>login</button>
  </form>
  <p>{loginStatus}</p>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h2 {
    text-align: center;
    margin: 20px;
  }
  form {
    max-width: 300px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid lightgray;
    position: relative;
  }
  label {
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    text-align: left;
  }
  input {
    padding: 10px;
    width: 100%;
    border: 1px solid lightgray;
    height: 40px;
    box-sizing: border-box;
  }
  input::placeholder {
    color: #c3b8b8;
    font-size: 12px;
  }
  button {
    cursor: pointer;
    outline: none;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    transition: all ease-in-out 0.4s;
    text-transform: uppercase;
    display: block;
    margin: 20px auto;
  }
  button:hover {
    background-color: rgb(58, 57, 57);
  }
</style>
