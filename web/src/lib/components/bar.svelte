<script lang="ts">

    export let name: string = 'Default name';
    export let value: number;
    export let max: number;

</script>

<div class="card">
    {name}
    <div class="row" >
        <div class="bar" >
            <div class="scale"/>
            <div class="value" style="--bar-width: {(100* value/max)}%"/>

        </div>
        {value}
    </div>
</div>

<style>
    .card {
        width: 500px;
        height: fit-content;
    }
    .card p {
        width: 100%;
        height: fit-content;
    }

    .row {
        width: 100%;
        height: 50px;
        display: flex;
    }


    .bar {
        height: 30px;
        width: 300px;
        margin-right: 10px;
    }
    .scale {
        height: 100%;
        width: 100%;
        background-color: gray;
    }
    .value {
        height: 100%;
        width: var(--bar-width);
        background-color: blue;
        position: relative;
        top: -100%;
    }
</style>
