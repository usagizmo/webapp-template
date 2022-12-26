<script lang="ts">
  import { fade } from 'svelte/transition';
  import { DateTime } from 'luxon';
  import { Button, CircleCheckIcon, CircleCloseIcon } from 'ui';
  import { fragment, graphql, type Comment } from '$houdini';
  import { nhost, user } from '$lib/nhost';
  import { tryErrorAlertOnHoudiniApi, tryErrorAlertOnNhostApi } from '$lib/utils';

  type Card = {
    id: string;
    me: boolean;
    name: string;
    createdAt: Date;
    message: string;
    fileId: string | null;
  };

  let isActionVisible = false;
  let isDeleting = false;

  export let comment: Comment;

  $: data = fragment(
    comment,
    graphql`
      fragment Comment on comments {
        id
        createdAt
        updatedAt
        text
        fileId
        user {
          id
          displayName
        }
      }
    `
  );

  $: card = {
    id: $data.id,
    me: $user?.id === $data.user.id,
    name: $data.user.displayName,
    createdAt: $data.createdAt,
    message: $data.text,
    fileId: $data.fileId,
  } as Card;

  $: createdAt = DateTime.fromJSDate(card.createdAt);

  const updateCommentFileId = graphql(`
    mutation UpdateCommentFileId($id: uuid!, $fileId: String) {
      update_comments_by_pk(pk_columns: { id: $id }, _set: { fileId: $fileId }) {
        id
      }
    }
  `);

  const deleteComment = graphql(`
    mutation DeleteComment($id: uuid!) {
      delete_comments_by_pk(id: $id) {
        id
      }
    }
  `);

  const handleDeleteImage = async () => {
    const { id, fileId } = card;

    if (!fileId) {
      throw Error('File ID not found');
    }

    // before
    isDeleting = true;

    // ...
    const res = await nhost.storage.delete({ fileId });
    if (tryErrorAlertOnNhostApi(res)) {
      // Continue update without the file
      // return;
    }

    try {
      await updateCommentFileId.mutate({ id, fileId: null });
    } catch (err) {
      tryErrorAlertOnHoudiniApi(err);
      window.location.reload();
      return;
    }

    // after
    isDeleting = false;
  };

  const handleDelete = async () => {
    const { id, fileId } = card;
    // before
    isDeleting = true;

    // ...
    if (fileId) {
      const res = await nhost.storage.delete({ fileId });
      if (tryErrorAlertOnNhostApi(res)) {
        // Continue update without the file
        // return;
      }
    }

    try {
      await deleteComment.mutate({ id });
    } catch (err) {
      tryErrorAlertOnHoudiniApi(err);
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
      <time class="ml-2 text-sm font-medium text-zinc-500" title={createdAt.toISO()}>
        {createdAt.toFormat('MM/dd/yyyy')}
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
      <div class="absolute right-0 bottom-0" transition:fade={{ duration: 75 }}>
        <Button warn on:click={handleDelete} disabled={isDeleting}>Delete</Button>
      </div>
    {/if}
  </div>
</div>