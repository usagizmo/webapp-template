<script lang="ts">
  import { page } from '$app/stores';
  import { myCrossfade } from '$lib/easing';

  const tabs = [
    {
      name: 'Log in',
      href: '/admin/login',
    },
    {
      name: 'Sign up',
      href: '/admin/signup',
    },
  ];

  const [send, receive] = myCrossfade();
</script>

<header class="flex items-center justify-center border-b border-slate-200 pt-0.5">
  <ul class="flex space-x-3 py-2.5">
    {#each tabs as { name, href }}
      {@const isActive = href === $page.url.pathname}
      <li class="relative rounded-md">
        {#if isActive}
          <span
            in:receive|local={{ key: 'admin-header-tabs-background' }}
            out:send|local={{ key: 'admin-header-tabs-background' }}
            class="context-[''] absolute inset-0 block rounded-md bg-gray-100"
          />
        {/if}
        <a
          {href}
          class="relative inline-flex items-center justify-center space-x-1 rounded-md px-5 py-2 text-sm text-zinc-500 duration-200"
          class:font-bold={isActive}
          class:pointer-events-none={isActive}
          class:text-zinc-500={!isActive}
        >
          {name}
        </a>
      </li>
    {/each}
  </ul>
</header>
