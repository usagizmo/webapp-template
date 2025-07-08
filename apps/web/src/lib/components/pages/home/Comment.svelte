<script lang="ts">
  import { cdate } from 'cdate';
  import { toast } from 'svelte-sonner';

  import CircleCheckIcon from '$lib/components/icons/20x20/CircleCheckIcon.svelte';
  import CircleCloseIcon from '$lib/components/icons/20x20/CircleCloseIcon.svelte';
  import { Button } from '$lib/components/ui/button';
  import { commentStore, userStore } from '$lib/stores';
  import type { CommentWithProfile } from '$lib/types/comment';

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
    comment: CommentWithProfile;
  } = $props();

  let isActionVisible = $state(false);
  let isDeleting = $state(false);

  const card: Card = $derived({
    id: comment.id,
    me: userStore.user?.id === comment.user_id,
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

    // Delete the file from storage
    const { error } = await commentStore.deleteCommentFile(filePath);
    if (error) {
      toast.error(`Failed to delete comment file: ${error}`);
      isDeleting = false;
      return;
    }

    // Update the comment to remove the image URL
    const { error: error2 } = await commentStore.updateComment(id, { file_path: null });
    if (error2) {
      toast.error(`Failed to update comment: ${error2}`);
      isDeleting = false;
      return;
    }

    // after
    isDeleting = false;
  };

  const handleDelete = async () => {
    const { id, filePath } = card;
    // before
    isDeleting = true;

    // Delete the file from storage if it exists
    if (filePath) {
      const { error } = await commentStore.deleteCommentFile(filePath);
      if (error) {
        toast.error(`Failed to delete comment file: ${error}`);
        isDeleting = false;
        return;
      }
    }

    // Delete the comment
    const { error } = await commentStore.deleteComment(id);
    if (error) {
      toast.error(`Failed to delete comment: ${error}`);
      isDeleting = false;
      return;
    }

    // after
    // No need to reset as comments disappear.
  };
</script>

<div
  class={['py-2.5 duration-200', { 'bg-slate-100': isDeleting }]}
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
        {@const commentFileUrl = commentStore.getCommentFileUrl(card.filePath)}
        <div class="relative ml-2.5 flex-shrink-0">
          <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
            <img class="size-full object-cover" src={commentFileUrl} decoding="async" alt="" />
          </figure>
          {#if isActionVisible}
            <button
              class="absolute right-[-8px] top-[-8px] cursor-pointer"
              onclick={handleDeleteImage}
            >
              <CircleCloseIcon size={24} />
            </button>
          {/if}
        </div>
      {/if}
    </div>

    {#if isActionVisible}
      <div class="absolute bottom-0 right-0">
        <Button onclick={handleDelete} disabled={isDeleting}>Delete</Button>
      </div>
    {/if}
  </div>
</div>
