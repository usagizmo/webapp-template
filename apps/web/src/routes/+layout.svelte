<script lang="ts">
  import '../app.css';

  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';
  import type { AuthSession } from '@supabase/supabase-js';
  import { getUser } from '$lib/features/user/userUtils';

  // import GoogleAnalytics from './GoogleAnalytics.svelte';
  // import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

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

<!-- TODO: Comment out until hydration is fixed -->
<!-- {#if PUBLIC_GOOGLE_ANALYTICS_ID}
  <GoogleAnalytics id={PUBLIC_GOOGLE_ANALYTICS_ID} />
{/if} -->

<div class="flex h-full flex-col">
  <HeaderNavigation />

  <div class="flex flex-1 flex-col">
    <main class="flex-1 pt-[68px] px-4 pb-16 md:pt-10">
      {@render children()}
    </main>

    <Footer />
  </div>
</div>
