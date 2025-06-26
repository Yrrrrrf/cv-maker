// src/lib/data/cv.content.ts
// This is the single source of truth for your CV content.
// Edit the `cvContent` object below to update your CV.

import { Github, Linkedin, Mail, Phone } from "@lucide/svelte";
import { createIcon, type CVData } from "../types/cv";

export const cvContent: CVData = {
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
				showText: true, // Set to true to show the email text beside the icon
			},
			{
				href: "tel:+1234567890",
				text: "+1 (234) 567 890",
				icon: createIcon(Phone),
				ariaLabel: "Phone Number",
				showText: true, // Set to true to show the phone number text beside the icon
			},
			{
				href: "https://www.linkedin.com/in/yourprofile/",
				text: "LinkedIn",
				icon: createIcon(Linkedin),
				ariaLabel: "LinkedIn Profile",
				showText: false, // Set to false to hide text on web, show only icon (text appears on print)
			},
			{
				href: "https://github.com/yourusername",
				text: "GitHub",
				icon: createIcon(Github),
				ariaLabel: "GitHub Profile",
				showText: false, // Set to false to hide text on web, show only icon (text appears on print)
			},
			// Add more contact links as needed
			// { href: "https://yourwebsite.com", text: "Portfolio", icon: createIcon(ExternalLink), ariaLabel: "Personal Portfolio", showText: false }
		],
	},

	// --- Professional Profile Section Data ---
	profile: {
		summary:
			"A concise summary of your professional background, key skills, and career aspirations. Highlight your expertise and what makes you a valuable candidate. This text should be 3-5 sentences long.",
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
					{ name: "Database Language (e.g., SQL)" },
				],
			},
			{
				title: "Infrastructure & DevOps",
				skills: [
					{ name: "Containerization (Docker, Kubernetes)" },
					{ name: "CI/CD Platforms (e.g., GitHub Actions, Jenkins)" },
					{ name: "Cloud Platforms (e.g., AWS, GCP, Azure)" },
					{ name: "Version Control (Git)" },
				],
			},
			{
				title: "Architecture & Design",
				skills: [
					{ name: "Microservices" },
					{ name: "RESTful APIs" },
					{ name: "Type-Safe Architectures" },
					{ name: "Asynchronous Processing" },
				],
			},
			// Add more skill categories as relevant (e.g., "Frontend Frameworks", "Backend Frameworks", "Tools")
		],
	},

	// --- Featured Projects Section Data ---
	projects: {
		projects: [
			{
				title: "Example Project 1: Dynamic Data Platform",
				githubUrl: "https://github.com/yourusername/example-project-1", // Optional
				websiteUrl: "https://example-project-1-live.com", // Optional
				description:
					"A brief description of this project's purpose and impact. This could be a web app, a system, or a significant contribution.",
				features: [
					{ text: "Developed feature X using Technology A, leading to result Y." },
					{ text: "Implemented functionality B with Framework C, improving D." },
					{ text: "Contributed to Z, showcasing skill M and N." },
				],
				subProjects: [ // Use subProjects for larger ecosystems or related components
					{
						name: "Sub-project Alpha",
						githubUrl: "https://github.com/yourusername/sub-project-alpha",
						description:
							"Focus on a specific component or aspect of the main project.",
						features: [
							{ text: "Designed and built component ABC for data processing." },
							{ text: "Optimized performance of module XYZ by P%." },
						],
					},
					// Add more sub-projects as needed
				],
			},
			{
				title: "Example Project 2: Mobile Utility App",
				githubUrl: "https://github.com/yourusername/example-project-2",
				description:
					"This project demonstrates your skills in a different domain, perhaps mobile development or a specific algorithm.",
				features: [
					{ text: "Applied advanced algorithm for real-time data analysis." },
					{ text: "Created a user-friendly interface with modern UI/UX principles." },
					{
						text:
							"Managed end-to-end development cycle from concept to deployment.",
					},
				],
			},
			// Add more projects to showcase your diverse experience.
			// If a project doesn't have a sub-project, just use the 'features' array directly.
		],
	},

	// --- Education Section Data ---
	education: {
		entries: [
			{
				institution: "University Name, City",
				degree: "Your Degree | Major",
				period: "Start Year - End Year (or Present)",
			},
			{
				institution: "Another Institution (e.g., College, Technical School)",
				degree: "Your Diploma/Certificate | Field of Study",
				period: "Start Year - End Year",
			},
			// Add more education entries chronologically
		],
	},

	// --- Languages Section Data ---
	languages: {
		entries: [
			{
				language: "Your Native Language",
				level: "Native", // Or "Fluent", "Conversational"
				proficiencyPercent: 100, // 0-100 for the progress bar
			},
			{
				language: "Another Language (e.g., English)",
				level: "Proficiency Level (e.g., B2, Advanced)",
				proficiencyPercent: 75, // Adjust based on your actual proficiency
			},
			// Add more languages as relevant
		],
	},

	// --- Footer Section Data ---
	footer: {
		referencesText: "References available upon request", // Standard CV closing text
		copyrightName: "Your Full Name", // Name for copyright/document ownership in the footer
	},
};
