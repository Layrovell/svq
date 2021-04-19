<script>
  import { goto } from '@sapper/app';
  import axios from "axios";

  export let nameReg = "";
  export let passReg = "";

  let nameErr = "";
  let passErr = "";
  let formMessage = "";

  const regexpName = /^[0-9a-zA-Z]+$/;
  const regexpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

  function nameHandler() {
    const v = regexpName.test(nameReg);
    
    if (!nameReg.length) nameErr = "Username cant be empty!";
    else if (!v) nameErr = "Username is not valid!";
    else nameErr = "";
  }

  function passHandler() {
    const v = regexpPass.test(passReg);

    if (!passReg.length) passErr = "Password cant be empty!";
    else if (passReg.trim().length < 6)
      passErr = "Password must be at least 6 chars long!";
    else if (!v) passErr = "Password is not valid!";
    else passErr = "";
  }

  const handleSubmit = () => {
    nameHandler();
    passHandler();

    if (!nameErr && !passErr) formMessage = "Yuppi!";
    else formMessage = "nope =<";

    axios
      .post("http://localhost:3003/register", {
        username: nameReg,
        password: passReg,
      })
      .then((response) => {
        console.log(response);
      });

    goto('./');
  };
</script>

<svelte:head>
  <title>Registration</title>
</svelte:head>

<section>
  <h2>Registration:</h2>
  <form on:submit|preventDefault={(e) => handleSubmit(e)}>
    <label>Username:
      <input
        bind:value={nameReg}
        placeholder="JohnDoe"
        on:blur={() => nameHandler()}
      />
    </label>
    <div class="errors">{nameErr}</div>

    <label>Password:
      <input
        bind:value={passReg}
        type="password"
        placeholder="qwe123"
        on:blur={() => passHandler()}
      />
    </label>
    <div class="errors">{passErr}</div>
    <button>submit</button>
    <p>{formMessage}</p>
  </form>
</section>

<style>
  :global(body) {
    box-sizing: border-box;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .errors {
    color: red;
    font-size: 0.6em;
    position: absolute;
    right: 20px;
    font-weight: bold;
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
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border: 1px solid lightgray;
    height: 40px;
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
    margin: 30px auto 0;
  }
  button:hover {
    background-color: rgb(58, 57, 57);
  }
  p {
    text-align: center;
  }
</style>
