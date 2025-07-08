<script lang="ts">
  import '../app.css';

  import { ModeWatcher } from 'mode-watcher';
  import { onMount } from 'svelte';

  import { PUBLIC_GA4_MEASUREMENT_ID } from '$env/static/public';
  import Footer from '$lib/components/pages/layout/Footer.svelte';
  import GA4 from '$lib/components/pages/layout/GA4.svelte';
  import HeaderNavigation from '$lib/components/pages/layout/HeaderNavigation.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { fetchUserProfile } from '$lib/helpers/supabaseHelpers';
  import { supabaseStore, userStore } from '$lib/stores';

  import type { LayoutProps } from './$types';

  let { children, data }: LayoutProps = $props();

  let { session } = $derived(data);

  onMount(() => {
    const supabase = supabaseStore.client;
    const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (
        event === 'SIGNED_IN' ||
        event === 'SIGNED_OUT' ||
        newSession?.expires_at !== session?.expires_at
      ) {
        // invalidate('supabase:auth');
        window.location.reload();
        return;
      }

      // The user information is already fetched in +layout.ts
      if (event === 'INITIAL_SESSION') return;

      const { data: userData } = await supabase.auth.getUser();
      const newUser = userData.user;

      let newProfile = null;
      if (newUser) {
        const { profile: fetchedProfile } = await fetchUserProfile(supabase, newUser.id);
        newProfile = fetchedProfile;
      }

      userStore.setUser(newUser, newProfile);
    });
    return () => data.subscription.unsubscribe();
  });
</script>

{#if PUBLIC_GA4_MEASUREMENT_ID}
  <GA4 measurementId={PUBLIC_GA4_MEASUREMENT_ID} />
{/if}

<ModeWatcher />
<Toaster />

<div class="h-screen">
  <div class="flex h-full flex-col">
    <HeaderNavigation />

    <div class="bg-muted flex flex-1 flex-col">
      <main class="flex-1 px-4 pb-16 pt-[68px] md:pt-10">
        {@render children()}
      </main>

      <Footer />
    </div>
  </div>
</div>
