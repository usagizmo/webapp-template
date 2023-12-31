<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  import CommentItem from './Comment.svelte';
  import type { PageData } from './$types';

  export let comments: PageData['comments'] = [];
</script>

<div class="divide-y divide-slate-200">
  {#each comments as comment (comment.id)}
    <div transition:fade={defaultDE} animate:flip={defaultDE}>
      <CommentItem {comment} />
    </div>
  {/each}
</div>
