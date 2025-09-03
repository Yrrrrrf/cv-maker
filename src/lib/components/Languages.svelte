<script lang="ts">
    import type { LanguagesData } from '$lib/types/cv';
    import { m } from '../../paraglide/messages';
    let { data }: { data: LanguagesData } = $props();
</script>

<section class="mb-6 print:mb-3">
    <h3 class="text-xl font-bold text-gray-800 border-b-2 border-blue-600 inline-block mb-3 print:text-base print:mb-1.5">{m.languages_title()}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
        {#each data.entries as entry (entry.language)}
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:p-2 print:shadow-none">
                <h4 class="font-semibold text-gray-800 print:text-sm">{entry.language}</h4>
                <p class="text-gray-700 mb-1 print:mb-0.5 print:text-xs">{entry.level}</p>
                <div class="w-full bg-gray-200 rounded-full h-2.5 print:h-1.5">
                    <div class="bg-blue-600 h-2.5 rounded-full print:h-1.5" style={`width: ${entry.proficiencyPercent}%`}></div>
                </div>
            </div>
        {/each}
    </div>
</section>