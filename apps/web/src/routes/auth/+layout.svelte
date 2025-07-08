<script lang="ts">
  import type { Snippet } from 'svelte';

  import AuthHeaderMessage from '$lib/components/pages/auth/AuthHeaderMessage.svelte';
  import AuthHeaderTabs from '$lib/components/pages/auth/AuthHeaderTabs.svelte';
  import * as Card from '$lib/components/ui/card';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<Card.Root class="mx-auto w-full max-w-md pt-0">
  <Card.Content>
    <AuthHeaderTabs />
    <div class="py-6">
      <AuthHeaderMessage />
    </div>
    {@render children()}
  </Card.Content>
</Card.Root>
