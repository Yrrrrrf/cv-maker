<script lang="ts">
    import { onMount } from 'svelte';
    // Import all Lucide icons that might be used across any child component for the progress indicators
    import { Sparkles, User, Briefcase, Link, Github, FileText, Loader2, CheckCircle, AlertCircle, ArrowRight } from '@lucide/svelte'; 

    // Import the step components - ADJUSTED PATHS BASED ON YOUR DESCRIPTION
    // USER'S IMPORTS - DO NOT MODIFY THESE
    import Step1_ProfileSources, { type ProfileSource } from './ProfileSources.svelte'; 
    import Step2_JobTarget, { type JobInputType } from './JobTarget.svelte'; 
    import GenProgress from './GenProgress.svelte'; // User's name for GenerationProgress
    import StepFooter from './StepFooter.svelte'; // User's path for StepFooter

    // --- Overall Application State ---
    let mounted = $state(false); // For fade-in animation
    let currentStep = $state(1); // Current step in the multi-step form

    // AI Generation Status and Messages
    let isGenerating = $state(false);
    let generationStep = $state(''); // Text describing the current AI process
    let generationProgress = $state(0); // Progress percentage (0-100)
    let showSuccess = $state(false); // Flag for successful generation
    let errorMessage = $state(''); // Error message to display

    // --- Form Data (Centralized, passed to children) ---
    // Step 1 Data: User's Profile Information
    let profileSources = $state<ProfileSource[]>([]); // Array of dynamic profile links
    let manualProfessionalSummary = $state(''); // Free-form text for summary/skills

    // Step 2 Data: Job Target Information
    let jobInputType = $state<JobInputType>('text'); // 'url' or 'text'
    let jobTargetValue = $state(''); // The actual job description text or URL

    // --- Dynamic Steps Definition ---
    // This array makes the multi-step flow flexible.
    // Each step defines its ID, title, icon, the Svelte component to render,
    // its props, and how to handle events from the component, plus validation.
    
    // Define a union type for all possible props and events
    type AllStepProps = {
        sources?: ProfileSource[];
        manualSummary?: string;
        jobInputType?: JobInputType;
        jobTargetValue?: string;
    };

    type AllStepEvents = {
        'update:sources'?: (e: CustomEvent<ProfileSource[]>) => void;
        'update:manualSummary'?: (e: CustomEvent<string>) => void;
        'update:jobInputType'?: (e: CustomEvent<JobInputType>) => void;
        'update:jobTargetValue'?: (e: CustomEvent<string>) => void;
    };

    const steps: Array<{
        id: number;
        title: string;
        icon: any; // Lucide icon component type
        component: any; // Svelte component type (use `any` for dynamic component in runes)
        props: () => AllStepProps; // Props factory returns `AllStepProps`
        events: AllStepEvents; // Events for this step
        isValid: () => boolean;
    }> = [
        { 
            id: 1,
            title: 'Profile Data',
            icon: User,
            component: Step1_ProfileSources,
            props: () => ({ 
                sources: profileSources,
                manualSummary: manualProfessionalSummary
            }),
            events: {
                'update:sources': (e: CustomEvent<ProfileSource[]>) => profileSources = e.detail,
                'update:manualSummary': (e: CustomEvent<string>) => manualProfessionalSummary = e.detail
            },
            isValid: () => {
                const hasValidSource = profileSources.some(s => s.value.trim() !== '');
                const hasManualSummary = manualProfessionalSummary.trim() !== '';
                return hasValidSource || hasManualSummary; // At least one source or summary is required
            }
        },
        { 
            id: 2,
            title: 'Target Job',
            icon: Briefcase,
            component: Step2_JobTarget,
            props: () => ({
                jobInputType: jobInputType,
                jobTargetValue: jobTargetValue
            }),
            events: {
                'update:jobInputType': (e: CustomEvent<JobInputType>) => jobInputType = e.detail,
                'update:jobTargetValue': (e: CustomEvent<string>) => jobTargetValue = e.detail
            },
            isValid: () => jobTargetValue.trim() !== '' // Job description/URL is required
        }

        
    ];

    const totalSteps = steps.length;

    // Reactive variables to hold the current step's component and its props
    // Initialized directly, and updated in effect. This addresses `state_referenced_locally` warnings.
    let CurrentStepComponent = $state(steps[0].component);
    let CurrentStepProps = $state<AllStepProps>(steps[0].props());
    let CurrentStepEvents = $state<AllStepEvents>(steps[0].events);

    // Effect to update the dynamically rendered component and its props
    // whenever 'currentStep' changes.
    $effect(() => {
        CurrentStepComponent = steps[currentStep - 1].component;
        CurrentStepProps = steps[currentStep - 1].props();
        CurrentStepEvents = steps[currentStep - 1].events; // Also update events
    });

    // --- Lifecycle Hooks ---
    onMount(() => {
        mounted = true;
        if (profileSources.length === 0) { // If parent's state is empty
            profileSources = [ // Initialize with one default item
                { id: crypto.randomUUID(), type: 'other' as ProfileSource['type'], value: '' } 
            ];
        }
    });

    // --- Example Data for Quick Testing ---
    const exampleData = {
        profileSources: [
            { id: crypto.randomUUID(), type: 'github' as ProfileSource['type'], value: 'octocat' }, // Explicit cast
            { id: crypto.randomUUID(), type: 'linkedin_url' as ProfileSource['type'], value: 'https://www.linkedin.com/in/sveltestudent/' }, // Explicit cast
            { id: crypto.randomUUID(), type: 'other_url' as ProfileSource['type'], value: 'https://your-portfolio.dev' } // Explicit cast
        ],
        manualProfessionalSummary: `Highly motivated Senior Software Engineer with 7+ years of experience in building scalable web applications. Proven ability to lead cross-functional teams, implement robust backend services using Node.js and Rust, and deliver intuitive user interfaces with Svelte and React. Passionate about cloud-native solutions (AWS, GCP) and improving developer workflows through CI/CD best practices. Seeking to leverage deep technical expertise and leadership skills to drive impactful projects at a forward-thinking tech company.`,
        jobDescription: `Senior Full Stack Developer - Tech Company

We are looking for a Senior Full Stack Developer to join our growing team.

Requirements:
• 3+ years of experience with React and Node.js
• Experience with cloud platforms (AWS, GCP)
• Strong knowledge of database design
• Experience with CI/CD pipelines
• Leadership and mentoring experience preferred

Responsibilities:
• Lead development of customer-facing applications
• Mentor junior developers
• Collaborate with product and design teams
• Implement best practices and code reviews`,
        jobUrl: 'https://careers.example.com/job/senior-fullstack-dev-12345'
    };

    // --- Navigation and Form Control Functions ---
    function nextStep() {
        // Validate current step before proceeding
        if (!steps[currentStep - 1].isValid()) {
            errorMessage = `Please complete all required fields for ${steps[currentStep - 1].title} before proceeding.`;
            return;
        }
        errorMessage = ''; // Clear any previous error
        if (currentStep < totalSteps) {
            currentStep++;
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            errorMessage = ''; // Clear error when navigating back
        }
    }

    function handleGenerateCV() {
        // Final validation check before starting AI generation
        if (!steps[currentStep - 1].isValid()) {
            errorMessage = `Please complete all required fields for ${steps[currentStep - 1].title} before generating.`;
            return;
        }

        errorMessage = '';
        isGenerating = true;
        generationProgress = 0;
        showSuccess = false;

        // Simulate the AI generation process with sequential steps and progress updates
        const simulationSteps = [
            { text: 'Analyzing profile data from sources...', duration: 2000 },
            { text: 'Processing manual professional summary...', duration: 1500 },
            { text: `Analyzing job ${jobInputType === 'text' ? 'description' : 'URL'}...`, duration: 2000 },
            { text: 'Extracting relevant skills and keywords...', duration: 1800 },
            { text: 'Tailoring profile summary for job relevance...', duration: 2200 },
            { text: 'Optimizing project descriptions and achievements...', duration: 2500 },
            { text: 'Finalizing CV structure and content...', duration: 1000 }
        ];

        let currentSimulationStepIndex = 0;
        const totalDuration = simulationSteps.reduce((sum, step) => sum + step.duration, 0);
        let elapsedTime = 0;

        function processSimulationStep() {
            if (currentSimulationStepIndex < simulationSteps.length) {
                generationStep = simulationSteps[currentSimulationStepIndex].text;
                
                setTimeout(() => {
                    elapsedTime += simulationSteps[currentSimulationStepIndex].duration;
                    // Ensure progress doesn't exceed 100%
                    generationProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
                    currentSimulationStepIndex++;
                    processSimulationStep();
                }, simulationSteps[currentSimulationStepIndex].duration);
            } else {
                // Once all simulation steps are complete, set success state
                setTimeout(() => {
                    isGenerating = false;
                    showSuccess = true;
                    generationStep = 'CV generated successfully!';
                    generationProgress = 100;
                    // In a real application, here you would:
                    // 1. Call your backend API with `profileSources`, `manualProfessionalSummary`, `jobInputType`, `jobTargetValue`.
                    // 2. The backend would use AI to process, generate the `CVData` object.
                    // 3. The generated `CVData` would then be dispatched back to `+page.svelte` to update `cvDataStore.cv`.
                    // 4. The `+page.svelte` would then switch from showing the generator to showing the generated CV.
                }, 500);
            }
        }

        processSimulationStep(); // Start the AI generation simulation
    }

    function fillExampleData() {
        // Populate all form fields with example data
        profileSources = exampleData.profileSources;
        // CORRECTED: Accessing manualProfessionalSummary directly from exampleData
        manualProfessionalSummary = exampleData.manualProfessionalSummary; 
        jobInputType = 'text'; // Default to text for example job desc
        jobTargetValue = exampleData.jobDescription;
        
        // Reset any previous generation status or errors
        errorMessage = '';
        showSuccess = false;
        isGenerating = false;
        generationProgress = 0;
        generationStep = '';
    }

    function clearAllData() {
        // Reset all form fields to their initial empty states
        profileSources = [
            { id: crypto.randomUUID(), type: 'github' as ProfileSource['type'], value: '' }, // Explicit cast
        ]; // Re-initialize with default empty sources
        manualProfessionalSummary = '';
        jobInputType = 'text';
        jobTargetValue = '';

        // Reset all generation status and errors
        errorMessage = '';
        showSuccess = false;
        isGenerating = false;
        generationProgress = 0;
        generationStep = '';
        currentStep = 1; // Reset to the first step
    }

    // Event handler to dispatch 'viewGeneratedCv' event up to +page.svelte
    // This dispatcher will now be used by the GenProgress component's event listeners
    // The `dispatch` function from `GenProgress` component will call this `viewGeneratedCv` and `generateAnother`
    // So this `dispatch` is not for internal component events, but for events to the PARENT (`+page.svelte`).
    const emitToParent = (eventName: string) => {
        const event = new CustomEvent(eventName);
        dispatchEvent(event);
    };

    function viewGeneratedCv() {
        emitToParent('viewGeneratedCv');
        showSuccess = false; 
        isGenerating = false;
        currentStep = 1;
    }

    function generateAnotherCv() {
        emitToParent('generateAnother');
        clearAllData();
    }

    // A derived state to determine if the 'Next' button should be disabled.
    // It calls the the `isValid` function of the current step.
    let disableNextButton = $derived(!steps[currentStep - 1].isValid());
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8" class:opacity-0={!mounted} class:animate-fade-in={mounted}>
    <!-- Header Section -->
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

    <!-- Progress Indicator - Dynamically generated based on 'steps' array -->
    <div class="flex items-center justify-center space-x-4 mb-8">
        {#each steps as step, i}
            <div class="flex items-center">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    {currentStep >= step.id ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 text-gray-400'}">
                    <step.icon class="w-5 h-5" />
                </div>
                {#if i < totalSteps - 1}
                    <div class="w-16 h-0.5 mx-2 transition-all duration-300
                        {currentStep > step.id ? 'bg-blue-500' : 'bg-gray-300'}"></div>
                {/if}
            </div>
        {/each}
    </div>

    <!-- Main Form Card -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
        <!-- Dynamic Step Component Rendering with Snippet -->
        <!-- This pattern handles dynamic components and their events in Svelte 5 runes -->
        {#snippet renderCurrentStep(Comp: any, props: AllStepProps, eventHandlers: AllStepEvents)}
            <Comp
                {...props}
                on:update:sources={eventHandlers['update:sources']}
                on:update:manualSummary={eventHandlers['update:manualSummary']}
                on:update:jobInputType={eventHandlers['update:jobInputType']}
                on:update:jobTargetValue={eventHandlers['update:jobTargetValue']}
            />
        {/snippet}
        {@render renderCurrentStep(CurrentStepComponent, CurrentStepProps, CurrentStepEvents)}


        <!-- Navigation Buttons (Common Footer Component) -->
        <StepFooter 
            {currentStep} 
            {totalSteps} 
            {isGenerating} 
            {showSuccess}
            disableNext={disableNextButton}
            onPrev={prevStep} 
            onNext={nextStep} 
            onGenerate={handleGenerateCV} 
            onFillExample={fillExampleData}
            onClear={clearAllData}
        />
    </div>

    <!-- Generation Progress & Error Message (Common Component) -->
    <GenProgress
        {isGenerating} 
        {generationStep} 
        {generationProgress} 
        {showSuccess} 
        {errorMessage}
        on:viewGeneratedCv={viewGeneratedCv}
        on:generateAnother={generateAnotherCv}
    />
</div>

<!-- Global Styles for Animations and Scrollbar -->
<style>
    /* Make animations global to be applied to dynamically rendered components */
    /* REMOVED :global() from @keyframes definitions, as they are implicitly global in Svelte components. */
    /* The CSS parser was confused by the previous syntax. */
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-in {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    /* These classes are applied to the main div of this component, so they are naturally scoped. */
    /* No need for :global() on .animate-fade-in or .animate-slide-in themselves here. */
    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
    }
    
    .animate-slide-in {
        animation: slide-in 0.4s ease-out forwards;
    }
    
    /* Custom scrollbar for textareas - these *must* be global as they target browser pseudo-elements */
    /* The correct syntax for global pseudo-elements is `:global(selector::pseudo-element)` */
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