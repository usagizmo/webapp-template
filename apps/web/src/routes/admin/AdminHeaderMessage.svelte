<script lang="ts">
  import { fade } from 'svelte/transition';

  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';

  let el: HTMLElement | null = $state(null);
  let height = $state(0);
  let innerWidth = $state(0);

  const isSignUpPage = $derived($page.url.pathname === ROUTE.ADMIN_LOGIN);

  $effect(() => {
    if (el && innerWidth) {
      const size = el.getBoundingClientRect();
      height = size.height;
    }
  });
</script>

<svelte:window bind:innerWidth />

<div class="pt-3 pb-2.5">
  <div class="relative" style:height={`${height}px`}>
    {#if isSignUpPage}
      <div bind:this={el} class="absolute w-full text-sm text-zinc-500" transition:fade={defaultDE}>
        <p class="text-center">
          You can register as a member<br />
          with an irresponsible email and password.
        </p>
        <p class="text-center">No email will be sent.</p>
      </div>
    {:else}
      <div bind:this={el} class="absolute w-full text-sm text-zinc-500" transition:fade={defaultDE}>
        <p class="text-center">Guest account</p>
        <dl>
          <div class="flex justify-center space-x-1">
            <dt>email:</dt>
            <dd>email@add.com</dd>
          </div>
          <div class="flex justify-center space-x-1">
            <dt>pass:</dt>
            <dd>password0</dd>
          </div>
        </dl>
      </div>
    {/if}
  </div>
</div>
