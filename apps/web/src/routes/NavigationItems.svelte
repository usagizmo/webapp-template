<script lang="ts">
  import { page } from '$app/stores';
  import { crossfade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let items: { label: string; href: string }[] = [];

  const [send, receive] = crossfade({
    duration: 400,
    easing: quintOut,
  });
</script>

<ul class="flex h-full items-center gap-5">
  {#each items as { label, href }}
    {@const isActive = href === $page.url.pathname}
    <li class="relative flex h-full items-center justify-center">
      {#if isActive}
        <span class="font-bold">{label}</span>
      {:else}
        <a
          {href}
          class="flex h-full items-center justify-center font-bold text-zinc-500 duration-200 hover:text-zinc-900"
          >{label}</a
        >
      {/if}
      {#if isActive}
        <span
          in:receive={{ key: 'navigation-item' }}
          out:send={{ key: 'navigation-item' }}
          class="context-[''] absolute inset-x-0 bottom-0 block h-0.5 bg-zinc-900"
        />
      {/if}
    </li>
  {/each}
</ul>
