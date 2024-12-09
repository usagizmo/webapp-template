<script lang="ts" module>
  declare global {
    interface Window {
      dataLayer: unknown[];
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  let { measurementId }: { measurementId: string } = $props();

  onMount(() => {
    if (!browser) return;

    window.dataLayer = window.dataLayer ?? [];
    function gtag(...args: Parameters<typeof window.dataLayer.push>) {
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', measurementId);

    const unsubscribe = page.subscribe((pageData) => {
      gtag('config', measurementId, {
        page_path: pageData.url.pathname,
      });
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} defer></script>
</svelte:head>
