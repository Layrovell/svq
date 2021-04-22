<script>
  import axios from 'axios';
  import { topics, user, session } from 'main/store';
import { baseUrl } from 'data/helpers.js';
</script>

<svelte:head>
  <title>Languages</title>
</svelte:head>

<h2>Languages:</h2>

{#if $topics.length}
  {#each $topics as topic}
    <a
      href={`./play?topic=${topic.id}`}
      on:click={axios.post(`${baseUrl}/runtest`, {
          is_runTest: true,
          id_user: $user.id,
          topic_id: topic.id,
          start: new Date(),
        })
        .then((response) => {
          console.log(response);
          session.set(response.data.session);
        })}
    >
      {topic.name}
    </a>
  {/each}
{/if}

<style>
  h2 {
    padding: 20px 0;
    margin: 0;
  }
  a {
    padding: 5px 10px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    width: 100px;
    margin: 10px 0;
  }
</style>
