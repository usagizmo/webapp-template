<script lang="ts">
  import Meta from '@repo/shared/components/Meta.svelte';
  import * as Card from '@repo/shared/components/ui/card';

  const meta = {
    title: `Secret | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/secret',
  };
</script>

<Meta {...meta} />

<Card.Root class="mx-auto max-w-3xl">
  <Card.Content class="text-center">
    <p class="text-muted-foreground text-sm">src/routes/secret/+page.svelte</p>
  </Card.Content>
</Card.Root>
