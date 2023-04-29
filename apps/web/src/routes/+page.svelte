<script>
  import { Meta, SectionFrame } from 'ui';
  import { user } from '$lib/nhost';
  import CommentForm from './CommentForm.svelte';
  import Comments from './Comments.svelte';
  import LoginMessage from './LoginMessage.svelte';

  /** @type { import('./$houdini').PageData } */
  export let data;

  $: ({ Comments: CommentsData } = data);
  $: comments = $CommentsData.data?.comments ?? [];

  $: meta = {
    /** @type {'website'} */
    type: 'website',
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
        <Comments {comments} />
      </div>
    </div>
  </SectionFrame>
</div>
