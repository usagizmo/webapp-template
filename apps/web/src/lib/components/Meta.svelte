<script lang="ts">
  let {
    type = 'article',
    title = 'WebApp Template (web)',
    siteName = 'WebApp Template (web)',
    description = 'SvelteKit x Tailwind CSS x Nhost x Turborepo (pnpm)',
    card = 'summary_large_image',
    image = 'https://webapp-template.usagizmo.com/images/ogp.png',
    canonical = '',
  }: {
    type?: 'website' | 'article';
    title?: string;
    siteName?: string;
    description?: string;
    card?: 'summary' | 'summary_large_image';
    image?: string;
    canonical?: string;
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content={card} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}
</svelte:head>
