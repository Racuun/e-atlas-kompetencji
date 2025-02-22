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

<div class="back">
    <img class="map" src="map.jpg" alt="Map not found"/>
</div>

<main>

    <section class="hero">
        <img src="roza-wiatrow.png" alt="" class="roza"/>
        <div class="title">
            <h1>Atlas</h1>
            <h2>KOMPETENCJI</h2>
        </div>

    </section>

    <section id="test">
        <section id="type">
            <h3>Format</h3>
            <RadioButton radioName="typ" bind:group={typ} label="8K" value='8k' />
            <RadioButton radioName="typ" bind:group={typ} label="5K" value='5k' />
        </section>

        <section id="met">
            <h3>Metodyka</h3>
            <RadioButton radioName="metodyka" bind:group={metodyka} label="Harcerska" value='harc' />
            <RadioButton radioName="metodyka" bind:group={metodyka} label="Zuchowa" value='zuch' />
            <RadioButton radioName="metodyka" bind:group={metodyka} label="Wędrownicza" value='wedr' />
        </section>

        <button class="to-quest" onclick={ async(e) => {goto("/extended")}} disabled={!(metodyka!=='' && typ!=='')}>Rozpocznij test</button>

    </section>

</main>



<div class="header">
    <div class=logo-circle>
        <img src="ZHR_Logo.png" alt="ZHR" class="logo-zhr"/>
    </div>
</div>


<style>
    .back{
        position: fixed;
        top: 0px;
        left: 0px;
        background: #DCDCDD;
        width: 100vw;
        height: 100vh;
    }
    .map {
        position: fixed;
        scale: 1.1;
        object-fit: cover;
        top: 0px;
        left: 50%;
        min-width: 100%;
        min-height: 100vh;
        transform: translate(-45.5%, 0);
        overflow: hidden;
        opacity: 0.8;
        filter: invert(0.1);
    }
    /* .octagon {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      top:50%;
    }
    .octagon:before {
      content: "";
      width: 100px;
      height: 0;
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 29px solid red;
      border-left: 29px solid #eee;
      border-right: 29px solid #eee;
    }
    .octagon:after {
      content: "";
      width: 100px;
      height: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 29px solid red;
      border-left: 29px solid #eee;
      border-right: 29px solid #eee;
    } */


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

    .header{
        position:fixed;
        top:0;
        left:0;
        width: 100%;
    }
    .logo-circle {
        width: 150px;
        height: 150px;
        top: -20px;
        left: -30px;
        position: relative;
        background: #717D64;
        opacity: 1;
        border-radius: 0% 82% 60% 140% / 88% 97% 80% 60% ;
    }
    .logo-zhr {
        width: 80px;
        position: relative;
        top: 55%;
        left: 60%;
        transform: translate(-50%, -50%);
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
        align-items: center;

        display: flex;
        flex-flow: column;
        justify-content: center;
        gap: 20px;

        padding-top: 20%;
        padding-bottom: 20%;
        border-radius: 50px 0px 0px 50px;
        background: #DCDCDD;
        box-shadow: 0 0px 20px 10px #DCDCDD;
    }
    #type {
        display: flex;
        width: 90%;
        grid-template-columns: 1fr 1fr;
        gap: 10px   ;
        justify-content: center;
        align-content: center;
    }
    #met {
        display: grid;
        width: 90%;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px   ;
        justify-content: center;
        align-content: center;
    }
    #met h3 {
        grid-column: 1 / 4;
        text-align: center;
        font-size: 26px;
        font-family: 'IMEnglish';
        font-weight: 900;
    }

</style>
