<script lang="ts">
    import type { EducationData } from '$lib/types/cv';
    import { m } from '../../paraglide/messages';
    let { data }: { data: EducationData } = $props();
</script>

<section class="mb-6 print:mb-3">
    <h3 class="text-xl font-bold text-gray-800 border-b-2 border-blue-600 inline-block mb-3 print:text-base print:mb-1.5">{m.education_title()}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
        {#each data.entries as entry (entry.institution)}
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:p-2 print:shadow-none">
                <h4 class="font-semibold text-gray-800 print:text-sm">{entry.institution}</h4>
                <p class="text-gray-700 print:text-xs">
                    <strong>{entry.degree}</strong> | {entry.period}
                </p>
            </div>
        {/each}
    </div>
</section>