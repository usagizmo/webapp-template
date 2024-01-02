<script lang="ts">
  import '@repo/tailwind-preset-base/global.css';
  import '$lib/nhost'; // initialize nhost

  // import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

  import Footer from './Footer.svelte';
  // import GoogleAnalytics from './GoogleAnalytics.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<!-- TODO: Comment out until hydration is fixed -->
<!-- {#if PUBLIC_GOOGLE_ANALYTICS_ID}
  <GoogleAnalytics id={PUBLIC_GOOGLE_ANALYTICS_ID} />
{/if} -->

<div class="flex h-full flex-col">
  <HeaderNavigation />

  <div class="flex flex-1 flex-col">
    <main class="flex-1 px-4 pb-16 pt-[68px] md:pt-10">
      {@render children()}
    </main>

    <Footer />
  </div>
</div>
