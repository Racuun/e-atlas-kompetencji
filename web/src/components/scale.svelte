<script lang="ts">
    export let agreement: number = 3;
</script>

<div class ="scale_div">
    <input type=radio bind:group={agreement} value={0}/>
    <input type=radio bind:group={agreement} value={1}/>
    <input type=radio bind:group={agreement} value={2}/>
    <input type=radio bind:group={agreement} value={3}/>
    <input type=radio bind:group={agreement} value={4}/>
    <input type=radio bind:group={agreement} value={5}/>
    <input type=radio bind:group={agreement} value={6}/>
</div>

<style>
    .scale_div {
    }
</style>
