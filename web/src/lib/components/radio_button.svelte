<script lang="ts">
  import { updated } from "$app/state";


    export let group:any;
    export let radioName: string = 'default';
    export let value: any;
    export let checked: boolean = false;
    export let label:string = "Radio button";

    $: group===value ? checked=true : checked=false;

</script>

<label class={"radio " + (checked ? "selected" : "unselected")}> {label}
    <input type="radio" name={radioName} bind:group={group} value={value} />
</label>

<style>
    .radio {
        padding: 15px;
        border: 3px solid #717D64;
        border-radius: 12px;
        height: 20px;

        font-size: 32px;
        display: grid;
        justify-content: center;
        align-content: center;

        background-color: #DCDCDD;
        color: #717D64;
    }
    .unselected:hover {
        background-color: #717D64;
        color: #DCDCDD;
        transition-duration: 350ms;
    }
    .selected {
        background-color: #717D64;
        color: #DCDCDD;
    }
    .radio input {
        display: none;
    }
</style>
