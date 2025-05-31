<!-- src/lib/components/ai-gen/StepFooter.svelte -->
<script lang="ts">
    import { Sparkles, ArrowRight, Loader2, FileText } from '@lucide/svelte';

    let {
        currentStep,
        totalSteps,
        isGenerating,
        showSuccess,
        disableNext = false,
        onPrev,
        onNext,
        onGenerate,
        onFillExample,
        onClear
    } = $props<{
        currentStep: number;
        totalSteps: number;
        isGenerating: boolean;
        showSuccess: boolean;
        disableNext?: boolean;
        onPrev: () => void;
        onNext: () => void;
        onGenerate: () => void;
        onFillExample: () => void;
        onClear: () => void;
    }>();
</script>

<div class="flex justify-between items-center pt-6 border-t border-gray-200">
    <button
        type="button"
        onclick={onPrev}
        disabled={currentStep === 1 || isGenerating}
        class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
        Previous
    </button>

    <div class="flex space-x-3">
        <button
            type="button"
            onclick={onFillExample}
            disabled={isGenerating}
            class="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Use Example Data
        </button>
        <button
            type="button"
            onclick={onClear}
            disabled={isGenerating}
            class="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Clear All
        </button>
    </div>

    {#if currentStep < totalSteps}
        <button
            type="button"
            onclick={onNext}
            disabled={disableNext || isGenerating}
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span>Next</span>
            <ArrowRight class="w-4 h-4" />
        </button>
    {:else}
        <button
            type="button"
            onclick={onGenerate}
            disabled={isGenerating || disableNext || showSuccess}
            class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 font-semibold"
        >
            {#if isGenerating}
                <Loader2 class="w-5 h-5 animate-spin" />
                <span>Generating...</span>
            {:else if showSuccess}
                <FileText class="w-5 h-5" />
                <span>View Generated CV</span>
            {:else}
                <Sparkles class="w-5 h-5" />
                <span>Generate AI CV</span>
            {/if}
        </button>
    {/if}
</div>