<script lang="ts">
  import '../app.css';

  import type { AuthSession } from '@supabase/supabase-js';
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';

  import { userStore } from '$lib/features/user/userStore.svelte';
  import { getUser } from '$lib/features/user/userUtils';
  import { supabase } from '$lib/supabase';

  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  let session = $state<AuthSession | null>(null);

  $effect(() => {
    if (!session) {
      userStore.user = null;
      return;
    }

    getUser(session.user.id).then(({ user }) => {
      userStore.user = user;
    });
  });

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    });
  });
</script>

<div class="h-screen bg-gray-100 text-zinc-900">
  <div class="flex h-full flex-col">
    <HeaderNavigation />

    <div class="flex flex-1 flex-col">
      <main class="flex-1 pt-[68px] px-4 pb-16 md:pt-10">
        {@render children()}
      </main>

      <Footer />
    </div>
  </div>
</div>
