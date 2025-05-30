<script lang="ts">
    import type { ProjectsData, ProjectEntry, SubProject } from '$lib/stores/cvData.svelte.ts';
    import { Github, ExternalLink } from '@lucide/svelte';
    let { data }: { data: ProjectsData } = $props();
</script>

<section class="mb-6 print:mb-3">
    <h3 class="text-xl font-bold text-gray-800 border-b-2 border-blue-600 inline-block mb-3 print:text-base print:mb-1.5">PROYECTOS DESTACADOS</h3>
    <div class="space-y-6 print:space-y-3">
        {#each data.projects as project (project.title)}
            <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100 print:p-2 print:shadow-none">
                <div class="flex justify-between items-start mb-1 print:mb-0.5">
                    <h4 class="font-semibold text-gray-800 text-lg print:text-sm">
                        {#if project.githubUrl}
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 transition-colors print:text-gray-800">
                                {project.title}
                            </a>
                        {:else}
                            {project.title}
                        {/if}
                        {#if project.websiteUrl}
                            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" class="ml-2 text-blue-500 hover:text-blue-700 print:hidden" title="View Live">
                                <ExternalLink size={16} />
                            </a>
                        {/if}
                    </h4>
                    {#if project.githubUrl}
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-full text-xs print:hidden">
                            <Github size={14} />
                            <span>GitHub</span>
                        </a>
                    {/if}
                </div>
                <p class="text-gray-600 italic mb-3 mt-0.5 print:mb-1 print:text-xs">{project.description}</p>

                {#if project.features && project.features.length > 0}
                    <ul class="list-disc list-inside text-gray-700 ml-2 space-y-1 print:ml-1 print:text-xs print:space-y-0.5">
                        {#each project.features as feature (feature.text)}
                            <li>{feature.text}</li>
                        {/each}
                    </ul>
                {/if}

                {#if project.subProjects && project.subProjects.length > 0}
                    <div class="mt-3 space-y-3 print:mt-1.5 print:space-y-1">
                        {#each project.subProjects as sub (sub.name)}
                            <div class="ml-4 bg-gray-50 p-3 rounded-md border-l-2 border-blue-400 print:ml-2 print:p-1.5 print:border-l">
                                <div class="flex justify-between items-start mb-1 print:mb-0.5">
                                    <p class="font-medium text-gray-800 print:text-xs">
                                        {#if sub.githubUrl}
                                            <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 transition-colors print:text-gray-800">
                                                {sub.name}
                                            </a>
                                        {:else}
                                            {sub.name}
                                        {/if}
                                    </p>
                                    {#if sub.githubUrl}
                                    <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full text-xs print:hidden">
                                        <Github size={12} />
                                    </a>
                                    {/if}
                                </div>
                                <p class="text-gray-700 mb-1 text-sm print:mb-0.5 print:text-xs">{sub.description}</p>
                                <ul class="list-disc list-inside text-gray-700 ml-2 space-y-0.5 text-sm print:ml-1 print:text-xs">
                                    {#each sub.features as feature (feature.text)}
                                        <li>{feature.text}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>