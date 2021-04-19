<script>
  import axios from 'axios';
  import { topics } from 'main/store';
  import { user } from 'main/store.js';
</script>

<h2>Languages:</h2>
{#if $topics.length}
  {#each $topics as topic}
    <a
      href={`./play?topic=${topic.id}`}
      on:click={axios
        .post('http://localhost:3003/session', {
          id_user: $user.id,
          status: true,
        })
        .then((response) => {
          console.log(response);
        })}
    >
      {topic.name}
    </a>
  {/each}
{/if}

<style>
  h2 {
    padding: 30px 0;
    margin: 0;
  }
  a {
    padding: 5px 10px;
    text-decoration: none;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    width: 100px;
    margin: 10px 0;
  }
</style>
