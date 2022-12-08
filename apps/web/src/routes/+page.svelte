<script lang="ts">
  import { isLoggedIn } from '$lib/nhost';
  import { SectionFrame } from 'ui';
  import LoginMessage from './LoginMessage.svelte';
  import Comments from './Comments.svelte';
  import CommentForm from './CommentForm.svelte';
  import { GQL_GetCommentsSubscription } from '$houdini';

  GQL_GetCommentsSubscription.listen();
</script>

<div class="mx-auto max-w-[792px] space-y-5">
  {#if !$isLoggedIn}
    <LoginMessage />
  {:else}
    <CommentForm />
  {/if}

  <SectionFrame noPad="y">
    <div class="pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-slate-200 pt-2.5 pb-2">
        <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
      </div>

      <div>
        <Comments data={$GQL_GetCommentsSubscription?.comments ?? []} />
      </div>
    </div>
  </SectionFrame>
</div>
