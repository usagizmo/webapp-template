<script lang="ts">
  import { SectionFrame } from 'ui';
  import { setContext } from 'svelte';
  import HeaderTabs from './HeaderTabs.svelte';
  import MessageForGuest from './MessageForGuest.svelte';
  import { key } from './inputs';

  let inputs = {
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password',
  };

  setContext(key, {
    getInputs: () => inputs,
  });

  const tabs = [
    {
      name: 'Login',
      href: '/admin/login',
    },
    {
      name: 'Sign up',
      href: '/admin/signup',
    },
  ];
</script>

<div class="mx-auto max-w-[488px]">
  <SectionFrame noPad="top">
    <HeaderTabs {tabs} />

    <MessageForGuest />

    <slot />
  </SectionFrame>
</div>
