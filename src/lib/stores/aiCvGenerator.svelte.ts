// src/lib/stores/aiCvGeneratorStore.svelte.ts
import type { Component } from "svelte";
import { Briefcase, Github, Link as LinkIcon, Linkedin, User } from "@lucide/svelte";

// --- Type Definitions ---
export type ProfileSourceType = string; // This will be 'github', 'linkedin', 'other', etc.

export type ProfileSource = {
	id: string;
	type: ProfileSourceType;
	value: string;
};

export type JobInputType = "url" | "text";

// --- Profile Options Definition (Source of Truth) ---
export interface ProfileOptionConfig {
	type: ProfileSourceType; // The unique identifier for this profile type (e.g., 'github', 'linkedin', 'other')
	name: string; // User-friendly name for the dropdown (e.g., "GitHub", "LinkedIn", "Other URL")
	icon: Component; // Icon for the input field
	placeholder: string; // Placeholder text for the input
}

// This list defines all available profile source types.
// The 'other' type is implicitly treated as non-unique by the component logic.
export const profileOptionsList: ProfileOptionConfig[] = [
	{
		type: "github",
		name: "GitHub",
		icon: Github,
		placeholder: "e.g., octocat or full URL",
	},
	{
		type: "linkedin",
		name: "LinkedIn",
		icon: Linkedin,
		placeholder: "e.g., your-linkedin-profile-url",
	},
	{
		type: "other",
		name: "Other URL",
		icon: LinkIcon,
		placeholder: "https://example.com/portfolio",
	},
	// To add a new profile type (e.g., 'twitter'), just add an entry here.
	// If it's not 'other', it will be treated as unique by ProfileSources.svelte.
];

// Define the structure for each step in the generator
export interface StepDefinition {
	id: number;
	title: string;
	icon: Component;
	isValid: (state: AiCvGeneratorState) => boolean;
}

export interface AiCvGeneratorState {
	currentStep: number;
	profileSources: ProfileSource[];
	manualProfessionalSummary: string;
	jobInputType: JobInputType;
	jobTargetValue: string;
	isGenerating: boolean;
	generationStepText: string;
	generationProgress: number;
	showSuccess: boolean;
	errorMessage: string;
	showGenerator: boolean;
}

const exampleData = {
	profileSources: [
		{ id: crypto.randomUUID(), type: "github", value: "yrrrrrf" }, // Matches profileOptionsList[0].type
		{
			id: crypto.randomUUID(),
			type: "linkedin",
			value: "https://www.linkedin.com/in/fernando-reza-campos/",
		}, // Matches profileOptionsList[1].type
		{ id: crypto.randomUUID(), type: "other", value: "https://yrrrrrf.com" }, // Matches profileOptionsList[2].type
	],
	manualProfessionalSummary:
		`Highly motivated Senior Software Engineer with 7+ years of experience in building scalable web applications. Proven ability to lead cross-functional teams, implement robust backend services using Node.js and Rust, and deliver intuitive user interfaces with Svelte and React. Passionate about cloud-native solutions (AWS, GCP) and improving developer workflows through CI/CD best practices. Seeking to leverage deep technical expertise and leadership skills to drive impactful projects at a forward-thinking tech company.`,
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
	jobUrl: "https://careers.example.com/job/senior-fullstack-dev-12345",
};

class AiCvGeneratorStore {
	#state = $state<AiCvGeneratorState>({
		currentStep: 1,
		profileSources: [{
			id: crypto.randomUUID(),
			type: profileOptionsList[0]?.type || "other",
			value: "",
		}],
		manualProfessionalSummary: "",
		jobInputType: "text",
		jobTargetValue: "",
		isGenerating: false,
		generationStepText: "",
		generationProgress: 0,
		showSuccess: false,
		errorMessage: "",
		showGenerator: true,
	});

	steps: StepDefinition[] = [
		{
			id: 1,
			title: "Profile Data",
			icon: User,
			isValid: (state) => {
				const hasValidSource = state.profileSources.some((s) => s.value.trim() !== "");
				const hasManualSummary = state.manualProfessionalSummary.trim() !== "";
				return hasValidSource || hasManualSummary;
			},
		},
		{
			id: 2,
			title: "Target Job",
			icon: Briefcase,
			isValid: (state) => state.jobTargetValue.trim() !== "",
		},
	];

	get state() {
		return this.#state;
	}

	get totalSteps() {
		return this.steps.length;
	}

	get currentStepDefinition() {
		if (
			this.#state.currentStep > 0 &&
			this.#state.currentStep <= this.steps.length
		) {
			return this.steps[this.#state.currentStep - 1];
		}
		return undefined;
	}

	get isNextButtonDisabled() {
		const stepDef = this.currentStepDefinition;
		if (!stepDef) return true;
		return !stepDef.isValid(this.#state);
	}

	nextStep() {
		const stepDef = this.currentStepDefinition;
		if (!stepDef || !stepDef.isValid(this.#state)) {
			this.#state.errorMessage = `Please complete all required fields for ${
				stepDef?.title || "the current step"
			} before proceeding.`;
			return;
		}
		this.#state.errorMessage = "";
		if (this.#state.currentStep < this.totalSteps) {
			this.#state.currentStep++;
		}
	}

	prevStep() {
		if (this.#state.currentStep > 1) {
			this.#state.currentStep--;
			this.#state.errorMessage = "";
		}
	}

	addProfileSource() {
		// Add a new source, defaulting to 'other' as it's always allowed.
		// Or, could default to the first non-unique type if more were added.
		this.#state.profileSources = [...this.#state.profileSources, {
			id: crypto.randomUUID(),
			type: "other",
			value: "",
		}];
	}

	removeProfileSource(idToRemove: string) {
		this.#state.profileSources = this.#state.profileSources.filter((source) =>
			source.id !== idToRemove
		);
	}

	updateProfileSource(
		idToUpdate: string,
		newType?: ProfileSourceType,
		newValue?: string,
	) {
		this.#state.profileSources = this.#state.profileSources.map((source) => {
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

	updateJobInputType(type: JobInputType) {
		this.#state.jobInputType = type;
		this.#state.jobTargetValue = "";
	}

	updateJobTargetValue(value: string) {
		this.#state.jobTargetValue = value;
	}

	fillExampleData() {
		this.#state.profileSources = exampleData.profileSources.map((s) => ({
			...s,
			id: crypto.randomUUID(),
		}));
		this.#state.manualProfessionalSummary = exampleData.manualProfessionalSummary;
		this.#state.jobInputType = "text";
		this.#state.jobTargetValue = exampleData.jobDescription;
		this.resetGenerationStatus();
	}

	clearAllData() {
		// When clearing, set to one 'other' type source, as it's always non-unique
		this.#state.profileSources = [{
			id: crypto.randomUUID(),
			type: "other",
			value: "",
		}];
		this.#state.manualProfessionalSummary = "";
		this.#state.jobInputType = "text";
		this.#state.jobTargetValue = "";
		this.#state.currentStep = 1;
		this.resetGenerationStatus();
		this.#state.showGenerator = true;
	}

	resetGenerationStatus() {
		this.#state.errorMessage = "";
		this.#state.isGenerating = false;
		this.#state.showSuccess = false;
		this.#state.generationProgress = 0;
		this.#state.generationStepText = "";
	}

	startGeneration() {
		const stepDef = this.currentStepDefinition;
		if (!stepDef || !stepDef.isValid(this.#state)) {
			this.#state.errorMessage = `Please complete all required fields for ${
				stepDef?.title || "the current step"
			} before generating.`;
			return;
		}
		this.resetGenerationStatus();
		this.#state.isGenerating = true;

		const simulationSteps = [
			{ text: "Analyzing profile data from sources...", duration: 1000 },
			{ text: "Processing manual professional summary...", duration: 800 },
			{
				text: `Analyzing job ${
					this.#state.jobInputType === "text" ? "description" : "URL"
				}...`,
				duration: 1000,
			},
			{ text: "Extracting relevant skills and keywords...", duration: 900 },
			{
				text: "Tailoring profile summary for job relevance...",
				duration: 1200,
			},
			{
				text: "Optimizing project descriptions and achievements...",
				duration: 1300,
			},
			{ text: "Finalizing CV structure and content...", duration: 800 },
		];
		let currentSimulationStepIndex = 0;
		const totalDuration = simulationSteps.reduce(
			(sum, step) => sum + step.duration,
			0,
		);
		let elapsedTime = 0;

		const processStep = () => {
			if (currentSimulationStepIndex < simulationSteps.length) {
				const step = simulationSteps[currentSimulationStepIndex];
				this.#state.generationStepText = step.text;
				setTimeout(() => {
					elapsedTime += step.duration;
					this.#state.generationProgress = Math.min(
						(elapsedTime / totalDuration) * 100,
						100,
					);
					currentSimulationStepIndex++;
					processStep();
				}, step.duration);
			} else {
				setTimeout(() => {
					this.#state.isGenerating = false;
					this.#state.showSuccess = true;
					this.#state.generationStepText = "CV generated successfully!";
					this.#state.generationProgress = 100;
				}, 500);
			}
		};
		processStep();
	}

	handleViewGeneratedCv() {
		this.#state.showGenerator = false;
	}

	handleGenerateAnother() {
		this.clearAllData();
	}
}

export const aiCvGeneratorStore = new AiCvGeneratorStore();
