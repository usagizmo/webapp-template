<script lang="ts">
  import { cdate } from 'cdate';
  import { fade } from 'svelte/transition';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import CircleCloseIcon from '$lib/components/icons/20x20/CircleCloseIcon.svelte';
  import CircleCheckIcon from '$lib/components/icons/20x20/CircleCheckIcon.svelte';
  import { commentStore } from './commentStore.svelte';
  import type { Comment } from './commentStore.svelte';
  import { deleteCommentFile, getCommentFileUrl } from './commentUtils';
  import { buttonVariants } from '$lib/variants/buttonVariants';

  interface Card {
    id: number;
    me: boolean;
    name: string;
    createdAt: cdate.CDate;
    message: string;
    filePath: string | null;
  }

  let {
    comment,
  }: {
    comment: Comment;
  } = $props();

  let isActionVisible = $state(false);
  let isDeleting = $state(false);

  const card: Card = $derived({
    id: comment.id,
    me: userStore.user?.id === comment.profiles?.id,
    name: comment.profiles?.display_name ?? '',
    createdAt: cdate(comment.created_at),
    message: comment.text,
    filePath: comment.file_path,
  });

  const handleDeleteImage = async () => {
    const { id, filePath } = card;

    if (!filePath) {
      throw new Error('No file path');
    }

    // before
    isDeleting = true;

    // ...
    const { error } = await deleteCommentFile(filePath);
    if (error) {
      alert(error.message);
      window.location.reload();
      return;
    }

    const { error: error2 } = await commentStore.updateComment(id, { file_path: null });
    if (error2) {
      alert(error2.message);
      window.location.reload();
      return;
    }

    // after
    isDeleting = false;
  };

  const handleDelete = async () => {
    const { id, filePath } = card;
    // before
    isDeleting = true;

    // ...
    if (filePath) {
      const { error } = await deleteCommentFile(filePath);
      if (error) {
        alert(error.message);
        window.location.reload();
        return;
      }
    }

    const { error } = await commentStore.deleteComment(id, filePath);
    if (error) {
      alert(error.message);
      window.location.reload();
      return;
    }

    // after
    // No need to reset as comments disappear.
  };
</script>

<div
  class="py-2.5 duration-200"
  class:bg-slate-100={isDeleting}
  role="listitem"
  onmouseenter={() => (isActionVisible = card.me ? true : false)}
  onmouseleave={() => (isActionVisible = false)}
>
  <div class="relative">
    <div class="flex items-center">
      <p class="font-bold">{card.name}</p>
      {#if card.me}
        <figure class="ml-0.5">
          <CircleCheckIcon />
        </figure>
      {/if}
      <time
        class="ml-2 text-sm font-medium text-zinc-500"
        title={card.createdAt.format('YYYY-MM-DD HH:mm:ss.SSSZ')}
      >
        {card.createdAt.format('MM/DD/YYYY')}
      </time>
    </div>
    <div class="mt-0.5 flex">
      <p class="flex-1">{card.message}</p>
      {#if card.filePath}
        {@const commentFileUrl = getCommentFileUrl(card.filePath)}
        <div class="flex-shrink-0 relative ml-2.5">
          <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
            <img class="size-full object-cover" src={commentFileUrl} decoding="async" alt="" />
          </figure>
          {#if isActionVisible}
            <button
              class="absolute top-[-8px] right-[-8px]"
              transition:fade={{ duration: 75 }}
              onclick={handleDeleteImage}
            >
              <CircleCloseIcon size={24} />
            </button>
          {/if}
        </div>
      {/if}
    </div>

    {#if isActionVisible}
      <div class="absolute right-0 bottom-0" transition:fade={{ duration: 75 }}>
        <button class={buttonVariants()} onclick={handleDelete} disabled={isDeleting}>Delete</button
        >
      </div>
    {/if}
  </div>
</div>
