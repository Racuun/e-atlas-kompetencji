<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="bg" />
<div class="main">
    <h1 style="color: #DB2B39;">ERROR {page.status}</h1>
    <h2>{page.error ? page.error.message : "Unknown error"}</h2>
    <p>{"Wygląda na to, ze zgubiłeś się na trasie! \n Jezeli błąd wystąpił nie z twojego powodu, mozesz go zgłosić administratorowi"}</p>
</div>


<style>
    .bg {
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: #DCDCDD;
        overflow: hidden;
    }

    .main{
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 70%;
        height: fit-content;
        min-height: 200px;

        border: 6px solid #DB2B39;
        border-radius: 30px;
        background-color: white;
        padding: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;

        font-family: Arial, Helvetica, sans-serif;

    }
    h1 {
        margin: 30px;
    }
    h2 {
        margin: 0;
        margin-bottom: 30px;
    }
    p {
        margin: 0;
    }
</style>
