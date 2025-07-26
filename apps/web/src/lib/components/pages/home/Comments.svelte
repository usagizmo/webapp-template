<script lang="ts">
  import { DEFAULT_EASE } from '@repo/shared/constants/easing';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  import { commentStore } from '$lib/stores';

  import Comment from './Comment.svelte';
</script>

{#if commentStore.comments.length === 0}
  <div class="flex justify-center p-4 py-8">
    <p class="text-muted-foreground">No comments yet</p>
  </div>
{:else}
  <div class="divide-y">
    {#each commentStore.comments as comment (comment.id)}
      <div transition:fade={DEFAULT_EASE} animate:flip={DEFAULT_EASE}>
        <Comment {comment} />
      </div>
    {/each}
  </div>
{/if}
