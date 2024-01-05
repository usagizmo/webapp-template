<script lang="ts">
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Input } from '@repo/ui';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';
  import { userInputsKey } from '$lib/userInputs';
  import type { UserInputs } from '$lib/userInputs';

  const { getInputs } = getContext<{ getInputs: () => UserInputs }>(userInputsKey);
  const inputs = getInputs();

  // eslint-disable-next-line svelte/valid-compile
  const isSignUpPage = $derived($page.url.pathname === ROUTE.ADMIN_SIGNUP);
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide={defaultDE}>
      <Input
        label="Display Name"
        type="text"
        value={inputs.displayName}
        error={{ required: 'Display Name is required.' }}
      />
    </div>
  {/if}
  <Input
    label="Email"
    type="email"
    value={inputs.email}
    error={{ required: 'E-mail is required.' }}
  />
  <Input
    label="Password"
    type="password"
    value={inputs.password}
    error={{ required: 'Password is required.' }}
  />
</div>
