<script lang="ts">
    import { setLocale, getLocale, locales } from "../../paraglide/runtime.js";

    const flagMap = {
        en: '🇬🇧',
        de: '🇩🇪',
        es: '🇲🇽',
        ja: '🇯🇵',
        fr: '🇫🇷',
        zh: '🇨🇳'
    };

    let currentLocale = getLocale();

    function handleSetLocale(locale) {
        setLocale(locale);
        currentLocale = locale;
    }
</script>

<div class="language-switcher-container">
    <h3>Language Control</h3>
    <div class="buttons-wrapper">
        {#each locales as locale}
            <button 
                class="language-button"
                on:click={() => handleSetLocale(locale)} 
                disabled={currentLocale === locale}
                title={locale.toUpperCase()}
            >
                <span class="flag">{flagMap[locale]}</span>
            </button>
        {/each}
    </div>
    <p>Current language: <strong>{currentLocale}</strong></p>
</div>

<style>
    .language-switcher-container {
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem;
        font-family: sans-serif;
    }
    .buttons-wrapper {
        display: flex;
        gap: 10px;
        margin-bottom: 1rem;
    }
    .language-button {
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 5px;
        padding: 5px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        line-height: 1;
    }
    .language-button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .language-button:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    .flag {
        vertical-align: middle;
    }
</style>
