<script lang="ts">
  import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button } from '@repo/shared/components/ui/button';
  import { cdate } from 'cdate';
  import { toast } from 'svelte-sonner';

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

<div class="group py-2.5 duration-200" role="listitem">
  <div class="relative">
    <div class="flex items-center">
      <p class="font-bold">{card.name}</p>
      {#if card.me}
        <figure class="ml-1">
          <CircleCheckIcon class="size-5" />
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
          {#if card.me}
            <Button
              variant="secondary"
              size="icon"
              class="absolute top-[-8px] right-[-8px] size-6 rounded-full transition-none not-group-hover:opacity-0"
              onclick={handleDeleteImage}
            >
              <XIcon class="size-4" />
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if card.me}
      <div class="absolute right-0 bottom-0 not-group-hover:opacity-0">
        <Button size="icon" onclick={handleDelete} disabled={isDeleting}>
          <Trash2Icon />
        </Button>
      </div>
    {/if}
  </div>
</div>
