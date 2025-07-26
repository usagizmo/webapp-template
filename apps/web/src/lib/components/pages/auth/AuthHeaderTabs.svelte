<script lang="ts">
  import { DEFAULT_EASE } from '@repo/shared/constants/easing';
  import { crossfade } from 'svelte/transition';

  import { page } from '$app/state';

  const tabs = [
    {
      name: 'Log in',
      href: '/auth/login',
    },
    {
      name: 'Sign up',
      href: '/auth/signup',
    },
  ];

  const [send, receive] = crossfade(DEFAULT_EASE);
</script>

<header class="flex items-center justify-center border-b">
  <ul class="flex space-x-3 py-2.5">
    {#each tabs as { name, href } (href)}
      {@const isActive = href === page.url.pathname}
      <li class="relative rounded-md">
        {#if isActive}
          <span
            in:receive={{ key: 'admin-header-tabs-background' }}
            out:send={{ key: 'admin-header-tabs-background' }}
            class="bg-muted absolute inset-0 block rounded-md"
          ></span>
        {/if}
        <a
          {href}
          class={[
            'relative inline-flex items-center justify-center space-x-1 rounded-md px-5 py-2 text-sm duration-200 hover:font-semibold',
            {
              'font-semibold': isActive,
              'pointer-events-none': isActive,
            },
          ]}
        >
          {name}
        </a>
      </li>
    {/each}
  </ul>
</header>
