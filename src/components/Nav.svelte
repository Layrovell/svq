<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { user } from 'main/store.js';
  import { baseUrl } from 'data/helpers.js';
  export let segment;

  onMount(() => {
    axios.get(`${baseUrl}/login`).then((response) => {
      user.set({
        name: response.data.user[0].username,
        id: response.data.user[0].id,
      });
    });
  });

  const logout = () => {
    axios.get(`${baseUrl}/logout`).then((response) => {
      localStorage.removeItem('username');
      user.set({ name: '', id: null });
    });

    goto('./');
  };

  const gotoProfile = () => {
    if ($user.name !== '') goto('./profile');
    else console.warn('no user in system');
  };
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'instructions' ? 'page' : undefined}
        href="/instructions">Instructions</a
      >
    </li>
  </ul>
  <ul>
    <li>
      <span class={!$user.name ? '' : 'profile'} on:click={gotoProfile}>{$user.name}</span>
    </li>

    {#if !$user.name}
      <li><a href="./login">Login</a></li>
    {:else}
      <li><span class="logout" on:click={logout}>Logout</span></li>
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
    content: '';
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
    content: '';
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
