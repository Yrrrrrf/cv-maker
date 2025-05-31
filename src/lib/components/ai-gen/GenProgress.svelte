<!-- src/lib/components/ai-gen/GenProgress.svelte -->
<script lang="ts">
    import { Loader2, CheckCircle, AlertCircle, FileText } from '@lucide/svelte'; // Removed Sparkles as it wasn't used here

    // Props from the parent (AiCvGenerator.svelte)
    let {
        isGenerating,
        generationStep,
        generationProgress,
        showSuccess,
        errorMessage
    } = $props<{
        isGenerating: boolean;
        generationStep: string;
        generationProgress: number;
        showSuccess: boolean;
        errorMessage: string;
    }>();

    type $$Events = {
        'viewGeneratedCv': CustomEvent<void>;
        'generateAnother': CustomEvent<void>;
    };

    // The `dispatch` function should now be automatically typed correctly via $$events
    const dispatch = (eventName: keyof $$Events) => {
        const event = new CustomEvent(eventName);
        dispatchEvent(event);
    };
</script>

<!-- Conditional rendering based on generation state or error -->
{#if isGenerating || showSuccess || errorMessage}
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-slide-in">
        <div class="text-center space-y-6">
            {#if isGenerating}
                <!-- Generation in progress UI -->
                <div class="flex items-center justify-center">
                    <Loader2 class="w-12 h-12 text-blue-500 animate-spin" />
                </div>
                <div class="space-y-3">
                    <h3 class="text-xl font-semibold text-gray-800">Generating Your Perfect CV</h3>
                    <p class="text-gray-600">{generationStep}</p>
                    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                            class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                            style="width: {generationProgress}%"
                        ></div>
                    </div>
                    <p class="text-sm text-gray-500">{Math.round(generationProgress)}% complete</p>
                </div>
            {:else if showSuccess}
                <!-- Generation success UI -->
                <div class="space-y-4">
                    <CheckCircle class="w-16 h-16 text-green-500 mx-auto" />
                    <h3 class="text-2xl font-semibold text-gray-800">CV Generated Successfully!</h3>
                    <p class="text-gray-600">Your personalized CV has been created and optimized for the target position.</p>
                    
                    <div class="flex justify-center space-x-4 pt-4">
                        <button 
                            onclick={() => dispatch('viewGeneratedCv')} 
                            class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                        >
                            <FileText class="w-5 h-5" />
                            <span>View Generated CV</span>
                        </button>
                        <button 
                            onclick={() => dispatch('generateAnother')} 
                            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Generate Another
                        </button>
                    </div>
                </div>
            {:else if errorMessage}
                <!-- Error message UI -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 animate-slide-in">
                    <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 class="text-red-800 font-medium">Please check your input</h4>
                        <p class="text-red-700 text-sm mt-1">{errorMessage}</p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}