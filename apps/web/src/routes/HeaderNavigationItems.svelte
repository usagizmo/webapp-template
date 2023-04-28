<script>
  import { crossfade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';

  /** @type {{label: string, href: string}[]} */
  export let navItems = [];

  const [send, receive] = crossfade(defaultDE);

  /** @type {(href: string) => string} */
  $: getScope = (href) => href.split('/')[1];
</script>

<ul class="flex h-full items-center gap-5">
  {#each navItems as { label, href }}
    {@const isActive =
      href === ROUTE.HOME
        ? href === $page.url.pathname
        : getScope($page.url.pathname) === getScope(href)}
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
