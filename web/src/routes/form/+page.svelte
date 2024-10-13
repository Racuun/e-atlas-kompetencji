<script lang="ts">
    import Scale from "../../components/scale.svelte";
    import type { PageData } from './$types';



    export let data: PageData;
</script>

<form>
    {#each data.retData as answ}
        <p>{answ.description}</p>
        <Scale bind:agreement={answ.value}/>
    {/each}

    {#if pageID == 0}
        <button type=submit>Finish</button>
    {/if}
</form>

<style>

</style>
