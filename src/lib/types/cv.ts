// src/lib/types/cv.ts

// --- Imports ---
import type { Component } from "svelte";

// --- Helper Functions ---

/**
 * Creates an IconDetail object for consistent icon usage across components.
 * @param component The Svelte component for the icon (e.g., Mail, Github).
 * @param className Optional CSS classes to apply to the icon (e.g., 'w-4 h-4 text-blue-500').
 * @returns An IconDetail object.
 */
export const createIcon = (
	component: Component,
	className: string = "h-4 w-4",
): IconDetail => ({ component, className });

// --- Type Definitions for CV Data Structure ---

/** Defines the structure for an icon, including its Svelte component and optional CSS classes. */
export interface IconDetail {
	component: Component;
	className?: string;
}

/** Represents a contact link in the header (email, phone, social media). */
export interface ContactLink {
	href: string;
	text: string;
	icon: IconDetail;
	ariaLabel: string;
	showText?: boolean;
}

/** Defines the data structure for the CV header section. */
export interface HeaderData {
	name: string;
	title: string;
	profileImage: string;
	contacts: ContactLink[];
}

/** Defines the data structure for the professional profile/summary section. */
export interface ProfileData {
	summary: string;
}

/** Represents a single skill item within a skill category. */
export interface Skill {
	name: string;
}

/** Defines a category of skills (e.g., "Programming Languages", "DevOps"). */
export interface SkillCategory {
	title: string;
	skills: Skill[];
}

/** Defines the data structure for the skills section. */
export interface SkillsData {
	categories: SkillCategory[];
}

/** Represents a single feature or bullet point within a project description. */
export interface ProjectFeature {
	text: string;
}

/** Represents a sub-project or a specific component within a larger project. */
export interface SubProject {
	name: string;
	githubUrl?: string;
	description: string;
	features: ProjectFeature[];
}

/** Defines a single project entry in the projects section. */
export interface ProjectEntry {
	title: string;
	githubUrl?: string;
	websiteUrl?: string;
	description: string;
	features?: ProjectFeature[];
	subProjects?: SubProject[];
}

/** Defines the data structure for the projects section. */
export interface ProjectsData {
	projects: ProjectEntry[];
}

/** Defines a single education entry (degree, institution, period). */
export interface EducationEntry {
	institution: string;
	degree: string;
	period: string;
}

/** Defines the data structure for the education section. */
export interface EducationData {
	entries: EducationEntry[];
}

/** Defines a single language entry (language, proficiency level, progress). */
export interface LanguageEntry {
	language: string;
	level: string;
	proficiencyPercent: number;
}

/** Defines the data structure for the languages section. */
export interface LanguagesData {
	entries: LanguageEntry[];
}

/** The overall structure for all CV data. */
export interface CVData {
	siteTitle: string;
	header: HeaderData;
	profile: ProfileData;
	skills: SkillsData;
	projects: ProjectsData;
	education: EducationData;
	languages: LanguagesData;
	footer: {
		referencesText: string;
		copyrightName: string;
	};
}
