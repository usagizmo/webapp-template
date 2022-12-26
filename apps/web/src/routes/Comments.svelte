<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { defaultDE } from '$lib/easing';
  import type { Comment } from '$houdini';
  import CommentItem from './Comment.svelte';
  import { toWithId } from '$lib/utils';

  export let comments: Comment[] = [];

  $: commentsWithId = comments.map(toWithId);
</script>

<div class="divide-y divide-slate-200">
  {#each commentsWithId as comment (comment.id)}
    <div transition:fade|local={defaultDE} animate:flip={defaultDE}>
      <CommentItem {comment} />
    </div>
  {/each}
</div>
