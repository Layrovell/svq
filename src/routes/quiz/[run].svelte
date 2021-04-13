<script context="module">
    import { writable } from "svelte/store";
    import { quiz } from "main/quiz";

    const runStore = writable(null);

    export function preload(page, session) {
        runStore.set(page.params.run);
        quiz.set(page.params.run);
    }

</script>

our run = {$runStore}
