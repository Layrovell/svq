<script>
  import { user } from "main/store.js";
  export let score;
  export let length;
</script>

<h2>Congratulations: {$user.name}!</h2>
<div>
  <p>Total questions: {length}</p>
  <p>Correct answers: {score}</p>
  <p>Wrong answers: {length - score}</p>
  <a href="./">back to home</a>
</div>

<style>
  h2 {
    margin: 16px 0;
  }
  a {
    padding: 5px 10px;
    text-decoration: none;
    border: 1px solid lightgray;
    margin: 10px 0;
  }
  p {
    margin: 10px 0;
  }
</style>
