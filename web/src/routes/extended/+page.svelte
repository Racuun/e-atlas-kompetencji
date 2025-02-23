<script lang="ts">
    import Scale from '$lib/components/scale.svelte'
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>


<main>
    {#await data.returnData}
        <h1>LOADING...</h1>
    {:then data}
        <form class="quest-wrap" method="POST" action="/result?/analyze">
            {#each data as question}
            {@const _ID = question.kID + '/' + question.aID + '/' + question.dID + '/' + question.level + '/' + question.negative}
            <div class="question">
                <h2>{question.description}</h2>
                <Scale ID={_ID} posLabel="Zgadzam się" negLabel="Nie zgadzam się" />
            </div>
            {/each}
            <button type=submit>Dalej</button>
        </form>
    {:catch e}
        <div>
            <h1>Cannot fetch data</h1>
            <h3>{e.message}</h3>
        </div>
    {/await}
</main>


<style>
    main {
        position: relative;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: max-content;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
    }
    .quest-wrap {
        display: grid;
        width: 90%;
        height: fit-content;
        grid-template-columns: 1fr;
        align-content: space-between;
        align-items: center;
        justify-items: center;
    }

    .question {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-flow: column;
    }
</style>
