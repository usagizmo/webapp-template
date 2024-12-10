<script lang="ts">
  import '../app.css';

  import type { Snippet } from 'svelte';

  import { env } from '$env/dynamic/public';
  import OnAuthStateChange from '$lib/features/user/OnAuthStateChange.svelte';

  import Footer from './Footer.svelte';
  import GA4 from './GA4.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

{#if env.PUBLIC_GA4_MEASUREMENT_ID}
  <GA4 measurementId={env.PUBLIC_GA4_MEASUREMENT_ID} />
{/if}

<OnAuthStateChange />

<div class="h-screen bg-gray-100 text-zinc-900">
  <div class="flex h-full flex-col">
    <HeaderNavigation />

    <div class="flex flex-1 flex-col">
      <main class="flex-1 px-4 pb-16 pt-[68px] md:pt-10">
        {@render children()}
      </main>

      <Footer />
    </div>
  </div>
</div>
