<script lang="ts">
  import { Meta, SectionFrame } from '@repo/ui';
  import { user } from '$lib/nhost';
  import CommentForm from './CommentForm.svelte';
  import Comments from './Comments.svelte';
  import LoginMessage from './LoginMessage.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: meta = {
    type: 'website' as const,
    title: `WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com',
  };
</script>

<Meta {...meta} />

<div class="mx-auto max-w-[792px] space-y-5">
  {#if $user}
    <CommentForm />
  {:else}
    <LoginMessage />
  {/if}

  <SectionFrame noPad="y">
    <div class="pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-slate-200 pb-2 pt-2.5">
        <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
      </div>

      <div>
        <Comments comments={data.comments} />
      </div>
    </div>
  </SectionFrame>
</div>
