<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { defaultDE } from '$lib/easing';
  import CommentItem from './Comment.svelte';
  import type { Comment } from '$houdini';

  export let comments: Comment[] = [];
</script>

<div class="divide-y divide-slate-200">
  {#each comments as comment (comment)}
    <div transition:fade|local={defaultDE} animate:flip={defaultDE}>
      <CommentItem {comment} />
    </div>
  {/each}
</div>
