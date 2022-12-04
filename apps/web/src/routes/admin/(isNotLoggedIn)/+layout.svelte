<script lang="ts">
  import { goto } from '$app/navigation';
  import { setContext, onDestroy } from 'svelte';
  import { SectionFrame } from 'ui';
  import { key } from './inputs';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import MessageForGuest from '../MessageForGuest.svelte';
  import { isLoggedIn } from '$lib/nhost';
  import AdminForm from './AdminForm.svelte';
  import { ROUTE } from '$lib/routes';

  let inputs = {
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password',
  };

  setContext(key, {
    getInputs: () => inputs,
  });

  const unsubscribe = isLoggedIn.subscribe((value) => {
    if (!value) return;
    goto(ROUTE.ADMIN, {
      replaceState: true,
    });
  });
  onDestroy(unsubscribe);
</script>

<div class="mx-auto max-w-[488px]">
  <SectionFrame noPad="top">
    <AdminHeaderTabs />
    <MessageForGuest />
    <AdminForm />
    <slot />
  </SectionFrame>
</div>
