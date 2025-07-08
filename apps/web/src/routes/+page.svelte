<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import CommentForm from '$lib/components/pages/home/CommentForm.svelte';
  import Comments from '$lib/components/pages/home/Comments.svelte';
  import LoginMessage from '$lib/components/pages/home/LoginMessage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { userStore } from '$lib/stores';

  const meta = {
    type: 'website' as const,
    title: `WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com',
  };
</script>

<Meta {...meta} />

<div class="mx-auto max-w-3xl space-y-5">
  {#if userStore.user}
    <CommentForm />
  {:else}
    <LoginMessage />
  {/if}

  <Card.Root class="pt-0">
    <Card.Content>
      <div class="flex items-center justify-center border-b py-2.5">
        <p class="text-muted-foreground text-sm">Comments will be deleted as appropriate.</p>
      </div>
      <Comments />
    </Card.Content>
  </Card.Root>
</div>
