<!-- src/lib/components/ai-gen/CVGenerator.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { Sparkles } from '@lucide/svelte';
    import { aiCvGeneratorStore } from '$lib/stores/aiCvGenerator.svelte';

    // Import step components
    import Step1_ProfileSources from './ProfileSources.svelte';
    import Step2_JobTarget from './JobTarget.svelte';
    import GenProgress from './GenProgress.svelte';
    import StepFooter from './StepFooter.svelte';

    const store = aiCvGeneratorStore;

    let currentStep = $derived(store.state.currentStep);
    let currentStepDef = $derived(store.currentStepDefinition); // Used for icon
    let totalSteps = $derived(store.totalSteps);
    let stepsForProgress = $derived(store.steps); // Renamed to avoid conflict with 'steps' in store

    let isGenerating = $derived(store.state.isGenerating);
    let generationStepText = $derived(store.state.generationStepText);
    let generationProgress = $derived(store.state.generationProgress);
    let showSuccess = $derived(store.state.showSuccess);
    let errorMessage = $derived(store.state.errorMessage);

    let isNextButtonDisabled = $derived(store.isNextButtonDisabled);

    // Dynamically select the component for the current step
    let CurrentStepComponent = $derived(
        store.state.currentStep === 1 ? Step1_ProfileSources :
        store.state.currentStep === 2 ? Step2_JobTarget :
        null // Or some default/error component
    );

    let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });

    type $$Events = {
        viewGeneratedCv: CustomEvent<void>;
    };
    const emit = (eventName: keyof $$Events) => {
        const event = new CustomEvent(eventName);
        dispatchEvent(event);
    };

    function handleViewCv() {
        store.handleViewGeneratedCv();
        emit('viewGeneratedCv');
    }

    function handleGenerateAnother() {
        store.handleGenerateAnother();
        // No need to emit 'generateAnother' if it only resets internal state
        // Parent page doesn't need to know unless it also needs to reset something.
    }

</script>

{#if store.state.showGenerator}
<div class="max-w-4xl mx-auto p-6 space-y-8" class:opacity-0={!mounted} class:animate-fade-in={mounted}>
    <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Sparkles class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI CV Generator
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your online presence and job requirements into a perfectly tailored CV.
        </p>
    </div>

    <div class="flex items-center justify-center space-x-4 mb-8">
        {#each stepsForProgress as stepConfig, i}
            <div class="flex items-center">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    {currentStep >= stepConfig.id ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 text-gray-400'}">
                    <svelte:component this={stepConfig.icon} class="w-5 h-5" />
                </div>
                {#if i < totalSteps - 1}
                    <div class="w-16 h-0.5 mx-2 transition-all duration-300
                        {currentStep > stepConfig.id ? 'bg-blue-500' : 'bg-gray-300'}"></div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
        {#if CurrentStepComponent}
            <svelte:component this={CurrentStepComponent} />
        {/if}

        <StepFooter
            currentStep={currentStep}
            totalSteps={totalSteps}
            isGenerating={isGenerating}
            showSuccess={showSuccess}
            disableNext={isNextButtonDisabled}
            onPrev={() => store.prevStep()}
            onNext={() => store.nextStep()}
            onGenerate={() => store.startGeneration()}
            onFillExample={() => store.fillExampleData()}
            onClear={() => store.clearAllData()}
        />
    </div>

    <GenProgress
        isGenerating={isGenerating}
        generationStep={generationStepText}
        generationProgress={generationProgress}
        showSuccess={showSuccess}
        errorMessage={errorMessage}
        onViewGeneratedCv={handleViewCv}
        onGenerateAnother={handleGenerateAnother}
    />
</div>
{/if}

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
    }
    .animate-slide-in {
        animation: slide-in 0.4s ease-out forwards;
    }
    :global(textarea::-webkit-scrollbar) {
        width: 8px;
    }
    :global(textarea::-webkit-scrollbar-track) {
        background: #f1f1f1;
        border-radius: 4px;
    }
    :global(textarea::-webkit-scrollbar-thumb) {
        background: #c1c1c1;
        border-radius: 4px;
    }
    :global(textarea::-webkit-scrollbar-thumb:hover) {
        background: #a8a8a8;
    }
</style>