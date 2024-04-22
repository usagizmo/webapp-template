<script lang="ts">
  import { cdate } from 'cdate';
  import { fade } from 'svelte/transition';
  import { supabase } from '$lib/supabase';
  import { store } from '$lib/store.svelte';
  // import { DeleteComment } from '$lib/$generated/graphql';
  // import type { GetAllCommentsSubscription } from '$lib/$generated/graphql';
  import CircleCloseIcon from '$lib/components/icons/20x20/CircleCloseIcon.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircleCheckIcon from '$lib/components/icons/20x20/CircleCheckIcon.svelte';
  import type { Comment } from './types';

  interface Card {
    id: string;
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
    me: store.user?.id === comment.profiles.id,
    name: comment.profiles.display_name,
    createdAt: cdate(comment.created_at),
    message: comment.text,
    filePath: comment.file_path,
  });

  $effect(() => {
    console.log(comment, card);
  });

  const handleDeleteImage = async () => {
    const { filePath } = card;

    if (!filePath) {
      throw Error('File ID not found');
    }

    // before
    isDeleting = true;

    // ...
    const res = await supabase.storage.delete({ filePath });
    if (res.error) {
      console.error(res.error.message);
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
      const res = await supabase.storage.delete({ filePath });

      if (res.error) {
        console.error(res.error.message);
        // Continue update without the file
        // return;
      }
    }

    const { errors } = await DeleteComment({ variables: { id } });

    if (errors) {
      alert(errors.map((e) => e.message).join(', '));
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
      {#if card.filePath}
        {@const {
          data: { publicUrl },
        } = supabase.storage.from('comments').getPublicUrl(card.filePath)}
        <div class="relative ml-2.5 flex-shrink-0">
          <figure class="h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
            <img
              class="object-cover"
              src={publicUrl}
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
