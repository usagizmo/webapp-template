<script lang="ts" module>
  export let userInputs = $state({
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password0',
  });
</script>

<script lang="ts">
  import { slide } from 'svelte/transition';

  import { page } from '$app/state';
  import Input from '$lib/components/Input.svelte';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';

  const isSignUpPage = $derived(page.url.pathname === ROUTE.ADMIN_SIGNUP);
</script>

<div class="space-y-3">
  {#if isSignUpPage}
    <div transition:slide={defaultDE}>
      <Input
        label="Display Name"
        type="text"
        value={userInputs.displayName}
        oninput={(event) => (userInputs.displayName = (event.target as HTMLInputElement).value)}
        error={{ required: 'Display Name is required.' }}
      />
    </div>
  {/if}
  <Input
    label="Email"
    type="email"
    value={userInputs.email}
    oninput={(event) => (userInputs.email = (event.target as HTMLInputElement).value)}
    error={{ required: 'E-mail is required.' }}
  />
  <Input
    label="Password"
    type="password"
    value={userInputs.password}
    oninput={(event) => (userInputs.password = (event.target as HTMLInputElement).value)}
    error={{ required: 'Password is required.' }}
  />
</div>
