<script lang="ts">
  import { goto } from "$app/navigation";
  import RadioButton from "$lib/components/radio_button.svelte";


    let metodyka = $state('');
    let typ = $state('');



    export const prerender = true;
</script>


<svelte:head>
    <title>Atlas Kompetencji ZHR</title>
    <meta name="description" content="Atlas kompetencji to narzędzie do ewaluacji umiejętności i kompetencji instruktorów ZHR" />
</svelte:head>


<main>

    <section class="hero">
        <img src="roza-wiatrow.png" alt="" class="roza"/>
        <div class="title">
            <h1>Atlas</h1>
            <h2>KOMPETENCJI</h2>
        </div>

    </section>

    <form id="test" method="POST" action="/extended?/config">
        <fieldset id="type">
            <h3>Format</h3>
            <div id="select">
                <RadioButton radioName="typ" bind:group={typ} label="8K" value='8k' />
                <RadioButton radioName="typ" bind:group={typ} label="5K" value='5k' />
            </div>
        </fieldset>

        <fieldset id="met">
            <h3>Metodyka</h3>
            <div id="select">
                <RadioButton radioName="metodyka" bind:group={metodyka} label="Harcerska" value='harc' />
                <RadioButton radioName="metodyka" bind:group={metodyka} label="Zuchowa" value='zuch' />
                <RadioButton radioName="metodyka" bind:group={metodyka} label="Wędrownicza" value='wedr' />
            </div>
        </fieldset>

        <button class="to-quest" type="submit" disabled={!(metodyka!=='' && typ!=='')}>Rozpocznij test</button>
    </form>


</main>


<style>
    main {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

    }



    .hero {
        display: flex;
        height: fit-content;
        width: 100%;
        flex-flow: column;
        align-items: center;
        gap: 40px;
    }
    .roza{
        align-self: center;
        justify-self: center;
        width: 240px;
    }
    .title {
        width: fit-content;
        font-family: 'IMEnglish';
        color: #1F1F2E;
    }
    h1{
        margin: 0;
        margin-bottom: -10px;
        line-height: 100%;
        font-size: 110px;
        text-align: center;
        text-transform: uppercase;
        text-shadow: 1px 1px grey;
    }
    h2 {
        margin: 0;
        margin-top: -10px;
        line-height: 100%;
        font-size: 50px;
        text-align: center;
        text-transform: uppercase;
        text-shadow: 1px 1px grey;
    }
    .to-quest {
        margin-top: 50px;

        background-color: #DCDCDD;
        border: 4px solid;
        border-color: #717D64;

        color: #717D64;
        padding: 20px 60px;
        border-radius: 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        text-transform: uppercase;
    }
    .to-quest:hover:active {
        background-color: #717D64;
        color: #DCDCDD;
        transition-duration: 350ms;
    }
    .to-quest:disabled,
    .to-quest:disabled:hover {
        border-color: #DCDCDD;
        color: grey;
    }

    #test {
        width: 100%;
        height: 100%;
        align-items: center;

        display: flex;
        flex-flow: column;
        justify-content: center;
        gap: 20px;

        border-radius: 50px 0px 0px 50px;
        background: #dcdcddaf;
        box-shadow: 0 0px 20px 10px #DCDCDD;
    }
    fieldset {
        border: none;
    }
    #type {
        display: flex;
        flex-flow: column;
        width: 90%;
        align-items: center;
    }
    #type  > #select {
        flex-flow: row;
    }
    #met {
        display: grid;
        width: 90%;
        grid-template-columns: 1fr;
        row-gap: 10px;
        justify-content: center;
        justify-items: center;
        align-content: center;
    }
    #met h3,
    #type h3 {
        grid-column: 1 / 4;
        text-align: center;
        font-size: 26px;
        font-family: 'IMEnglish';
        font-weight: 900;
    }
    #select {
        display: flex;
        width: 100%;
        height: fit-content;
        flex-flow: column;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        max-width: 300px;
    }

</style>
