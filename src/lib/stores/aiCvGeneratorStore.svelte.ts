// src/lib/stores/aiCvGeneratorStore.svelte.ts
import type { Component } from 'svelte';
import { User, Briefcase } from '@lucide/svelte'; // Icons for step definitions

// --- Type Definitions (can be co-located or imported) ---
export type ProfileSource = {
	id: string;
	type: 'github' | 'linkedin' | 'other';
	value: string;
};

export type JobInputType = 'url' | 'text';

// Define the structure for each step in the generator
export interface StepDefinition {
	id: number;
	title: string;
	icon: Component;
	isValid: (state: AiCvGeneratorState) => boolean; // Validation function for the step
}

// Define the overall state managed by the store
export interface AiCvGeneratorState {
	currentStep: number;
	profileSources: ProfileSource[];
	manualProfessionalSummary: string;
	jobInputType: JobInputType;
	jobTargetValue: string;

	// Generation status
	isGenerating: boolean;
	generationStepText: string; // Renamed from generationStep to avoid conflict
	generationProgress: number;
	showSuccess: boolean;
	errorMessage: string;

    // App-level state
    showGenerator: boolean; // To control visibility of the entire generator UI
}

// --- Example Data (moved into the store for easier management) ---
const exampleData = {
	profileSources: [
		{ id: crypto.randomUUID(), type: 'github' as ProfileSource['type'], value: 'yrrrrrf' },
		{ id: crypto.randomUUID(), type: 'linkedin' as ProfileSource['type'], value: 'https://www.linkedin.com/in/fernando-reza-campos/' },
		{ id: crypto.randomUUID(), type: 'other' as ProfileSource['type'], value: 'https://yrrrrrf.com' }
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


// --- Store Implementation ---
class AiCvGeneratorStore {
	// Reactive state using $state
	#state = $state<AiCvGeneratorState>({
		currentStep: 1,
		profileSources: [{ id: crypto.randomUUID(), type: 'github', value: '' }],
		manualProfessionalSummary: '',
		jobInputType: 'text',
		jobTargetValue: '',
		isGenerating: false,
		generationStepText: '',
		generationProgress: 0,
		showSuccess: false,
		errorMessage: '',
        showGenerator: true, // Initially show the generator
	});

	// Step definitions - can be expanded
	steps: StepDefinition[] = [
		{
			id: 1,
			title: 'Profile Data',
			icon: User,
			isValid: (state) => {
				const hasValidSource = state.profileSources.some(s => s.value.trim() !== '');
				const hasManualSummary = state.manualProfessionalSummary.trim() !== '';
				// console.log(`Step 1 Validation: hasValidSource=${hasValidSource} (from ${state.profileSources.length} sources), hasManualSummary=${hasManualSummary}`);
				return hasValidSource || hasManualSummary;
			}
		},
		{
			id: 2,
			title: 'Target Job',
			icon: Briefcase,
			isValid: (state) => state.jobTargetValue.trim() !== ''
		}
	];

	// --- Getters for derived state ---
	get state() {
		return this.#state;
	}

	get totalSteps() {
		return this.steps.length;
	}

    get currentStepDefinition() {
        // Ensure currentStep is within bounds
        if (this.#state.currentStep > 0 && this.#state.currentStep <= this.steps.length) {
            return this.steps[this.#state.currentStep - 1];
        }
        return undefined; // Or handle error appropriately
    }

	get isNextButtonDisabled() {
		// console.log('Store: Checking isNextButtonDisabled. Current step:', this.#state.currentStep);
		const stepDef = this.currentStepDefinition;
		if (!stepDef) {
			// console.log('Store: No currentStepDefinition, next disabled.');
			return true; // Disable if no valid step definition
		}
		const valid = stepDef.isValid(this.#state);
		// console.log(`Store: Step ${this.#state.currentStep} isValid: ${valid}. Next button disabled: ${!valid}`);
		return !valid;
	}

	// --- Actions (Mutators) ---
	nextStep() {
        const stepDef = this.currentStepDefinition;
		if (!stepDef || !stepDef.isValid(this.#state)) {
			this.#state.errorMessage = `Please complete all required fields for ${stepDef?.title || 'the current step'} before proceeding.`;
			return;
		}
		this.#state.errorMessage = '';
		if (this.#state.currentStep < this.totalSteps) {
			this.#state.currentStep++;
		}
	}

	prevStep() {
		if (this.#state.currentStep > 1) {
			this.#state.currentStep--;
			this.#state.errorMessage = '';
		}
	}

    // Profile Sources Management
    addProfileSource() {
        // console.log('addProfileSource called in store. Profile sources length before:', this.#state.profileSources.length);
        this.#state.profileSources = [...this.#state.profileSources, { id: crypto.randomUUID(), type: 'other', value: '' }];
        // console.log('addProfileSource called in store. Profile sources length after:', this.#state.profileSources.length);
    }

    removeProfileSource(idToRemove: string) {
        this.#state.profileSources = this.#state.profileSources.filter(source => source.id !== idToRemove);
    }

    updateProfileSource(idToUpdate: string, newType?: ProfileSource['type'], newValue?: string) {
        this.#state.profileSources = this.#state.profileSources.map(source => {
            if (source.id === idToUpdate) {
                return {
                    ...source,
                    type: newType !== undefined ? newType : source.type,
                    value: newValue !== undefined ? newValue : source.value,
                };
            }
            return source;
        });
    }

    updateManualSummary(summary: string) {
        this.#state.manualProfessionalSummary = summary;
    }

    // Job Target Management
    updateJobInputType(type: JobInputType) {
        this.#state.jobInputType = type;
        this.#state.jobTargetValue = ''; // Clear value when type changes
    }

    updateJobTargetValue(value: string) {
        this.#state.jobTargetValue = value;
    }


	// --- Data & Generation Flow ---
	fillExampleData() {
		this.#state.profileSources = exampleData.profileSources.map(s => ({...s, id: crypto.randomUUID()})); // ensure unique ids
		this.#state.manualProfessionalSummary = exampleData.manualProfessionalSummary;
		this.#state.jobInputType = 'text';
		this.#state.jobTargetValue = exampleData.jobDescription;
		this.resetGenerationStatus();
	}

	clearAllData() {
		this.#state.profileSources = [{ id: crypto.randomUUID(), type: 'other', value: '' }];
		this.#state.manualProfessionalSummary = '';
		this.#state.jobInputType = 'text';
		this.#state.jobTargetValue = '';
		this.#state.currentStep = 1;
		this.resetGenerationStatus();
        this.#state.showGenerator = true; // Ensure generator is shown
	}

    resetGenerationStatus() {
        this.#state.errorMessage = '';
		this.#state.isGenerating = false;
		this.#state.showSuccess = false;
		this.#state.generationProgress = 0;
		this.#state.generationStepText = '';
    }

	startGeneration() {
        const stepDef = this.currentStepDefinition;
		if (!stepDef || !stepDef.isValid(this.#state)) {
			this.#state.errorMessage = `Please complete all required fields for ${stepDef?.title || 'the current step'} before generating.`;
			return;
		}
		this.resetGenerationStatus();
		this.#state.isGenerating = true;

		// Simulate AI generation (replace with actual API calls later)
		const simulationSteps = [
            { text: 'Analyzing profile data from sources...', duration: 1000 },
            { text: 'Processing manual professional summary...', duration: 800 },
            { text: `Analyzing job ${this.#state.jobInputType === 'text' ? 'description' : 'URL'}...`, duration: 1000 },
            { text: 'Extracting relevant skills and keywords...', duration: 900 },
            { text: 'Tailoring profile summary for job relevance...', duration: 1200 },
            { text: 'Optimizing project descriptions and achievements...', duration: 1300 },
            { text: 'Finalizing CV structure and content...', duration: 800 }
        ];
		let currentSimulationStepIndex = 0;
        const totalDuration = simulationSteps.reduce((sum, step) => sum + step.duration, 0);
        let elapsedTime = 0;

		const processStep = () => {
			if (currentSimulationStepIndex < simulationSteps.length) {
				const step = simulationSteps[currentSimulationStepIndex];
				this.#state.generationStepText = step.text;

				setTimeout(() => {
                    elapsedTime += step.duration;
                    this.#state.generationProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
					currentSimulationStepIndex++;
					processStep();
				}, step.duration);
			} else {
				setTimeout(() => {
					this.#state.isGenerating = false;
					this.#state.showSuccess = true;
					this.#state.generationStepText = 'CV generated successfully!';
					this.#state.generationProgress = 100;
                    // In a real app, this is where you'd get the CV data and potentially update the main cvDataStore
				}, 500);
			}
		};
		processStep();
	}

    // Call this when user clicks "View Generated CV"
    handleViewGeneratedCv() {
        this.#state.showGenerator = false; // Hide generator, parent page should show CV
        // this.resetGenerationStatus(); // Optionally reset status for next time
    }

    // Call this when user clicks "Generate Another"
    handleGenerateAnother() {
        this.clearAllData(); // Resets everything and ensures showGenerator is true
    }
}

export const aiCvGeneratorStore = new AiCvGeneratorStore();