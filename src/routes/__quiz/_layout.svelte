<script>
    import { quiz } from "main/quiz";
</script>

<style>
    div { 
        border-top: 1px solid red;
    }
</style>

<slot/>

<div>current quiz {$quiz}</div>
