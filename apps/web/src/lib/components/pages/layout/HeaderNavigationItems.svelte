<script lang="ts">
  import { DEFAULT_EASE } from '@repo/shared/constants/easing';
  import { crossfade } from 'svelte/transition';

  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  let {
    navItems = [],
  }: {
    navItems: { label: string; href: string }[];
  } = $props();

  const [send, receive] = crossfade(DEFAULT_EASE);

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
  {#each navItems as { label, href } (href)}
    {@const isActive =
      href === '/' ? href === page.url.pathname : getScope(page.url.pathname) === getScope(href)}
    <li class=" relative flex h-full items-center justify-center">
      {#if isActive}
        <span class="font-bold">{label}</span>
      {:else}
        <a
          href={resolve(href)}
          class="text-muted-foreground hover:text-foreground flex h-full items-center justify-center font-bold duration-200"
          >{label}</a
        >
      {/if}
      {#if isActive}
        <span
          in:receive={{ key: 'header-navigation-items-bar' }}
          out:send={{ key: 'header-navigation-items-bar' }}
          class="bg-foreground absolute inset-x-0 bottom-0 block h-0.5"
        ></span>
      {/if}
    </li>
  {/each}
</ul>
