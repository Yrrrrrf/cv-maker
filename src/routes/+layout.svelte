<script lang="ts">
	import '../app.css';
    import CvGenerator from '$lib/components/ai-gen/CVGenerator.svelte';

	
	let { children } = $props();
</script>

<!-- <CvGenerator /> -->

{@render children()}
