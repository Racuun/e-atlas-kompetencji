<script lang="ts">
  import { Chart } from "chart.js/auto";
  import type { PageData, PageProps } from "../$types";
  import { onMount } from "svelte";
  import Bar from "$lib/components/bar.svelte";

    let chart: any;
    onMount(() => {
        new Chart(chart.getContext('2d'), {
            type: 'radar',
            data: chartData,
            options: {
                scales: {
                    r: {
                        min: 1,
                        max: 9,
                        ticks: {
                            stepSize: 2,
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
            }
        });
    })


    let { data }: PageProps = $props();

    const returnData = data.returnData;

    let chartData = {
        labels: Object.values(returnData.kom).map((value) => {return value.name as string}),
        datasets: [{
            label: 'Twój poziom kompetencji',
            data: Object.keys(returnData.kom).map((key) => {return returnData.KomData[key].value as number}),
            borderWidth: 3
        }]
    }

    console.log(JSON.stringify(returnData))


</script>


<main>
    <section id="chart">
        <canvas bind:this={chart} width=1000 height=1000></canvas>
    </section>

    <section id="kompetencje">
        <h2>Kompetencje</h2>
        {#each Object.keys(returnData.KomData) as key}
            <div class="wrap">
                <Bar max={9.0} value={parseFloat(returnData.KomData[key].value)} name={returnData.kom[key].name}></Bar>
            </div>
        {/each}
    </section>

    <section id="aspekty">
        <h2>Aspekty</h2>
        <div class="grid">
            {#each Object.keys(returnData.AspData) as key}
            <div class="wrap">
                <Bar max={9.0} value={parseFloat(returnData.AspData[key].value)} name={returnData.asp[key].name}></Bar>
            </div>
            {/each}
        </div>
    </section>
</main>


<style>
    main {
        position: absolute;
        top: 0; left: 0;

        width: 100vw;
        height: max-content;

        padding-top: 2rem;
        padding-bottom: 2rem;

        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
    }
    #chart {
        position: relative;
        width: 80%;
        height: 100%;
        min-height: 500px;
        max-height: 80vh;
        padding-left: -100%;
    }
    #chart > canvas {
        position: absolute;
        top: 50%; left: 50%; bottom: 50%; right: 50%;
        transform: translate(-50%, -50%);
    }
    #kompetencje {
        display: flex;
        width: 80%;
        flex-direction: column;
        align-items: center;

        font-family: 'IMEnglish';
        text-align: center;
    }
    #kompetencje .wrap {
        font-family: Arial, Helvetica, sans-serif;
        text-align: start;
    }
    #aspekty {
        grid-column: 1 / span 2;
        font-family: 'IMEnglish';
        text-align: center;

        width: 100%;
        position: relative;

    }
    #aspekty .grid {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        grid-auto-flow: dense;
        row-gap: 10px;
        column-gap: 20px;

        text-align: start;
        font-family: Arial, Helvetica, sans-serif;

        justify-items: center;
        justify-content: space-around;
    }
</style>
