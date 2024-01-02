<script lang="ts">
  import { cdate } from 'cdate';
  import { fade } from 'svelte/transition';
  import { Button, CircleCheckIcon, CircleCloseIcon } from '@repo/ui';
  import { nhost } from '$lib/nhost';
  import { store } from '$lib/store.svelte';
  import type { PageData } from './$types';

  interface Card {
    id: string;
    me: boolean;
    name: string;
    createdAt: cdate.CDate;
    message: string;
    fileId: string | null;
  }

  let { comment } = $props<{
    comment: PageData['comments'][0];
  }>();

  let isActionVisible = $state(false);
  let isDeleting = $state(false);

  const card: Card = $derived({
    id: comment.id,
    me: store.user?.id === comment.user.id,
    name: comment.user.displayName,
    createdAt: cdate(comment.createdAt),
    message: comment.text,
    fileId: comment.fileId,
  });

  const updateCommentFileId = `
    mutation ($id: uuid!, $fileId: String) {
      update_comments_by_pk(pk_columns: {id: $id}, _set: {fileId: $fileId}) {
        id
        fileId
      }
    }
  `;

  const handleDeleteImage = async () => {
    const { id, fileId } = card;

    if (!fileId) {
      throw Error('File ID not found');
    }

    // before
    isDeleting = true;

    // ...
    const res = await nhost.storage.delete({ fileId });
    if (res.error) {
      console.error(res.error.message);
      // Continue update without the file
      // return;
    }

    const { error } = await nhost.graphql.request(updateCommentFileId, { id, fileId: null });

    if (error) {
      alert(Array.isArray(error) ? error.map((e) => e.message).join(', ') : error.message);
      window.location.reload();
      return;
    }

    // after
    isDeleting = false;
  };

  const deleteComment = `
    mutation ($id: uuid!) {
      delete_comments_by_pk(id: $id) {
        id
      }
    }
  `;

  const handleDelete = async () => {
    const { id, fileId } = card;
    // before
    isDeleting = true;

    // ...
    if (fileId) {
      const res = await nhost.storage.delete({ fileId });

      if (res.error) {
        console.error(res.error.message);
        // Continue update without the file
        // return;
      }
    }

    const { error } = await nhost.graphql.request(deleteComment, { id });

    if (error) {
      alert(Array.isArray(error) ? error.map((e) => e.message).join(', ') : error.message);
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
  on:mouseenter={() => (isActionVisible = card.me ? true : false)}
  on:mouseleave={() => (isActionVisible = false)}
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
      {#if card.fileId}
        <div class="relative ml-2.5 flex-shrink-0">
          <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
            <img
              class="object-cover"
              src={nhost.storage.getPublicUrl({ fileId: card.fileId })}
              width="200"
              height="120"
              decoding="async"
              alt=""
            />
          </figure>
          {#if isActionVisible}
            <button
              class="absolute right-[-8px] top-[-8px]"
              transition:fade={{ duration: 75 }}
              on:click={handleDeleteImage}
            >
              <CircleCloseIcon size={24} />
            </button>
          {/if}
        </div>
      {/if}
    </div>

    {#if isActionVisible}
      <div class="absolute bottom-0 right-0" transition:fade={{ duration: 75 }}>
        <Button on:click={handleDelete} disabled={isDeleting}>Delete</Button>
      </div>
    {/if}
  </div>
</div>
