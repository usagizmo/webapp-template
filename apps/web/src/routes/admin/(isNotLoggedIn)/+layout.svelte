<script lang="ts">
  import type { Snippet } from 'svelte';
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import { ROUTE } from '$lib/routes';
  import AdminHeaderMessage from '../AdminHeaderMessage.svelte';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import UserInputs from './UserInputs.svelte';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';

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
  <section class={sectionFrameVariants({ pad: 'xb' })}>
    <AdminHeaderTabs />
    <AdminHeaderMessage />
    <UserInputs />
    {@render children()}
  </section>
</div>
