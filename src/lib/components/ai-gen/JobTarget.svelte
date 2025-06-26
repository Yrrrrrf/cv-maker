<!-- src/lib/components/ai-gen/JobTarget.svelte -->
<script lang="ts">
    import { Briefcase, Link as LinkIcon, FileText } from '@lucide/svelte';
    import { aiCvGeneratorStore, type JobInputType } from '$lib/stores/aiCvGenerator.svelte';

    const store = aiCvGeneratorStore;
    let jobInputType = $derived(store.state.jobInputType);
    let jobTargetValue = $derived(store.state.jobTargetValue);

    function handleJobTargetValueInput(event: Event) {
        store.updateJobTargetValue((event.currentTarget as HTMLInputElement | HTMLTextAreaElement).value);
    }
</script>

<div class="space-y-8 animate-slide-in">
    <div class="flex items-center space-x-3 mb-6">
        <Briefcase class="w-6 h-6 text-gray-700" />
        <h2 class="text-2xl font-semibold text-gray-800">Target Job Details</h2>
    </div>

    <div class="space-y-4">
        <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <button
                type="button"
                class="flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2
                       {jobInputType === 'text' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
                onclick={() => store.updateJobInputType('text')}
            >
                <FileText class="w-5 h-5" />
                <span>Job Description Text</span>
            </button>
            <button
                type="button"
                class="flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2
                       {jobInputType === 'url' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
                onclick={() => store.updateJobInputType('url')}
            >
                <LinkIcon class="w-5 h-5" />
                <span>Job Application URL</span>
            </button>
        </div>

        {#if jobInputType === 'text'}
            <div>
                <label for="job-desc" class="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                </label>
                <textarea
                    id="job-desc"
                    rows="12"
                    placeholder="Paste the complete job description here..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    value={jobTargetValue}
                    oninput={handleJobTargetValueInput}
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
                        value={jobTargetValue}
                        oninput={handleJobTargetValueInput}
                    />
                    <LinkIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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