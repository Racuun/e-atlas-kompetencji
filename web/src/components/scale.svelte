<script lang="ts">
    export let agreement: number = 0;

    export let ID: string = '';
</script>

<div class ="scale_div">
    <input name={ID} type=radio bind:group={agreement} value={-3}/>
    <input name={ID} type=radio bind:group={agreement} value={-2}/>
    <input name={ID} type=radio bind:group={agreement} value={-1}/>
    <input name={ID} type=radio bind:group={agreement} value={0}/>
    <input name={ID} type=radio bind:group={agreement} value={1}/>
    <input name={ID} type=radio bind:group={agreement} value={2}/>
    <input name={ID} type=radio bind:group={agreement} value={3}/>
</div>

<style>
    .scale_div {
    }
</style>
