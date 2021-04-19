<script context="module">
  export function preload() {
    return this.fetch(`instructions.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>instructions</title>
</svelte:head>

<h1>Popular questions</h1>

<ul>
  {#each posts as post}
    <li><a rel="prefetch" href="instructions/{post.slug}">{post.title}</a></li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>
