<script lang="ts">
  import '@repo/tailwind-preset-base/global.css';
  import '$lib/nhost'; // initialize nhost

  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';
</script>

<div class="flex h-full flex-col">
  <HeaderNavigation />

  <div class="flex flex-1 flex-col">
    <main class="flex-1 px-4 pb-16 pt-[68px] md:pt-10">
      <slot />
    </main>

    <Footer />
  </div>
</div>
