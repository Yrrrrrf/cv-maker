// src/lib/stores/cvData.svelte.ts

// --- Imports ---
// Component is needed for Svelte's dynamic components, especially for icons.
import type { Component } from 'svelte';

// Lucide Svelte provides a wide range of icons.
// Import only the icons you plan to use to keep your bundle size small.
import {
    Linkedin, // LinkedIn icon
    Github,   // GitHub icon
    Mail,     // Email icon
    Phone,    // Phone icon
    ExternalLink // General external link icon (optional for projects)
    // Add more Lucide icons as needed, e.g., GraduationCap, Code, Briefcase, etc.
} from '@lucide/svelte';

// --- Helper Functions ---

/**
 * Creates an IconDetail object for consistent icon usage across components.
 * @param component The Svelte component for the icon (e.g., Mail, Github).
 * @param className Optional CSS classes to apply to the icon (e.g., 'w-4 h-4 text-blue-500').
 * @returns An IconDetail object.
 */
const createIcon = (component: Component, className: string = 'h-4 w-4'): IconDetail => ({ component, className });

// --- Type Definitions for CV Data Structure ---
// These interfaces ensure type-safety and provide a clear structure for your CV data.
// Do not modify these unless you are changing the fundamental structure of your CV sections.

/** Defines the structure for an icon, including its Svelte component and optional CSS classes. */
export interface IconDetail {
    component: Component;
    className?: string;
}

/** Represents a contact link in the header (email, phone, social media). */
export interface ContactLink {
    href: string; // The URL or contact method (e.g., "mailto:email", "tel:+123")
    text: string; // The display text for the link (e.g., "your.email@example.com")
    icon: IconDetail; // The icon associated with the link
    ariaLabel: string; // Accessibility label for the link
    showText?: boolean; // Optional: true to always show text, false to hide on web (show only icon)
}

/** Defines the data structure for the CV header section. */
export interface HeaderData {
    name: string; // Your full name
    title: string; // Your main professional title/specialization
    profileImage: string; // Path to your profile image (e.g., "/images/profile-photo.jpeg")
    contacts: ContactLink[]; // Array of your contact links
}

/** Defines the data structure for the professional profile/summary section. */
export interface ProfileData {
    summary: string; // Your professional summary paragraph
}

/** Represents a single skill item within a skill category. */
export interface Skill {
    name: string; // Name of the skill (e.g., "Rust (Axum, SQLx, Tokio/Hyper)")
}

/** Defines a category of skills (e.g., "Programming Languages", "DevOps"). */
export interface SkillCategory {
    title: string; // Title of the skill category
    skills: Skill[]; // Array of skills within this category
}

/** Defines the data structure for the skills section. */
export interface SkillsData {
    categories: SkillCategory[]; // Array of skill categories
}

/** Represents a single feature or bullet point within a project description. */
export interface ProjectFeature {
    text: string; // The description text for the feature
}

/** Represents a sub-project or a specific component within a larger project. */
export interface SubProject {
    name: string; // Name of the sub-project
    githubUrl?: string; // Optional: GitHub URL for the sub-project
    description: string; // Short description of the sub-project
    features: ProjectFeature[]; // Key features/contributions of the sub-project
}

/** Defines a single project entry in the projects section. */
export interface ProjectEntry {
    title: string; // Main title of the project
    githubUrl?: string; // Optional: GitHub URL for the main project
    websiteUrl?: string; // Optional: Live demo or project website URL
    description: string; // Overview description of the project
    features?: ProjectFeature[]; // Key features/contributions of the main project
    subProjects?: SubProject[]; // Optional: Array of related sub-projects
}

/** Defines the data structure for the projects section. */
export interface ProjectsData {
    projects: ProjectEntry[]; // Array of your highlighted projects
}

/** Defines a single education entry (degree, institution, period). */
export interface EducationEntry {
    institution: string; // Name of the institution
    degree: string; // Your degree or program
    period: string; // The period of study (e.g., "2021 - Present")
}

/** Defines the data structure for the education section. */
export interface EducationData {
    entries: EducationEntry[]; // Array of your education entries
}

/** Defines a single language entry (language, proficiency level, progress). */
export interface LanguageEntry {
    language: string; // Name of the language (e.g., "Spanish")
    level: string; // Proficiency level (e.g., "Native", "B2", "Fluent")
    proficiencyPercent: number; // Percentage for a visual progress bar (0-100)
}

/** Defines the data structure for the languages section. */
export interface LanguagesData {
    entries: LanguageEntry[]; // Array of language entries
}

/** The overall structure for all CV data. */
export interface CVData {
    siteTitle: string; // Title for the browser tab (HTML <title> tag)
    header: HeaderData;
    profile: ProfileData;
    skills: SkillsData;
    projects: ProjectsData;
    education: EducationData;
    languages: LanguagesData;
    footer: {
        referencesText: string; // Text about references (e.g., "References available upon request")
        copyrightName: string; // Your name for copyright/document ownership
    }
}

// --- Main CV Data Store ---
// This is where you will input all your personal CV information.
// Modify the 'cv' object below with your details.

class CvDataStore {
    cv: CVData = $state({
        // --- General Website Title ---
        siteTitle: "Your Name - Curriculum Vitae", // Appears in browser tab

        // --- Header Section Data ---
        header: {
            name: "YOUR FULL NAME", // Your full name, often in uppercase
            title: "Your Professional Title | Your Specialty", // E.g., "Software Engineer | Full-Stack Developer"
            profileImage: "/images/generic-male.jpeg", // Path to your profile image (ensure it exists in 'static/images/')
            contacts: [
                {
                    href: "mailto:your.email@example.com",
                    text: "your.email@example.com",
                    icon: createIcon(Mail),
                    ariaLabel: "Email Address",
                    showText: true // Set to true to show the email text beside the icon
                },
                {
                    href: "tel:+1234567890",
                    text: "+1 (234) 567 890",
                    icon: createIcon(Phone),
                    ariaLabel: "Phone Number",
                    showText: true // Set to true to show the phone number text beside the icon
                },
                {
                    href: "https://www.linkedin.com/in/yourprofile/",
                    text: "LinkedIn",
                    icon: createIcon(Linkedin),
                    ariaLabel: "LinkedIn Profile",
                    showText: false // Set to false to hide text on web, show only icon (text appears on print)
                },
                {
                    href: "https://github.com/yourusername",
                    text: "GitHub",
                    icon: createIcon(Github),
                    ariaLabel: "GitHub Profile",
                    showText: false // Set to false to hide text on web, show only icon (text appears on print)
                },
                // Add more contact links as needed
                // { href: "https://yourwebsite.com", text: "Portfolio", icon: createIcon(ExternalLink), ariaLabel: "Personal Portfolio", showText: false }
            ]
        },

        // --- Professional Profile Section Data ---
        profile: {
            summary: "A concise summary of your professional background, key skills, and career aspirations. Highlight your expertise and what makes you a valuable candidate. This text should be 3-5 sentences long."
        },

        // --- Technical Skills Section Data ---
        skills: {
            categories: [
                {
                    title: "Programming Languages",
                    skills: [
                        { name: "Language 1 (Frameworks, Libraries)" },
                        { name: "Language 2 (Frameworks, Libraries)" },
                        { name: "Language 3" },
                        { name: "Database Language (e.g., SQL)" }
                    ]
                },
                {
                    title: "Infrastructure & DevOps",
                    skills: [
                        { name: "Containerization (Docker, Kubernetes)" },
                        { name: "CI/CD Platforms (e.g., GitHub Actions, Jenkins)" },
                        { name: "Cloud Platforms (e.g., AWS, GCP, Azure)" },
                        { name: "Version Control (Git)" }
                    ]
                },
                {
                    title: "Architecture & Design",
                    skills: [
                        { name: "Microservices" },
                        { name: "RESTful APIs" },
                        { name: "Type-Safe Architectures" },
                        { name: "Asynchronous Processing" }
                    ]
                },
                // Add more skill categories as relevant (e.g., "Frontend Frameworks", "Backend Frameworks", "Tools")
            ]
        },

        // --- Featured Projects Section Data ---
        projects: {
            projects: [
                {
                    title: "Example Project 1: Dynamic Data Platform",
                    githubUrl: "https://github.com/yourusername/example-project-1", // Optional
                    websiteUrl: "https://example-project-1-live.com", // Optional
                    description: "A brief description of this project's purpose and impact. This could be a web app, a system, or a significant contribution.",
                    features: [
                        { text: "Developed feature X using Technology A, leading to result Y." },
                        { text: "Implemented functionality B with Framework C, improving D." },
                        { text: "Contributed to Z, showcasing skill M and N." }
                    ],
                    subProjects: [ // Use subProjects for larger ecosystems or related components
                        {
                            name: "Sub-project Alpha",
                            githubUrl: "https://github.com/yourusername/sub-project-alpha",
                            description: "Focus on a specific component or aspect of the main project.",
                            features: [
                                { text: "Designed and built component ABC for data processing." },
                                { text: "Optimized performance of module XYZ by P%." }
                            ]
                        },
                        // Add more sub-projects as needed
                    ]
                },
                {
                    title: "Example Project 2: Mobile Utility App",
                    githubUrl: "https://github.com/yourusername/example-project-2",
                    description: "This project demonstrates your skills in a different domain, perhaps mobile development or a specific algorithm.",
                    features: [
                        { text: "Applied advanced algorithm for real-time data analysis." },
                        { text: "Created a user-friendly interface with modern UI/UX principles." },
                        { text: "Managed end-to-end development cycle from concept to deployment." }
                    ]
                },
                // Add more projects to showcase your diverse experience.
                // If a project doesn't have a sub-project, just use the 'features' array directly.
            ]
        },

        // --- Education Section Data ---
        education: {
            entries: [
                {
                    institution: "University Name, City",
                    degree: "Your Degree | Major",
                    period: "Start Year - End Year (or Present)"
                },
                {
                    institution: "Another Institution (e.g., College, Technical School)",
                    degree: "Your Diploma/Certificate | Field of Study",
                    period: "Start Year - End Year"
                },
                // Add more education entries chronologically
            ]
        },

        // --- Languages Section Data ---
        languages: {
            entries: [
                {
                    language: "Your Native Language",
                    level: "Native", // Or "Fluent", "Conversational"
                    proficiencyPercent: 100 // 0-100 for the progress bar
                },
                {
                    language: "Another Language (e.g., English)",
                    level: "Proficiency Level (e.g., B2, Advanced)",
                    proficiencyPercent: 75 // Adjust based on your actual proficiency
                },
                // Add more languages as relevant
            ]
        },

        // --- Footer Section Data ---
        footer: {
            referencesText: "References available upon request", // Standard CV closing text
            copyrightName: "Your Full Name" // Name for copyright/document ownership in the footer
        }
    });
}

// Export a singleton instance of the store for use in your Svelte components.
export const cvDataStore = new CvDataStore();