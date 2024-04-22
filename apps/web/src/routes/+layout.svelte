<script lang="ts">
  import '../app.css';

  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { getUser, supabase } from '$lib/supabase';
  import { store } from '$lib/store.svelte';
  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';
  // import GoogleAnalytics from './GoogleAnalytics.svelte';
  // import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session?.user) {
        store.user = null;
        return;
      }

      if (!session.user.email) {
        throw new Error('No email found in session');
      }

      if (!session.user.user_metadata.display_name) {
        throw new Error('No display name found in session');
      }

      const { user } = await getUser(session.user.id);
      store.user = user;
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<!-- TODO: Comment out until hydration is fixed -->
<!-- {#if PUBLIC_GOOGLE_ANALYTICS_ID}
  <GoogleAnalytics id={PUBLIC_GOOGLE_ANALYTICS_ID} />
{/if} -->

<div class="flex h-full flex-col">
  <HeaderNavigation />

  <div class="flex flex-1 flex-col">
    <main class="flex-1 px-4 pb-16 pt-[68px] md:pt-10">
      {@render children()}
    </main>

    <Footer />
  </div>
</div>
