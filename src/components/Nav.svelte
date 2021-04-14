<script>
  export let segment;
  let user = { loggedIn: false, name: 'Marina' };
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href=".">home</a>
    </li>
    <li>
      <a rel="prefetch" aria-current={segment === "instructions" ? "page" : undefined} href="instructions">instructions</a>
    </li>
  </ul>
  <ul>
    <li>
      {#if user.loggedIn}
        <li><span>{user.name}</span></li>
        <li>
          <a href="#">logout</a>
        </li>
      {:else}
        <li>
          <a aria-current={segment === "login" ? "page" : undefined} href="./login">login</a>
        </li>
      {/if}
    </li>
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
  li {
    display: block;
    float: left;
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
  a, span {
    text-decoration: none;
    padding: 16px 8px;
    display: block;
  }
  span {
    font-weight: bold;
    font-style: italic;
  }
</style>
