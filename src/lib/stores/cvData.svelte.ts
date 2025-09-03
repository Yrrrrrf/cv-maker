// src/lib/stores/cvData.svelte.ts
// This file creates and exports the reactive Svelte store.
// It imports the data structure (types) and the content, then combines them.

// import { cvContent } from "../data/cv.content";
// import { cvContent } from "../data/cv.web";
import { cvContent } from "../data/cv.daimler";
import type { CVData } from "../types/cv";

// import { setLocale } from '../../paraglide/runtime.js';

// // changing this will change the language of the message!
// setLocale("de"); // set the default language!





class CvDataStore {
	/**
	 * The main reactive state object for the CV.
	 * All Svelte components should read from this property.
	 */
	cv: CVData = $state(cvContent);
}

// Export a singleton instance of the store for use across your Svelte application.
export const cvDataStore = new CvDataStore();
