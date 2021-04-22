<script>
  import axios from 'axios';
  import { user, userResults } from 'main/store.js';
  import { baseUrl } from 'data/helpers.js';
  import Loader from 'components/Loader.svelte';
  import {
    getFormatDate,
    getFormatTime,
    theaders,
    getDifference,
    getProgessBarValue,
  } from 'data/helpers.js';

  let loading = false;

  const fetchingData = async () => {
    loading = true;
    const response = await axios.get(
      `${baseUrl}/results?id_user=${$user.id}`,
      { id_user: $user.id }
    );
    userResults.set(response.data);
    loading = false;
  };

  $: fetchingData($user.id);
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h2>Profile</h2>

{#if loading}
  <Loader />
{:else if $userResults.length}
  <h4>Earlier results:</h4>
  <table>
    <thead>
      {#each theaders as th}
        <th>{th}</th>
      {/each}
    </thead>
    <tbody>
      {#each $userResults as userResult, i}
        <tr>
          <td>{i}</td>
          <td>{userResult.name}</td>
          <td>{getFormatDate(userResult.start)}</td>
          <td>{getFormatTime(userResult.start)}</td>
          <td>{getFormatTime(userResult.end)}</td>
          <td>{getDifference(userResult.end, userResult.start)}</td>
          <td class="progressbar">
            <span style="width: {getProgessBarValue(userResult.score)}">
              {getProgessBarValue(userResult.score)}
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>
    You haven't passed any test yet! <a href="./languages">Back to tests</a>
  </p>
{/if}

<style>
  .progressbar {
    height: 20px;
    position: relative;
    padding: 3px;
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  .progressbar > span {
    background-color: rgb(43, 194, 83);
    display: block;
    height: 100%;
    position: relative;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }
  table td {
    width: 100%;
  }
  th,
  td {
    border: 1px solid lightgray;
    padding: 5px 10px;
  }
  th:first-child {
    width: 40px;
  }
  td:first-child {
    text-align: center;
    font-weight: bold;
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
