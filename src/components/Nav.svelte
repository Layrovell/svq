<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { goto } from '@sapper/app';
  import { user } from "main/store.js";
  export let segment;

  onMount(() => {
    axios.get("http://localhost:3003/login").then((response) => {
      user.set({name: response.data.user[0].username, id: response.data.user[0].id});
    });
  });

  const logout = () => {
    axios.get("http://localhost:3003/logout").then((response) => {
      localStorage.removeItem("username");
      user.set({name: 'Guest'});
    });
    
    goto('./');
  };

  const gotoProfile = () => {
    if ($user.name !== 'Guest') goto('./profile');
    else console.warn('no user in system');
  }
</script>

<nav>
  <ul>
    <li><a aria-current={segment === undefined ? "page" : undefined} href=".">home</a></li>
    <li><a rel="prefetch" aria-current={segment === "instructions" ? "page" : undefined} href="/instructions">instructions</a></li>
  </ul>
  <ul>
    <li><span class={$user.name === 'Guest' ? '' : 'profile'} on:click={gotoProfile}>{$user.name}</span></li>
    
    {#if $user.name === 'Guest'}
      <li><a href="./login">login</a></li>
    {:else}
      <li><span class="logout" on:click={logout}>logout</span></li>
    {/if}

  </ul>
</nav>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }
  .logout {
    cursor: pointer;
  }
  li {
    display: block;
    float: left;
  }
  .profile {
    cursor: pointer;
  }
  [aria-current] {
    position: relative;
    display: inline-block;
  }
  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }
  a {
    padding: 16px 8px;
    display: block;
  }

  span {
    text-decoration: none;
    padding: 16px 8px;
    display: block;
  }
</style>
