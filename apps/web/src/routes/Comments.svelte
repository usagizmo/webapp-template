<script>
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  import { toWithId } from '$lib/utils';
  import CommentItem from './Comment.svelte';

  /** @type {import('$houdini').Comment[]} */
  export let comments = [];

  /**
   * Reverse the order of the array
   * @param {any[]} arr - The array to reverse
   * @returns {any[]} - The reversed array
   */
  function reverse(arr) {
    return arr.slice().reverse();
  }

  $: commentsWithId = reverse(comments.map(toWithId));
</script>

<div class="divide-y divide-slate-200">
  {#each commentsWithId as comment (comment.id)}
    <div transition:fade={defaultDE} animate:flip={defaultDE}>
      <CommentItem {comment} />
    </div>
  {/each}
</div>
