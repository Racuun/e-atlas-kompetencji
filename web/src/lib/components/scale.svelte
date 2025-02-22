<script lang="ts">
    let agreement: number = $state();

    const ID: string = $props.id();

    let {
        negLabel = "",
        posLabel = "",
        selected = $bindable(false),
    } : {
        negLabel: string,
        posLabel: string,
    } = $props();

    $effect(() => {
        selected = agreement !== undefined ? true : false;
    });
</script>

<div class ="scale">
    {negLabel}
    <label class="wrap n l3">
        <input name={ID} type=radio bind:group={agreement} value={-3}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap n l2">
        <input name={ID} type=radio bind:group={agreement} value={-2}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap n l1">
        <input name={ID} type=radio bind:group={agreement} value={-1}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap z l1">
        <input name={ID} type=radio bind:group={agreement} value={0}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap p l1">
        <input name={ID} type=radio bind:group={agreement} value={1}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap p l2">
        <input name={ID} type=radio bind:group={agreement} value={2}/>
        <div class="octagon"></div>
    </label>
    <label class="wrap p l3">
        <input name={ID} type=radio bind:group={agreement} value={3}/>
        <div class="octagon"></div>
    </label>
    {posLabel}
</div>

<style>
    .scale {
        display: flex;
        width: fit-content;
        flex-wrap: nowrap;
        flex-flow: row;
        align-items: center;
        align-content: space-between;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .wrap {
        width:3.5rem;
        height:3.5rem;
        float: left;
        position: relative;
        overflow: hidden;
    }
    .octagon {
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        overflow: hidden;
        transform: rotate(45deg);
        background: #DCDCDD;
        border: 4px solid;
    }
    .octagon:before {
        position: absolute;
        top: -4px; right: -4px; bottom: -4px; left: -4px;
        transform: rotate(45deg);
        content: '';
        border: inherit;
    }

    .wrap input {
        display: none;
    }

    .n .octagon {
        border-color: #DB2B39;
    }
    .n .octagon:hover,
    .n > input:checked ~ .octagon {
        background: #DB2B39;
    }
    .z .octagon {
        border-color: #824D77;
    }
    .z .octagon:hover,
    .z > input:checked ~ .octagon {
        background: #824D77;
    }
    .p .octagon {
        border-color:#296EB4;
    }
    .p .octagon:hover,
    .p > input:checked ~ .octagon {
        background:#296EB4;
    }

    .l1 {
        width: 2.5rem;
        height: 2.5rem;
    }
    .l1 .octagon:before {
        top: -3px; right: -3px; bottom: -3px; left: -3px;
    }
    .l1 .octagon {
        border-width: 3px;
    }
    .l2 {
        width: 3rem;
        height: 3rem;
    }
    .l2 .octagon:before {
        top: -3.5px; right: -3.5px; bottom: -3.5px; left: -3.5px;
    }
    .l2 .octagon {
        border-width: 3.5px;
    }
    .l3 {
        width: 3.5rem;
        height: 3.5rem;
    }
</style>
