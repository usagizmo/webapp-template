<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { defaultDE } from '$lib/easing';
  // import { GetAllComments } from '$lib/$generated/graphql';
  // import type { GetAllCommentsSubscription } from '$lib/$generated/graphql';
  import Comment from './Comment.svelte';
  import type { Comment as CommentType } from './types';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let isLoading = $state(true);
  let comments = $state<CommentType[]>([]);

  onMount(() => {
    supabase
      .from('comments')
      .select(
        `
          id,
          user_id,
          profiles (
            display_name
          ),
          text,
          file_path,
          created_at
        `,
      )
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching comments:', error);
          return;
        }

        comments = data as unknown as CommentType[];
        console.log('🚀 ~ .then ~ data:', data);
        isLoading = false;
      });

    const channel = supabase.channel('insert_comment');
    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          const comment = payload.new as CommentType;

          console.log('Change received!', payload.new);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });
</script>

<div class="divide-y divide-slate-200">
  {#if isLoading}
    <div class="flex h-32 items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-slate-200"></div>
    </div>
  {:else}
    {#each comments as comment (comment.id)}
      <div transition:fade={defaultDE} animate:flip={defaultDE}>
        <Comment {comment} />
      </div>
    {/each}
  {/if}
</div>
