<script>
  import quizimg from "images/quiz.png";
  import { user } from "main/store.js";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Quiz!</h1>

<figure>
  <img alt="App Logo" src={quizimg} />
  <figcaption>Have fun!</figcaption>
</figure>

<div class="buttons">
  {#if $user === "Guest"}
    <a href="./registration">registration</a>
  {/if}
  <a href="./game">game</a>
</div>

<style>
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: 20px auto;
  }
  a {
    padding: 5px 10px;
    text-decoration: none;
    border: 1px solid lightgray;
    margin: 0 5px;
  }
  h1,
  figure {
    text-align: center;
    margin: 0 auto;
  }
  h1 {
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  img {
    width: 100%;
    max-width: 640px;
    min-width: 320px;
    margin: 0 0 1em 0;
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
