<script lang="ts">
  import { user } from '$lib/nhost';
  import { Meta, SectionFrame } from 'ui';
  import LoginMessage from './LoginMessage.svelte';
  import Comments from './Comments.svelte';
  import CommentForm from './CommentForm.svelte';
  import type { PageData } from './$houdini';

  export let data: PageData;

  $: ({ Comments: CommentsData } = data);

  $: meta = {
    type: 'website',
    title: `WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com',
  } as const;
</script>

<Meta {...meta} />

<div class="mx-auto max-w-[792px] space-y-5">
  {#if !$user}
    <LoginMessage />
  {:else}
    <CommentForm />
  {/if}

  <SectionFrame noPad="y">
    <div class="pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-slate-200 pb-2 pt-2.5">
        <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
      </div>

      <div>
        <Comments comments={$CommentsData.data?.comments ?? []} />
      </div>
    </div>
  </SectionFrame>
</div>
