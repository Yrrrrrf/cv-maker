<script lang="ts">
    import type { ProfileData } from '$lib/types/cv';
    let { data }: { data: ProfileData } = $props();
</script>

<section class="mb-6 print:mb-3">
    <h3 class="text-xl font-bold text-gray-800 border-b-2 border-blue-600 inline-block mb-3 print:text-base print:mb-1.5">PERFIL PROFESIONAL</h3>
    <div class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600 print:p-2 print:border-l-2 print:leading-tight print:text-sm">
        <p>{data.summary}</p>
    </div>
</section>