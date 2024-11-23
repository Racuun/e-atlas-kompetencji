<script lang="ts">
    import type { PageData } from '../$types';
    import Scale from '../../../components/scale.svelte';

    export let data: PageData;
</script>

{#if !data.ready}
<form method="POST" action="?/init">
    <select name="sel_met">
        <option value={"harc"}>Harcerska</option>
        <option value={"zuch"}>Zuchowa</option>
        <option value={"wedr"}>Wędrownicza</option>
    </select>
    <input name="sel_x8" type=checkbox /> Wersja 8K
    <select name="sel_fun">
        <option value={"przy"}>Przyboczny</option>
        <option value={"druz"}>Druzynowy</option>
        <option value={"hufc"}>Hufcowy</option>
        <option value={"kcho"}>Komendant Chorągwi</option>
        <option value={"nacz"}>Naczelnik</option>
        <option value={"kwat"}>Kwatermistrz</option>
        <option value={"szcz"}>Szczepowy</option>
        <option value={"pokr"}>Przewodniczący Okręgu</option>
        <option value={"pzhr"}>Przewodniczący ZHR</option>
    </select>
    <input name="sel_stat" type=checkbox /> Przekaz wyniki dla celów statystycznych
    <button type=submit>Dalej</button>
</form>
{/if}

{#if data.ready && data.questions !== undefined }
    <form method="POST" action="?/analyze">
    {#each data.questions as question}
        <p>{question.description}</p>
        {@const _ID = question.kID + '/' + question.aID + '/' + question.dID + '/' + question.level + '/' + question.negative}
        <Scale ID={_ID}/>
    {/each}
        <button type=submit>Dalej</button>
    </form>
{/if}
