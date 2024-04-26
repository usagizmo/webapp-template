<script lang="ts">
  import SectionFrame from '$lib/components/SectionFrame.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import CommentForm from './CommentForm.svelte';
  import Comments from '../lib/features/comment/Comments.svelte';
  import LoginMessage from './LoginMessage.svelte';
  import { onMount } from 'svelte';
  import { commentStore } from '$lib/features/comment/commentStore.svelte';

  const meta = {
    type: 'website' as const,
    title: `WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com',
  };

  onMount(() => {
    commentStore.fetchComments();
  });
</script>

<Meta {...meta} />

<div class="mx-auto max-w-[792px] space-y-5">
  {#if userStore.user}
    <CommentForm />
  {:else}
    <LoginMessage />
  {/if}

  <SectionFrame noPad="y">
    <div class="pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-slate-200 pt-2.5 pb-2">
        <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
      </div>

      <Comments />
    </div>
  </SectionFrame>
</div>
