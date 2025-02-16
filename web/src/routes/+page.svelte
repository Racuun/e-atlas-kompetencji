<script lang="ts">
  import { goto } from "$app/navigation";


</script>


<svelte:head>
    <title>Atlas Kompetencji ZHR</title>
    <meta name="description" content="Atlas kompetencji to narzędzie do ewaluacji umiejętności i kompetencji instruktorów ZHR" />
</svelte:head>

<div class="back">
    <img class="map" src="map.jpg" alt="Map not found"/>
    <div class="octagon"/>
</div>


<div class="main">
    <div class="hero">
        <img src="roza-wiatrow.png" alt="" class="roza"/>
        <div class="title">
            <h1>Atlas</h1>
            <h2>KOMPETENCJI</h2>
        </div>

        <button class="to-quest" on:click={ async(e) => {goto("/quest")}}>Sprawdź się</button>

    </div>
    <div class="bottom-shape" >

    </div>
</div>

<div class="header">
    <div class=logo-circle>
        <img src="ZHR_Logo.png" alt="ZHR" class="logo-zhr"/>
    </div>
</div>


<style>
    .back{
        background-color: #DCDCDD;
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
        opacity: 0.6;
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


    .main {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
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
        margin-top: 50px;
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
    .to-quest:hover {
        background-color: #717D64;
        color: #DCDCDD;
        transition-duration: 350ms;
    }


    .bottom-shape {
        --c: 60; /* control the curvature (a percentage value without unit bigger than 50%)*/

        width: 100%;
        height: 50px;
        transform: translate(-50%);
        position: absolute;
        bottom: 0px;
        left: 50%;
        aspect-ratio: 3/2;
        background: #717D64;
        mask: radial-gradient(calc(var(--c)*1%) 100% at 50% calc(100% + 100%*cos(asin(50/var(--c)))),#0000 calc(100% - 1px),#000);
        clip-path: ellipse(calc(var(--c)*1%) 100% at bottom);
    }

</style>
