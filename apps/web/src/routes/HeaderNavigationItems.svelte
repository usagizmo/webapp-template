<script lang="ts">
  import { crossfade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';

  let { navItems = [] }: {
    navItems: { label: string; href: string }[];
  } = $props();

  const [send, receive] = crossfade(defaultDE);

  /**
   * Get the scope of the page
   * @param href - The href of the page
   * @returns The scope of the page
   */
  function getScope(href: string): string {
    return href.split('/')[1];
  }
</script>

<ul class="flex h-full items-center gap-5">
  {#each navItems as { label, href }}
    {@const isActive =
      // eslint-disable-next-line svelte/valid-compile
      href === ROUTE.HOME ? href === $page.url.pathname : getScope($page.url.pathname) === getScope(href)
    }
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
          in:receive={{ key: 'header-navigation-items-bar' }}
          out:send={{ key: 'header-navigation-items-bar' }}
          class="absolute inset-x-0 bottom-0 block h-0.5 bg-zinc-900"
        />
      {/if}
    </li>
  {/each}
</ul>
