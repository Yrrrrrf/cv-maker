<script lang="ts">
	import '../app.css';
	import CvGenerator from '$lib/components/ai-gen/CVGenerator.svelte';
	
	import { page } from '$app/state';
	import { locales, localizeHref } from '../paraglide/runtime';

	let { children } = $props();
</script>

<!-- <CvGenerator /> -->

{@render children()}

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
