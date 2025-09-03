<script lang="ts">
    import { setLocale, getLocale } from "../../paraglide/runtime.js";
    import { locales } from "../../paraglide/runtime.js";
</script>

<div style="background: white; border: 2px solid blue; padding: 1rem; margin: 1rem;">
    <h3>Language Control</h3>
    {#each locales as locale}
        <button on:click={() => setLocale(locale)} disabled={getLocale() === locale}>
            {locale.toUpperCase()}
        </button>
    {/each}
    <p>Current language: <strong>{getLocale()}</strong></p>
</div>
