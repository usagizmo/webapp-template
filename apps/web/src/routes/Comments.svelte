<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  import { toWithId } from '$lib/utils';
  import type { Comment } from '$houdini';
  import CommentItem from './Comment.svelte';

  export let comments: Comment[] = [];

  function reverse<T>(arr: T[]): T[] {
    return arr.slice().reverse();
  }

  $: commentsWithId = reverse(comments.map(toWithId));
</script>

<div class="divide-y divide-slate-200">
  {#each commentsWithId as comment (comment.id)}
    <div transition:fade|local={defaultDE} animate:flip={defaultDE}>
      <CommentItem {comment} />
    </div>
  {/each}
</div>
