<script lang="ts">
  import { Chart } from "chart.js/auto";
  import type { PageData } from "../$types";
  import { onMount } from "svelte";
  import Bar from "../../components/bar.svelte";

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
                }
            }
        });
    })


    export let data: PageData;

    let chartData = {
        labels: Object.values(data.kom).map((value) => {return value.name as string}),
        datasets: [{
            label: 'Twój poziom kompetencji',
            data: Object.keys(data.kom).map((key) => {return data.KomData[key].value as number}),
            borderWidth: 3
        }]
    }

    console.log(JSON.stringify(chartData))

</script>

<div class="row">
    <div class="column">
        <canvas bind:this={chart}/>
    </div>

    <div class="column">
        <table>
            {#each Object.keys(data.AspData) as  key }
            <tr>
                <td>{key}</td>
                <td><Bar max={9.0} value={parseFloat(data.AspData[key].value)} name={data.asp[key].name}></Bar></td>
            </tr>
            {/each}
        </table>
    </div>
</div>


<style>
    .column {
        width: 50%;
    }

    .row {
        display: flex;
    }
</style>
