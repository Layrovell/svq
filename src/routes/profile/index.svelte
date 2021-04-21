<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { user, userResults } from 'main/store.js';
  import { getFormatDate, getFormatTime, theaders } from 'data/helpers.js';

  onMount(async () => {
    const response = await axios.get(
      `http://localhost:3003/results?id_user=${$user.id}`,
      { id_user: $user.id }
    );
    userResults.set(response.data);
  });
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h2>Profile</h2>

{#if $userResults.length > 0}
  <h4>Earlier results:</h4>
  <table>
    <tr>
      {#each theaders as th}
        <th>{th}</th>
      {/each}
    </tr>
      {#each $userResults as userResult, i}
        <tr>
          <td>{i}</td>
          <td>{userResult.name}</td>
          <td>{getFormatDate(userResult.start)}</td>
          <td>{getFormatTime(userResult.start)}</td>
          <td>{getFormatTime(userResult.end)}</td>
          <td>
            {#if userResult.score === null}0%
            {:else}{userResult.score}0%
            {/if}
          </td>
        </tr>
      {/each}
  </table>
{:else}
  <p>You haven't passed any test yet! <a href='./languages'>Back to tests</a></p>
{/if}

<style>
  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }
  table td {
    width: 100%;
  }
  th, td {
    border: 1px solid lightgray;
    padding: 5px;
  }
  p {
    margin: 100px 0;
    position: absolute;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
  a {
    display: block;
    width: 100px;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid lightgray;
    margin: 10px auto;
  }
</style>
