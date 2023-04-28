<script>
  import { setContext } from 'svelte';
  import { SectionFrame } from 'ui';
  import { goto } from '$app/navigation';
  import { user } from '$lib/nhost';
  import { ROUTE } from '$lib/routes';
  import { userInputsKey } from '$lib/userInputs';
  import AdminHeaderMessage from '../AdminHeaderMessage.svelte';
  import AdminHeaderTabs from '../AdminHeaderTabs.svelte';
  import AdminForm from './AdminForm.svelte';

  /** @type {import('$lib/userInputs').UserInputs} */
  let userInputs = {
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password',
  };

  setContext(userInputsKey, {
    getInputs: () => userInputs,
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
