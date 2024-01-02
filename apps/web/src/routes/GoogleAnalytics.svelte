<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  let { id } = $props<{ id: string }>();

  const content = `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '${id}');
  `;

  $effect(() => {
    if (browser) {
      // @ts-expect-error - gtag is defined in script tag
      // eslint-disable-next-line no-undef
      gtag('config', id, {
        page_title: document.title,
        page_path: $page.url.pathname,
      });
    }
  });
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
  <svelte:element this="script">
    {content}
  </svelte:element>
</svelte:head>
