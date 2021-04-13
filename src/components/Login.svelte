<script>
    export let name = null;
    export let password = null;

    $: console.warn("name", name);
    $: console.warn("password", password);

    const submit = () => {
        debugger;
    };

</script>

<form>
    <input bind:value={name} type="text" />
    <input bind:value={password} type="password" />
    <button on:click={submit}>submit</button>
</form>
