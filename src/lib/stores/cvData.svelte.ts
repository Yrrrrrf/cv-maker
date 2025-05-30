// src/lib/stores/cvData.svelte.ts
import type { Component } from 'svelte';
import { Linkedin, Github, Mail, Phone, ExternalLink } from '@lucide/svelte';

// Helper for icons if needed, though for CV, direct usage in components might be simpler
export interface IconDetail {
    component: Component;
    className?: string;
}

const createIcon = (component: Component, className: string = 'h-4 w-4'): IconDetail => ({ component, className });

// --- CV Data Types ---

export interface ContactLink {
    href: string;
    text: string;
    icon: IconDetail;
    ariaLabel: string;
    showText?: boolean; // To control if text like "LinkedIn" or just icon is shown
}

export interface HeaderData {
    name: string;
    title: string;
    profileImage: string; // URL to your profile image
    contacts: ContactLink[];
}

export interface ProfileData {
    summary: string;
}

export interface Skill {
    name: string; // e.g., "Rust (Axum, SQLx, Tokio/Hyper)"
}

export interface SkillCategory {
    title: string; // e.g., "Lenguajes de Programación"
    skills: Skill[];
}

export interface SkillsData {
    categories: SkillCategory[];
}

export interface ProjectFeature {
    text: string;
}

export interface SubProject {
    name: string;
    githubUrl?: string;
    description: string;
    features: ProjectFeature[];
}

export interface ProjectEntry {
    title: string;
    githubUrl?: string;
    websiteUrl?: string; // If there's a live version
    description: string;
    features?: ProjectFeature[];
    subProjects?: SubProject[];
}

export interface ProjectsData {
    projects: ProjectEntry[];
}

export interface EducationEntry {
    institution: string;
    degree: string;
    period: string;
}

export interface EducationData {
    entries: EducationEntry[];
}

export interface LanguageEntry {
    language: string;
    level: string; // e.g., "Nativo", "B2"
    proficiencyPercent: number; // For a visual bar, 0-100
}

export interface LanguagesData {
    entries: LanguageEntry[];
}

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
    }
}

// --- Actual CV Data ---
class CvDataStore {
    cv: CVData = $state({
        siteTitle: "CV de Fernando Bryan Reza Campos",
        header: {
            name: "FERNANDO BRYAN REZA CAMPOS",
            title: "Desarrollador Full-Stack | Especialista en Rust y APIs",
            profileImage: "/images/profile-photo.jpg", // Ensure this image is in static/images
            contacts: [
                { href: "mailto:fer.rezac@outlook.com", text: "fer.rezac@outlook.com", icon: createIcon(Mail), ariaLabel: "Email", showText: true },
                { href: "tel:+527226457999", text: "+52 (722) 645 7999", icon: createIcon(Phone), ariaLabel: "Phone", showText: true },
                { href: "https://www.linkedin.com/in/fernando-reza-campos/", text: "LinkedIn", icon: createIcon(Linkedin), ariaLabel: "LinkedIn Profile", showText: false },
                { href: "https://github.com/Yrrrrrf", text: "GitHub", icon: createIcon(Github), ariaLabel: "GitHub Profile", showText: false },
            ]
        },
        profile: {
            summary: "Desarrollador de software especializado en arquitecturas de API de alto rendimiento y microservicios en la nube. Creador del ecosistema Prism para generación automática de APIs desde esquemas de base de datos. Experiencia en Rust, Python y TypeScript, con enfoque en programación asíncrona y despliegue de aplicaciones en entornos cloud con Kubernetes."
        },
        skills: {
            categories: [
                {
                    title: "Lenguajes de Programación",
                    skills: [
                        { name: "Rust (Axum, SQLx, Tokio/Hyper)" },
                        { name: "Python (FastAPI, SQLAlchemy)" },
                        { name: "TypeScript/JavaScript" },
                        { name: "SQL (PostgreSQL, MySQL)" }
                    ]
                },
                {
                    title: "Infraestructura & DevOps",
                    skills: [
                        { name: "Docker & Kubernetes" },
                        { name: "CI/CD pipelines" },
                        { name: "Cloud Platforms (GCP, AWS)" },
                        { name: "Git & Control de Versiones" }
                    ]
                },
                {
                    title: "Arquitectura & Diseño",
                    skills: [
                        { name: "Microservicios" },
                        { name: "APIs RESTful" },
                        { name: "Arquitecturas Tipo-Seguras" },
                        { name: "Procesamiento Asíncrono" }
                    ]
                }
            ]
        },
        projects: {
            projects: [
                {
                    title: "Ecosistema Prism",
                    description: "Generación automática de APIs desde esquemas de base de datos y cliente tipo-seguro.",
                    subProjects: [
                        {
                            name: "prismatic (Rust)",
                            githubUrl: "https://github.com/Yrrrrrf/prismatic",
                            description: "API REST con Axum y SQLx, enfoque en rendimiento.",
                            features: [
                                { text: "Arquitectura para deployments en contenedores." },
                                { text: "Implementación de prism-py en Rust para aumentar seguridad y velocidad." }
                            ]
                        },
                        {
                            name: "prism-py (Python)",
                            githubUrl: "https://github.com/Yrrrrrf/prism-py",
                            description: "FastAPI para generar APIs desde esquemas DB.",
                            features: [
                                { text: "Sistema de tipos para seguridad en runtime." },
                                { text: "Generación automática de rutas." }
                            ]
                        },
                        {
                            name: "prism-ts (TypeScript)",
                            githubUrl: "https://github.com/Yrrrrrf/prism-ts",
                            description: "Cliente tipo-seguro para APIs.",
                            features: [ { text: "Generación automática de tipos." } ]
                        }
                    ]
                },
                {
                    title: "Sonar",
                    githubUrl: "https://github.com/Yrrrrrf/sonar",
                    description: "Protocolo de transferencia de datos basado en audio (Rust).",
                    features: [
                        { text: "Procesamiento de señales en tiempo real." },
                        { text: "Codificación bit a bit y manejo de errores con CRC." }
                    ]
                },
                {
                    title: "General Web App (GWA)",
                    githubUrl: "https://github.com/Yrrrrrf/gwa",
                    description: "Plantilla full-stack para desarrollo rápido.",
                    features: [
                        { text: "Integración del ecosistema Prism." },
                        { text: "Implementación con Deno, SvelteKit y PostgreSQL." }
                    ]
                }
            ]
        },
        education: {
            entries: [
                { institution: "Universidad Autónoma del Estado de México", degree: "Ingeniería en Computación", period: "2021 - Presente" },
                { institution: "ESIME Culhuacán", degree: "Ingeniería Mecánica", period: "2017 - 2020" },
                { institution: "CECyT 4 Lazaro Cardenas", degree: "Técnico en Instalaciones Eléctricas", period: "2014 - 2017" }
            ]
        },
        languages: {
            entries: [
                { language: "Español", level: "Nativo", proficiencyPercent: 100 },
                { language: "Inglés", level: "B2", proficiencyPercent: 75 }
            ]
        },
        footer: {
            referencesText: "Referencias disponibles a solicitud",
            copyrightName: "Fernando Bryan Reza Campos"
        }
    });
}

export const cvDataStore = new CvDataStore();