<script lang="ts">
  import { fade } from 'svelte/transition';
  import { DateTime } from 'luxon';
  import { user } from '$lib/nhost';
  import { Button, CircleCheckIcon, CircleCloseIcon } from 'ui';
  import { graphql, type DeleteCommentStore } from '$houdini';

  type Comment = {
    id: string;
    created_at: Date;
    updated_at: Date;
    text: string;
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
    image: string | null;
  };

  let hoveredId = '';

  export let comments: Comment[] = [];

  $: cards = comments.map((comment) => {
    return {
      id: comment.id,
      me: $user?.id === comment.user.id,
      name: comment.user.displayName,
      date: comment.created_at,
      message: comment.text,
      image: null, // TODO
    };
  }) as Card[];

  const deleteComment: DeleteCommentStore = graphql`
    mutation DeleteComment($id: uuid!) {
      delete_comments_by_pk(id: $id) {
        id
      }
    }
  `;

  const handleDelete = async (id: string, message: string) => {
    if (confirm('Are you sure you want to delete this comment?\n\n' + message)) {
      await deleteComment.mutate({ id });
      alert('deleted');
    }
  };
</script>

<div class="divide-y divide-slate-200">
  {#each cards as { id, name, me, date, message, image }}
    {@const isActionVisible = me && hoveredId === id}
    {@const dt = DateTime.fromJSDate(date)}
    <div
      class="py-2.5"
      on:mouseenter={() => (hoveredId = id)}
      on:mouseleave={() => (hoveredId = '')}
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
          <p>{message}</p>
          {#if image}
            <div class="relative ml-2.5 flex-shrink-0">
              <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
                <!-- <img /> -->
              </figure>
              {#if isActionVisible}
                <button class="absolute right-[-8px] top-[-8px]" transition:fade={{ duration: 75 }}>
                  <CircleCloseIcon size={24} />
                </button>
              {/if}
            </div>
          {/if}
        </div>

        {#if isActionVisible}
          <div class="absolute right-0 bottom-0" transition:fade={{ duration: 75 }}>
            <Button type="button" warn on:click={() => handleDelete(id, message)}>Delete</Button>
            <Button type="button">Edit</Button>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
