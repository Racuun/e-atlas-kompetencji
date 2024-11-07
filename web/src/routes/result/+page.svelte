<script lang="ts">
  import { Chart } from "chart.js/auto";
  import type { PageData } from "../$types";
  import { onMount } from "svelte";

    let chart: any;
    onMount(() => {
        new Chart(chart.getContext('2d'), {
            type: 'radar',
            data: {
            labels: ['1','2','3','4','5','6','7','8'],
            datasets: [{
                label: '# of Votes',
                data: [7.0, 9.0, 3, 5, 2, 3, 4.0, 5.5],
                borderWidth: 3
            }]
            },
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
</script>

<div class="row">
    <div class="column">
        <canvas bind:this={chart}/>
    </div>

    <div class="column">
        <table>
            {#each Object.keys(data.KomData) as  key }
            <tr>
                <td>{key}</td>
                <td>{data.KomData[key].value}</td>
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
