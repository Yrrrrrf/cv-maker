<script lang="ts">
	import { cvDataStore } from '$lib/stores/cvData.svelte';
	import Header from '$lib/components/Header.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Education from '$lib/components/Education.svelte';
	import Languages from '$lib/components/Languages.svelte';
    import { onMount } from 'svelte';

    const cv = cvDataStore.cv;
    const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

    onMount(() => {
        // Optional: if you need to do anything on mount, like for print styles
        const handleBeforePrint = () => {
            document.documentElement.classList.add("print-color-exact");
        };
        const handleAfterPrint = () => {
            document.documentElement.classList.remove("print-color-exact");
        };

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    });

    import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

</script>

<LanguageSwitcher />

<svelte:head>
	<title>{cv.siteTitle}</title>
    <style lang="postcss">
      @media print {
        body {
          margin: 0;
          padding: 0;
          font-size: 8pt; /* Slightly larger base print font */
          line-height: 1.2; /* Standard line height */
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          background-color: white !important;
        }
        .cv-container {
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          overflow: visible !important;
        }

        /* Global print padding/margin reductions - MODERATE */
        .print\:p-3 { padding: 0.6rem !important; }
        .print\:p-2 { padding: 0.4rem !important; }
        .print\:p-1\.5 { padding: 0.3rem !important; }


        .print\:mb-3 { margin-bottom: 0.6rem !important; }
        .print\:mb-1\.5 { margin-bottom: 0.3rem !important; }
        .print\:mb-1 { margin-bottom: 0.2rem !important; }
        .print\:mb-0\.5 { margin-bottom: 0.1rem !important; }

        /* Font size adjustments - MODERATE */
        .print\:text-xl { font-size: 1.1rem !important; line-height: 1.3rem !important;}   /* Header Name - slightly larger */
        .print\:text-lg { font-size: 1rem !important; line-height: 1.2rem !important;}     /* Section Title */
        .print\:text-base { font-size: 0.9rem !important; line-height: 1.1rem !important;}   /* Header Title */
        .print\:text-sm { font-size: 0.8rem !important; line-height: 1rem !important;}     /* Main text, Project titles */
        .print\:text-xs { font-size: 0.7rem !important; line-height: 0.9rem !important;}    /* Descriptions, list items */
        .print\:text-\[8pt\] { font-size: 8pt !important; line-height: 10pt !important; }   /* Contact Text */


        .print\:font-bold { font-weight: 700 !important; }
        .print\:font-semibold { font-weight: 600 !important; }
        .print\:font-normal { font-weight: 400 !important; }


        .print\:leading-tight { line-height: 1.2 !important; }
        .print\:border-b-2 { border-bottom-width: 1.5px !important;}
        .print\:border-l-2 { border-left-width: 1.5px !important; }
        .print\:border-blue-600 { border-color: #2563EB !important; }
        .print\:border-gray-300 { border-color: #D1D5DB !important;}


        .print\:shadow-none { box-shadow: none !important; }
        .print\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .print\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .print\:gap-2 { gap: 0.4rem !important; }
        .print\:space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.6rem; margin-bottom: 0; }
        .print\:space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.3rem; margin-bottom: 0; }
        .print\:space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.15rem; margin-bottom: 0;}
        .print\:space-y-0\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.075rem; margin-bottom: 0;}


        .print\:hidden { display: none !important; }
        .print-only { display: inline !important; }

        .cv-footer {
            padding: 0.3rem 0.75rem !important; /* Slightly more padding for footer */
            font-size: 7pt !important; /* Keep footer font small */
            color: #4B5563 !important;
            border-top: 1px solid #D1D5DB !important;
            position: fixed !important;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100% !important;
            background-color: white !important;
            z-index: 100;
            box-sizing: border-box;
            height: auto;
        }
        .cv-main-content-area {
            padding-bottom: 2.5rem !important; /* Adjust if footer height changes */
        }

        section, .cv-project-item-wrapper {
            page-break-inside: avoid !important;
        }
        h3, h4 {
             page-break-after: avoid !important;
        }
        ul, p {
            page-break-inside: avoid !important;
        }

        @page {
          size: A4 portrait;
          margin: 0.8cm; /* Slightly more generous A4 margins */
        }
      }
      .print-color-exact {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    </style>
</svelte:head>


<div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none cv-container">
    <Header data={cv.header} />

    <div class="p-6 md:p-8 print:p-3 cv-main-content-area">
        <Profile data={cv.profile} />
        <Skills data={cv.skills} />
        <Projects data={cv.projects} />
        <Education data={cv.education} />
        <Languages data={cv.languages} />
    </div>
    <footer class="text-center text-gray-500 text-xs italic my-8 pt-4 border-t border-gray-200 print:my-0 print:pt-2 cv-footer">
        <span>{cv.footer.referencesText}</span>
        <span>CV de {cv.footer.copyrightName} | {currentDate}</span>
    </footer>
</div>