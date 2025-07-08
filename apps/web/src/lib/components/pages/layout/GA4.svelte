<script lang="ts" module>
  declare global {
    interface Window {
      dataLayer: unknown[];
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import { page } from '$app/state';

  let { measurementId }: { measurementId: string } = $props();

  let pathName = page.url.pathname;

  if (!measurementId) {
    console.error('Google Analytics 4 Measurement ID is not provided.');
  }

  function gtag(...args: Parameters<typeof window.dataLayer.push>) {
    window.dataLayer.push(args);
  }

  onMount(() => {
    window.dataLayer = window.dataLayer ?? [];

    gtag('js', new Date());
    gtag('config', measurementId);
  });

  $effect(() => {
    if (pathName === page.url.pathname) return;

    gtag('config', measurementId, {
      page_path: page.url.pathname,
    });
    pathName = page.url.pathname;
  });
</script>

<svelte:head>
  <script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} defer></script>
</svelte:head>
