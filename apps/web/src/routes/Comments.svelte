<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  import { GetAllComments } from '$lib/$generated/graphql';
  import type { GetAllCommentsSubscription } from '$lib/$generated/graphql';
  import CommentItem from './Comment.svelte';

  let isLoading = $state(true);
  let comments = $state<GetAllCommentsSubscription['comments']>([]);

  $effect(() => {
    const subscription = GetAllComments({}).subscribe({
      next({ data }) {
        comments = data!.comments;
        isLoading = false;
      },
    })

    return () => {
      subscription.unsubscribe();
    }
  })

  </script>

<div class="divide-y divide-slate-200">
  {#if isLoading}
    <div class="flex items-center justify-center h-32">
      <div class="w-8 h-8 border-t-2 border-b-2 border-slate-200 rounded-full animate-spin"></div>
    </div>
  {:else}
    {#each comments as comment (comment.id)}
      <div transition:fade={defaultDE} animate:flip={defaultDE}>
        <CommentItem {comment} />
      </div>
    {/each}
  {/if}
</div>
