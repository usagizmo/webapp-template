<script>
  import { page } from '$app/stores';
  import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

  const content = `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '${PUBLIC_GOOGLE_ANALYTICS_ID}');
  `;

  // @ts-expect-error - gtag is defined in script tag
  $: if (typeof gtag !== 'undefined') {
    // @ts-expect-error - gtag is defined in script tag
    // eslint-disable-next-line no-undef
    gtag('config', PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_title: document.title,
      page_path: $page.url.pathname,
    });
  }
</script>

<svelte:head>
  {#if PUBLIC_GOOGLE_ANALYTICS_ID}
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GOOGLE_ANALYTICS_ID}"
    ></script>
    <svelte:element this="script">
      {content}
    </svelte:element>
  {/if}
</svelte:head>
