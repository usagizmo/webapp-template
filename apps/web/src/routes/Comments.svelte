<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { DateTime } from 'luxon';
  import { Button, CircleCheckIcon, CircleCloseIcon } from 'ui';
  import { GQL_DeleteComment, GQL_UpdateCommentFileId } from '$houdini';
  import { nhost, user } from '$lib/nhost';
  import { defaultDE } from '$lib/easing';
  import { tryErrorAlertOnHoudiniApi, tryErrorAlertOnNhostApi } from '$lib/utils';

  type Comment = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    fileId: string | null;
    user: {
      id: string;
      displayName: string;
    };
  };

  type Card = {
    id: string;
    me: boolean;
    name: string;
    date: Date;
    message: string;
    fileId: string | null;
  };

  let hoveredId = '';

  export let data: Comment[] = [];
  let deletingCommentIdMap: { [id: string]: true } = {};

  $: cards = data.map(({ id, user: _user, createdAt, text, fileId }) => {
    return {
      id,
      me: $user?.id === _user.id,
      name: _user.displayName,
      date: createdAt,
      message: text,
      fileId,
    };
  }) as Card[];

  const handleDeleteImage = async (id: string, fileId: string | null) => {
    if (!fileId) {
      throw Error('File ID not found');
    }

    // before
    deletingCommentIdMap = { ...deletingCommentIdMap, [id]: true };

    // ...
    const res = await nhost.storage.delete({ fileId });
    if (tryErrorAlertOnNhostApi(res)) {
      // Continue update without the file
      // return;
    }

    try {
      await GQL_UpdateCommentFileId.mutate({ id, fileId: null });
    } catch (err) {
      tryErrorAlertOnHoudiniApi(err);
      window.location.reload();
      return;
    }

    // after
    const { [id]: _, ...filteredIdMap } = deletingCommentIdMap;
    deletingCommentIdMap = filteredIdMap;
  };

  const handleDelete = async (id: string, fileId?: string | null) => {
    // before
    deletingCommentIdMap = { ...deletingCommentIdMap, [id]: true };

    // ...
    if (fileId) {
      const res = await nhost.storage.delete({ fileId });
      if (tryErrorAlertOnNhostApi(res)) {
        // Continue update without the file
        // return;
      }
    }

    try {
      await GQL_DeleteComment.mutate({ id });
    } catch (err) {
      tryErrorAlertOnHoudiniApi(err);
      window.location.reload();
      return;
    }

    // after
    // No need to reset as comments disappear.
  };
</script>

<div class="divide-y divide-slate-200">
  {#each cards as { id, name, me, date, message, fileId } (id)}
    {@const isActionVisible = me && hoveredId === id}
    {@const isDeleting = deletingCommentIdMap[id]}
    {@const dt = DateTime.fromJSDate(date)}
    <div
      class="py-2.5 duration-200"
      class:bg-slate-100={isDeleting}
      on:mouseenter={() => (hoveredId = id)}
      on:mouseleave={() => (hoveredId = '')}
      transition:fade|local={defaultDE}
      animate:flip={defaultDE}
    >
      <div class="relative">
        <div class="flex items-center">
          <p class="font-bold">{name}</p>
          {#if me}
            <figure class="ml-0.5">
              <CircleCheckIcon />
            </figure>
          {/if}
          <time class="ml-2 text-sm font-medium text-zinc-500" title={dt.toISO()}>
            {dt.toFormat('MM/dd/yyyy')}
          </time>
        </div>
        <div class="mt-0.5 flex">
          <p class="flex-1">{message}</p>
          {#if fileId}
            <div class="relative ml-2.5 flex-shrink-0">
              <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
                <img
                  class="object-cover"
                  src={nhost.storage.getPublicUrl({ fileId })}
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
                  on:click={() => handleDeleteImage(id, fileId)}
                >
                  <CircleCloseIcon size={24} />
                </button>
              {/if}
            </div>
          {/if}
        </div>

        {#if isActionVisible}
          <div class="absolute right-0 bottom-0" transition:fade={{ duration: 75 }}>
            <Button warn on:click={() => handleDelete(id, fileId)} disabled={isDeleting}
              >Delete</Button
            >
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
