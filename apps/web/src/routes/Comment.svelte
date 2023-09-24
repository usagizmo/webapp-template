<script>
  import { DateTime } from 'luxon';
  import { fade } from 'svelte/transition';
  import { Button, CircleCheckIcon, CircleCloseIcon } from 'ui';
  import { nhost, user } from '$lib/nhost';
  import { tryErrorAlertOnHoudiniApi, tryErrorAlertOnNhostApi } from '$lib/utils';
  import { DeleteCommentStore, fragment, graphql, UpdateCommentFileIdStore } from '$houdini';

  /**
   * The comment card
   * @typedef {object} Card
   * @property {string} id - The comment ID
   * @property {boolean} me - Whether the comment belongs to the current user
   * @property {string} name - The name of the user who made the comment
   * @property {Date} createdAt - The date the comment was created
   * @property {string} message - The comment message
   * @property {string | null} fileId - The file ID of the comment image
   */

  let isActionVisible = false;
  let isDeleting = false;

  /** @type {import('$houdini').Comment} */
  export let comment;

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
    `,
  );

  /** @type {Card} */
  $: card = {
    id: $data.id,
    me: $user?.id === $data.user.id,
    name: $data.user.displayName,
    createdAt: $data.createdAt,
    message: $data.text,
    fileId: $data.fileId,
  };

  $: createdAt = DateTime.fromJSDate(card.createdAt);

  const updateCommentFileId = new UpdateCommentFileIdStore();
  const deleteComment = new DeleteCommentStore();

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

    const { errors } = await updateCommentFileId.mutate({ id, fileId: null });

    if (errors?.length) {
      tryErrorAlertOnHoudiniApi(errors);
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

    const { errors } = await deleteComment.mutate({ id });

    if (errors?.length) {
      tryErrorAlertOnHoudiniApi(errors);
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
      <div class="absolute bottom-0 right-0" transition:fade={{ duration: 75 }}>
        <Button on:click={handleDelete} disabled={isDeleting}>Delete</Button>
      </div>
    {/if}
  </div>
</div>
