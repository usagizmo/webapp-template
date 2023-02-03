<script lang="ts">
  export let type: 'website' | 'article' = 'article';
  export let title = 'WebApp Template (web)';
  export let siteName = 'WebApp Template (web)';
  export let description = 'SvelteKit (w/ Houdini) x Tailwind CSS x Nhost x Turborepo (pnpm)';
  export let card: 'summary' | 'summary_large_image' = 'summary_large_image';
  export let image = 'https://webapp-template.usagizmo.com/images/ogp.png';
  export let canonical: string;
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
  <link rel="canonical" href={canonical} />
</svelte:head>
