<script lang="ts">
    import { Github, Linkedin, Link, PlusCircle, MinusCircle, User } from '@lucide/svelte';
    import type { Component } from 'svelte';

    // Type definition for a single profile source entry
    export type ProfileSource = {
        id: string; // Unique ID for Svelte's #each block keying
        type: 'github' | 'linkedin' | 'other'; // Type of source
        value: string; // The URL or username
    };

    // Interface for the profile option definition
    interface ProfileOption {
        type: ProfileSource['type'];
        name: string;
        icon: Component; // Lucide Svelte icon component
    }

    // Define the available profile options with their names and icons
    const profileOptions: ProfileOption[] = [
        { type: 'github', name: 'GitHub', icon: Github },
        { type: 'linkedin', name: 'LinkedIn URL', icon: Linkedin },
        { type: 'other', name: 'Other URL', icon: Link }
    ];

    // Props received from the parent (CVGenerator.svelte)
    let { sources, manualSummary } = $props<{
        sources: ProfileSource[];
        manualSummary: string;
    }>();

    // Internal state. Initialize _sources as a new array from the prop
    // to ensure it's a distinct reactive state cell.
    let _sources = $state([...sources]); 
    let _manualSummary = $state(manualSummary);

    // Effect to sync _sources when the 'sources' prop changes from the parent
    // This is important for "Fill Example Data" or other parent-driven updates.
    $effect(() => {
        // Only update if the prop 'sources' is truly different from the local '_sources'.
        // This deep comparison prevents unnecessary re-assignments and potential loops.
        if (JSON.stringify(sources) !== JSON.stringify(_sources)) {
            _sources = [...sources]; // Assign a new array from the prop
        }
    });

    // Effect to sync _manualSummary when the prop changes
    $effect(() => {
        if (manualSummary !== _manualSummary) {
            _manualSummary = manualSummary;
        }
    });
    
    // Define the events this component can dispatch
    type $$Events = {
        'update:sources': CustomEvent<ProfileSource[]>;
        'update:manualSummary': CustomEvent<string>;
    };

    // Helper to dispatch events
    const dispatch = (eventName: keyof $$Events, data?: any) => {
        const event = new CustomEvent(eventName, { detail: data });
        dispatchEvent(event);
    };

    // Derived state to track which unique types (GitHub, LinkedIn) are currently used
    let usedUniqueTypes = $derived(() => {
        const types = new Set<ProfileSource['type']>();
        // Iterate over the reactive _sources array
        _sources.forEach((source: ProfileSource) => { // FIXED: Added type ProfileSource
            if (source.type === 'github' || source.type === 'linkedin') {
                types.add(source.type);
            }
        });
        return types;
    });

    function addSource() {
        const newSourceItem = { id: crypto.randomUUID(), type: 'other' as ProfileSource['type'], value: '' };
        // Create a new array by spreading the existing _sources and adding the new item.
        // This assignment to _sources triggers Svelte's reactivity.
        _sources = [..._sources, newSourceItem];
        dispatch('update:sources', _sources); // Dispatch the new array reference
    }

    function removeSource(id: string) {
        // .filter() inherently creates a new array, which is good for reactivity.
        _sources = _sources.filter((source: ProfileSource) => source.id !== id); // FIXED: Added type
        dispatch('update:sources', _sources); // Dispatch the new array reference
    }

    function handleSourceValueInput(id: string, event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        // Create a new array using .map(). For the changed item, create a new object.
        _sources = _sources.map((source: ProfileSource) => // FIXED: Added type
            source.id === id ? { ...source, value: inputValue } : source
        );
        dispatch('update:sources', _sources); // Dispatch the new array reference
    }
    
    function handleSourceTypeChange(targetSelectElement: HTMLSelectElement, id: string) {
        const newType = targetSelectElement.value as ProfileSource['type'];
        const currentSource = _sources.find((source: ProfileSource) => source.id === id); // FIXED: Added type

        if (!currentSource) return;
        const previousType = currentSource.type;

        if (
            (newType === 'github' || newType === 'linkedin') &&
            usedUniqueTypes().has(newType) && // Call derived state as a function
            previousType !== newType
        ) {
            console.warn(`Type ${newType} is already in use by another source. Reverting selection in UI.`);
            // Directly set the select's value back to the previous type to reflect the revert.
            targetSelectElement.value = previousType; 
            return; // Important: Do not update state or dispatch if reverted
        }
        
        // Create a new array using .map(). For the changed item, create a new object.
        _sources = _sources.map((source: ProfileSource) => // FIXED: Added type
            source.id === id ? { ...source, type: newType } : source
        );
        dispatch('update:sources', _sources); // Dispatch the new array reference
    }

    function handleManualSummaryInput(event: Event) {
        _manualSummary = (event.target as HTMLTextAreaElement).value;
        dispatch('update:manualSummary', _manualSummary);
    }
</script>

<div class="space-y-8 animate-slide-in">
    <!-- Section 1: Profile Links -->
    <div class="space-y-6">
        <div class="flex items-center space-x-3">
            <Link class="w-6 h-6 text-gray-700" />
            <h2 class="text-2xl font-semibold text-gray-800">Profile Links (for AI Analysis)</h2>
        </div>

        <div class="space-y-4">
            {#if _sources.length === 0}
                <p class="text-gray-500 text-sm text-center py-4">
                    No profile links added yet. Click "Add Link" to get started.
                </p>
            {/if}
            {#each _sources as source (source.id)}
                <div class="flex items-center gap-2">
                    <select
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-32 flex-shrink-0"
                        onchange={(e) => handleSourceTypeChange(e.currentTarget as HTMLSelectElement, source.id)}
                        value={source.type} 
                    >
                        {#each profileOptions as option}
                            <option
                                value={option.type}
                                disabled={
                                    (option.type === 'github' || option.type === 'linkedin') &&
                                    usedUniqueTypes().has(option.type) && // Call derived state as a function
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
                            oninput={(e) => handleSourceValueInput(source.id, e)}
                        />
                        {#each profileOptions as option}
                            {#if option.type === source.type}
                                <option.icon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            {/if}
                        {/each}
                    </div>
                    <button 
                        onclick={() => removeSource(source.id)}
                        class="p-2 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove source"
                    >
                        <MinusCircle class="w-5 h-5" />
                    </button>
                </div>
            {/each}

            <div class="flex justify-end gap-3 mt-4">
                <button 
                    onclick={addSource}
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

    <!-- Section 2: Manual Professional Summary & Skills -->
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
                    value={_manualSummary}
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