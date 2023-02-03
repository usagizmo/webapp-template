<script lang="ts">
  import { Meta, SectionFrame } from 'ui';

  $: meta = {
    title: `Secret | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/secret',
  } as const;
</script>

<Meta {...meta} />

<div class="mx-auto max-w-[792px]">
  <SectionFrame>
    <div class="text-center">
      <p class="text-sm text-zinc-500">src/routes/secret/+page.svelte</p>
    </div>
  </SectionFrame>
</div>
