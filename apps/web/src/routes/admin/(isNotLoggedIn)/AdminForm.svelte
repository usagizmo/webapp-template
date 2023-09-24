<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Input } from 'ui';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';
  import { userInputsKey } from '$lib/userInputs';

  /** @type {{ getInputs: () => import('$lib/userInputs').UserInputs}} */
  const { getInputs } = getContext(userInputsKey);
  const inputs = getInputs();

  $: isSignUpPage = $page.url.pathname === ROUTE.ADMIN_SIGNUP;
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide={defaultDE}>
      <Input
        label="Display Name"
        type="text"
        bind:value={inputs.displayName}
        error={{ required: 'Display Name is required.' }}
      />
    </div>
  {/if}
  <Input
    label="Email"
    type="email"
    bind:value={inputs.email}
    error={{ required: 'E-mail is required.' }}
  />
  <Input
    label="Password"
    type="password"
    bind:value={inputs.password}
    error={{ required: 'Password is required.' }}
  />
</div>
