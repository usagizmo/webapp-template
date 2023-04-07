<script lang="ts">
  import { setContext } from 'svelte';
  import { SectionFrame } from 'ui';
  import { goto } from '$app/navigation';
  import { user } from '$lib/nhost';
  import { ROUTE } from '$lib/routes';
  import AdminHeaderMessage from '../AdminHeaderMessage.svelte';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import AdminForm from './AdminForm.svelte';
  import { key } from './inputs';

  let inputs = {
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password',
  };

  setContext(key, {
    getInputs: () => inputs,
  });

  $: if ($user) {
    goto(ROUTE.HOME, { replaceState: true });
  }
</script>

<div class="mx-auto max-w-[488px]">
  <SectionFrame noPad="top">
    <AdminHeaderTabs />
    <AdminHeaderMessage />
    <AdminForm />
    <slot />
  </SectionFrame>
</div>
