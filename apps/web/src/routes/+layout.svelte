<script lang="ts">
  import '@repo/tailwind-preset/global.css';

  import type { Snippet } from 'svelte';
  import { nhost } from '$lib/nhost';
  import { store } from '$lib/store.svelte';
  import type { User } from '$lib/store.svelte';
  import { AsyncGetUser } from '$lib/$generated/graphql';
  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';
  // import GoogleAnalytics from './GoogleAnalytics.svelte';
  // import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  nhost.auth.onAuthStateChanged(async (_, session) => {
    if (!session?.user) {
      store.user = null;
      return;
    }

    console.log(session.user.id);
    const { data } = await AsyncGetUser({ variables: { id: session.user.id } });
    store.user = data ? (data.user as User) : null;
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
