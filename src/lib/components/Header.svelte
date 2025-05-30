<script lang="ts">
    import type { HeaderData, ContactLink } from '$lib/stores/cvData.svelte.ts';
    // Fallback icon, not directly used if data provides icons
    // import { Image as ImageIcon } from 'lucide-svelte';

    let { data }: { data: HeaderData } = $props();

    function getIconComponent(contact: ContactLink) {
        return contact.icon.component;
    }
</script>

<header class="bg-gray-800 text-white p-6 md:p-8 relative flex items-start gap-4 md:gap-6 print:p-3 print:gap-3">
    {#if data.profileImage}
    <div class="flex-shrink-0 mb-4 md:mb-0 print:mb-0 print:w-[70px] print:h-[70px]">
        <img
            src={data.profileImage}
            alt={data.name}
            class="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-2 border-blue-400 shadow-md print:w-full print:h-full print:rounded-md print:border-gray-300 print:shadow-none"
        />
    </div>
    {/if}
    <div class="flex-grow print:pl-2">
        <h1 class="text-2xl md:text-3xl font-bold mb-1 print:text-lg print:font-bold uppercase">{data.name}</h1>
        <h2 class="text-lg md:text-xl text-gray-300 mb-4 print:text-sm print:mb-1 print:font-normal">{data.title}</h2>
        <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm print:gap-x-2 print:gap-y-0.5 print:text-[8pt]">
            {#each data.contacts as contact (contact.href)}
                {@const IconComponent = getIconComponent(contact)}
                <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contact.ariaLabel}
                    class="flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors print:text-blue-500 print:font-normal print:gap-0.5 print:underline print:decoration-blue-500"
                >
                    <IconComponent class="{contact.icon.className || 'w-3 h-3 print:w-2.5 print:h-2.5'} print:text-blue-500" />
                    {#if contact.showText === true}
                        <span class="ml-0.5">{contact.text}</span>
                    {:else if contact.showText === false && (contact.text.includes('@') || contact.text.includes('+'))}
                        <span class="ml-0.5 print:hidden">{contact.text}</span>
                        <span class="ml-0.5 hidden print:inline">{contact.text}</span>
                    {:else if contact.showText === false}
                        <span class="ml-0.5 print:hidden">{contact.text}</span>
                         <span class="ml-0.5 hidden print:inline">{contact.text}</span>
                    {/if}
                </a>
            {/each}
        </div>
    </div>
</header>