<script lang="ts">
  import { page } from '$app/stores';
  import { crossfade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let items: { label: string; href: string }[] = [];

  const [send, receive] = crossfade({
    duration: 800,
    easing: quintOut,
  });

  $: isActive = (href: string) => href === $page.url.pathname;
</script>

<ul class="flex h-full items-center gap-5">
  {#each items as { label, href }}
    <li class="relative flex h-full items-center justify-center">
      {#if isActive(href)}
        <span class="font-bold">{label}</span>
      {:else}
        <a
          {href}
          class="flex h-full items-center justify-center font-bold text-[#71717a] hover:text-[#18181b]"
          >{label}</a
        >
      {/if}
      {#if isActive(href)}
        <span
          in:receive={{ key: 'navigation-item' }}
          out:send={{ key: 'navigation-item' }}
          class="context-[''] absolute inset-x-0 bottom-0 block h-0.5 bg-[#18181b]"
        />
      {/if}
    </li>
  {/each}
</ul>
