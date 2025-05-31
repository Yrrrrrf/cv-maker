<script lang="ts">
    import { Briefcase, Link, FileText } from '@lucide/svelte';

    // Type definition for the job input type
    export type JobInputType = 'url' | 'text';

    // Props received from the parent
    let { jobInputType, jobTargetValue } = $props<{
        jobInputType: JobInputType;
        jobTargetValue: string;
    }>();

    // Internal state to manage binding and emit changes back to parent
    let _jobInputType = $state(jobInputType);
    let _jobTargetValue = $state(jobTargetValue);

    // Effect to react to external changes in props (e.g., when example data is filled)
    $effect(() => {
        if (jobInputType !== _jobInputType) {
            _jobInputType = jobInputType;
        }
    });
    $effect(() => {
        if (jobTargetValue !== _jobTargetValue) {
            _jobTargetValue = jobTargetValue;
        }
    });

    // Helper to dispatch custom events to the parent
    const dispatch = (eventName: string, data?: any) => {
        const event = new CustomEvent(eventName, { detail: data });
        dispatchEvent(event);
    };

    // Handler for changing the input type (URL vs Text)
    function updateJobInputType(type: JobInputType) {
        _jobInputType = type;
        _jobTargetValue = ''; // Clear the input value when switching types
        dispatch('update:jobInputType', _jobInputType);
        dispatch('update:jobTargetValue', _jobTargetValue); // Notify parent of cleared value
    }

    // Handler for updating the job target value (text or URL)
    function updateJobTargetValue(event: Event) {
        _jobTargetValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
        dispatch('update:jobTargetValue', _jobTargetValue);
    }
</script>

<div class="space-y-8 animate-slide-in">
    <div class="flex items-center space-x-3 mb-6">
        <Briefcase class="w-6 h-6 text-gray-700" />
        <h2 class="text-2xl font-semibold text-gray-800">Target Job Details</h2>
    </div>
    
    <div class="space-y-4">
        <!-- Input Type Toggle -->
        <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <button
                class="flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2
                       {_jobInputType === 'text' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
                onclick={() => updateJobInputType('text')}
            >
                <FileText class="w-5 h-5" />
                <span>Job Description Text</span>
            </button>
            <button
                class="flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2
                       {_jobInputType === 'url' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
                onclick={() => updateJobInputType('url')}
            >
                <Link class="w-5 h-5" />
                <span>Job Application URL</span>
            </button>
        </div>

        <!-- Conditional Input Field based on selected type -->
        {#if _jobInputType === 'text'}
            <div>
                <label for="job-desc" class="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                </label>
                <textarea
                    id="job-desc"
                    rows="12"
                    placeholder="Paste the complete job description here, including requirements, responsibilities, and technologies mentioned..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    value={_jobTargetValue}
                    oninput={updateJobTargetValue}
                ></textarea>
                <p class="mt-2 text-sm text-gray-500">
                    The AI will extract key requirements and tailor your CV content to them.
                </p>
            </div>
        {:else}
            <div>
                <label for="job-url" class="block text-sm font-medium text-gray-700 mb-2">
                    Job Application URL
                </label>
                <div class="relative">
                    <input
                        id="job-url"
                        type="url"
                        placeholder="e.g., https://careers.example.com/job/senior-dev"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pl-12"
                        value={_jobTargetValue}
                        oninput={updateJobTargetValue}
                    />
                    <Link class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p class="mt-2 text-sm text-gray-500">
                    Ensure the URL is publicly accessible for the AI to analyze its content.
                </p>
            </div>
        {/if}
    </div>

    <div class="bg-green-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-green-700 mb-2">🎯 AI Magic:</h3>
        <p class="text-sm text-green-600">
            Our AI will analyze this job description (or the content at the URL) and highlight the most relevant aspects 
            of your profile that match the requirements, optimizing your CV for this specific role.
        </p>
    </div>
</div>