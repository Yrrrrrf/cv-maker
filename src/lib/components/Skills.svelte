<script lang="ts">
    import type { SkillsData } from '$lib/types/cv';
    let { data }: { data: SkillsData } = $props();
</script>

<section class="mb-6 print:mb-3">
    <h3 class="text-xl font-bold text-gray-800 border-b-2 border-blue-600 inline-block mb-3 print:text-base print:mb-1.5">HABILIDADES TÉCNICAS</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
        {#each data.categories as category (category.title)}
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 print:p-2 print:shadow-none">
                <h4 class="font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 print:text-sm print:mb-1">{category.title}:</h4>
                <ul class="list-disc list-inside text-gray-700 ml-2 space-y-1 print:ml-1 print:text-xs print:space-y-0.5">
                    {#each category.skills as skill (skill.name)}
                        <li>{skill.name}</li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</section>