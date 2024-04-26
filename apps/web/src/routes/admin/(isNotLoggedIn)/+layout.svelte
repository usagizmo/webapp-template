<script lang="ts">
  import type { Snippet } from 'svelte';
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import { ROUTE } from '$lib/routes';
  import SectionFrame from '$lib/components/SectionFrame.svelte';
  import AdminHeaderMessage from '../AdminHeaderMessage.svelte';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import UserInputs from './UserInputs.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  $effect(() => {
    if (userStore.user) {
      goto(ROUTE.HOME, { replaceState: true });
    }
  });
</script>

<div class="mx-auto max-w-[488px]">
  <SectionFrame noPad="top">
    <AdminHeaderTabs />
    <AdminHeaderMessage />
    <UserInputs />
    {@render children()}
  </SectionFrame>
</div>
