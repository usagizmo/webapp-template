<script lang="ts">
  import '../app.css';

  import { Toaster } from '@repo/shared/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import { onMount } from 'svelte';

  import { invalidate } from '$app/navigation';
  import { PUBLIC_GA4_MEASUREMENT_ID } from '$env/static/public';
  import Footer from '$lib/components/pages/layout/Footer.svelte';
  import GA4 from '$lib/components/pages/layout/GA4.svelte';
  import HeaderNavigation from '$lib/components/pages/layout/HeaderNavigation.svelte';
  import { supabaseStore, userStore } from '$lib/stores';

  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();

  let unsubscribeRealtimeUpdates: () => void = () => {};

  onMount(() => {
    const supabase = supabaseStore.client;
    const { data } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'INITIAL_SESSION') return;
      invalidate('supabase:auth');
    });
    return () => data.subscription.unsubscribe();
  });

  $effect(() => {
    unsubscribeRealtimeUpdates = userStore.subscribeToUpdates();
    return () => unsubscribeRealtimeUpdates();
  });
</script>

{#if PUBLIC_GA4_MEASUREMENT_ID}
  <GA4 measurementId={PUBLIC_GA4_MEASUREMENT_ID} />
{/if}

<ModeWatcher />
<Toaster />

<div class="flex min-h-screen flex-col">
  <HeaderNavigation />

  <div class="bg-muted flex flex-1 flex-col">
    <main class="flex-1 px-4 pt-[68px] pb-16 md:pt-10">
      {@render children()}
    </main>

    <Footer />
  </div>
</div>
