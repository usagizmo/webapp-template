<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  import Comment from './Comment.svelte';
  import { commentStore } from './commentStore.svelte';
</script>

<div class="divide-y divide-slate-200">
  {#if commentStore.isLoading}
    <div class="flex h-32 items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-slate-200"></div>
    </div>
  {:else}
    {#each commentStore.comments as comment (comment.id)}
      <div transition:fade={defaultDE} animate:flip={defaultDE}>
        <Comment {comment} />
      </div>
    {/each}
  {/if}
</div>
