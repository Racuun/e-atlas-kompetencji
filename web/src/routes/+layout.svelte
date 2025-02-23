<script lang="ts">
    import '../fonts.css'
</script>

<div class="back">
    <img class="map" src="map.jpg" alt="Map not found"/>
</div>

<div id="page">
    <header class="header">
        <div class=logo-circle>
            <img src="ZHR_Logo.png" alt="ZHR" class="logo-zhr"/>
        </div>
    </header>

    <slot />

</div>




<style>
    #page {
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left:0;

        display: flex;
        flex-flow: column;
        flex-wrap: nowrap;

        padding: 0;
        margin: 0;
    }

    .back{
        position: fixed;
        top: 0px;
        left: 0px;
        background: #DCDCDD;
        width: 100vw;
        height: 100vh;
        z-index: -100;
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
        opacity: 0.5;
        filter: invert(0.1);
    }

    .header{
        position:fixed;
        top:0px;
        left:0px;
        width: fit-content;
        height: fit-content;
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
        margin-bottom: -20px;
    }
    .logo-zhr {
        width: 80px;
        position: relative;
        top: 55%;
        left: 60%;
        transform: translate(-50%, -50%);
    }
</style>
