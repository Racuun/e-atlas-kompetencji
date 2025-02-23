<script lang="ts">

    export let name: string = 'Default name';
    export let value: number;
    export let max: number;

</script>

<div class="card">
    <h4>{name}</h4>
    <div class="row" >
        <div class="bar" >
            <div class="scale"></div>
            <div class="value" style="--bar-width: {(100* value/max)}%"></div>

        </div>
        <p>{value}</p>
    </div>
</div>

<style>
    .card {
        width: fit-content;
        max-width: 370px;
        height: fit-content;
    }
    .card > h4 {
        margin: 0;
        padding-right: 10px;
        padding-left: 10px;
    }

    .row {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
    }
    .row > p {
        font-weight: bolder;
        color: #296EB4;
    }


    .bar {
        height: 30px;
        width: 300px;
        margin-right: 10px;
        border-radius: 8px;
        overflow: hidden;
    }
    .scale {
        height: 100%;
        width: 100%;
        background-color: #83A5C9;
    }
    .value {
        height: 100%;
        width: var(--bar-width);
        background-color: #296EB4;
        position: relative;
        top: -100%;
    }
</style>
