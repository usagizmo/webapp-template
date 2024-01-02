<script lang="ts">
  import { setContext } from 'svelte';
  import { SectionFrame } from '@repo/ui';
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import { ROUTE } from '$lib/routes';
  import { userInputsKey } from '$lib/userInputs';
  import type { UserInputs } from '$lib/userInputs';
  import AdminHeaderMessage from '../AdminHeaderMessage.svelte';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import AdminForm from './AdminForm.svelte';

  let userInputs = {
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password',
  } satisfies UserInputs;

  setContext(userInputsKey, {
    getInputs: () => userInputs,
  });

  $effect(() => {
    if (store.user) {
      goto(ROUTE.HOME, { replaceState: true });
    }
  });
</script>

<div class="mx-auto max-w-[488px]">
  <SectionFrame noPad="top">
    <AdminHeaderTabs />
    <AdminHeaderMessage />
    <AdminForm />
    <slot />
  </SectionFrame>
</div>
