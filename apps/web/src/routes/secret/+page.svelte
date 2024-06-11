<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';

  const meta = {
    title: `Secret | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/secret',
  };
</script>

<Meta {...meta} />

<div class="mx-auto max-w-[792px]">
  <section class={sectionFrameVariants()}>
    <div class="text-center">
      <p class="text-sm text-zinc-500">src/routes/secret/+page.svelte</p>
    </div>
  </section>
</div>
