<!-- src/lib/components/ai-gen/ProfileSources.svelte -->
<script lang="ts">
    import { Github, Linkedin, Link as LinkIcon, PlusCircle, MinusCircle, User } from '@lucide/svelte';
    import type { Component } from 'svelte';
    import { aiCvGeneratorStore, type ProfileSource } from '$lib/stores/aiCvGeneratorStore.svelte';

    const store = aiCvGeneratorStore;
    let sources = $derived(store.state.profileSources);
    let manualSummary = $derived(store.state.manualProfessionalSummary);

    // $effect(() => {
    //     console.log('ProfileSources: sources array updated:', JSON.stringify(sources));
    // });

    interface ProfileOption {
        type: ProfileSource['type'];
        name: string;
        icon: Component;
    }

    const profileOptions: ProfileOption[] = [
        { type: 'github', name: 'GitHub', icon: Github },
        { type: 'linkedin', name: 'LinkedIn', icon: Linkedin },
        { type: 'other', name: 'Other URL', icon: LinkIcon }
    ];

    let usedUniqueTypes = $derived(() => {
        const types = new Set<ProfileSource['type']>();
        sources.forEach(source => {
            if (source.type === 'github' || source.type === 'linkedin') {
                types.add(source.type);
            }
        });
        return types;
    });

    function handleSourceTypeChange(event: Event, id: string) {
        const targetSelectElement = event.currentTarget as HTMLSelectElement;
        const newType = targetSelectElement.value as ProfileSource['type'];
        const currentSource = sources.find(s => s.id === id);

        if (!currentSource) return;
        const previousType = currentSource.type;

        if (
            (newType === 'github' || newType === 'linkedin') &&
            usedUniqueTypes().has(newType) && // Calling derived as a function
            previousType !== newType
        ) {
            // console.warn(`Type ${newType} is already in use. Reverting.`);
            targetSelectElement.value = previousType;
            return;
        }
        store.updateProfileSource(id, newType, undefined /* Keep current value */);
    }

    function handleSourceValueInput(event: Event, id: string) {
        const inputValue = (event.currentTarget as HTMLInputElement).value;
        store.updateProfileSource(id, undefined /* Keep current type */, inputValue);
    }

    function handleManualSummaryInput(event: Event) {
        store.updateManualSummary((event.currentTarget as HTMLTextAreaElement).value);
    }

</script>

<div class="space-y-8 animate-slide-in">
    <div class="space-y-6">
        <div class="flex items-center space-x-3">
            <LinkIcon class="w-6 h-6 text-gray-700" />
            <h2 class="text-2xl font-semibold text-gray-800">Profile Links (for AI Analysis)</h2>
        </div>

        <div class="space-y-4">
            {#if sources.length === 0}
                <p class="text-gray-500 text-sm text-center py-4">
                    No profile links added yet. Click "Add Link" to get started.
                </p>
            {/if}
            {#each sources as source (source.id)}
                <div class="flex items-center gap-2">
                    <select
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-40 flex-shrink-0"
                        value={source.type}
                        onchange={(e) => handleSourceTypeChange(e, source.id)}
                    >
                        {#each profileOptions as option}
                            <option
                                value={option.type}
                                disabled={
                                    (option.type === 'github' || option.type === 'linkedin') &&
                                    usedUniqueTypes().has(option.type) && // Calling derived as a function
                                    source.type !== option.type
                                }
                            >
                                {option.name}
                            </option>
                        {/each}
                    </select>
                    <div class="relative flex-grow">
                        <input
                            type="text"
                            placeholder={source.type === 'github' ? 'e.g., octocat' : 'https://example.com/profile'}
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pl-12"
                            value={source.value}
                            oninput={(e) => handleSourceValueInput(e, source.id)}
                        />
                        {#each profileOptions as option}
                            {#if option.type === source.type}
                                <svelte:component this={option.icon} class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            {/if}
                        {/each}
                    </div>
                    <button
                        type="button"
                        onclick={() => store.removeProfileSource(source.id)}
                        class="p-2 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove source"
                    >
                        <MinusCircle class="w-5 h-5" />
                    </button>
                </div>
            {/each}

            <div class="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onclick={() => store.addProfileSource()}
                    class="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <PlusCircle class="w-4 h-4" /> Add Link
                </button>
            </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">What we'll extract from links:</h3>
            <ul class="text-sm text-gray-600 space-y-1">
                <li>• GitHub: Repositories, languages, contributions, project details.</li>
                <li>• LinkedIn: Public profile information (if accessible/allowed by AI).</li>
                <li>• Other URLs: Content from personal websites, portfolios (if publicly accessible).</li>
            </ul>
        </div>
    </div>

    <div class="space-y-6 pt-6 border-t border-gray-200">
        <div class="flex items-center space-x-3">
            <User class="w-6 h-6 text-gray-700" />
            <h2 class="text-2xl font-semibold text-gray-800">Manual Professional Summary & Skills</h2>
        </div>
        <div class="space-y-4">
            <div>
                <label for="manual-summary" class="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary, Experience, and Key Skills
                </label>
                <textarea
                    id="manual-summary"
                    rows="8"
                    placeholder="Paste your professional summary, work experience highlights, achievements, and key skills not found online..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    value={manualSummary}
                    oninput={handleManualSummaryInput}
                ></textarea>
                <p class="mt-2 text-sm text-gray-500">
                    This content will be prioritized and combined with data from your links. The more detail you provide, the better.
                </p>
            </div>
        </div>
        <div class="bg-blue-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-blue-700 mb-2">💡 Pro tip:</h3>
            <p class="text-sm text-blue-600">
                Include specific achievements, metrics, and technologies you've worked with.
                Even if it's on your LinkedIn, pasting it here ensures the AI sees it clearly.
            </p>
        </div>
    </div>
</div>