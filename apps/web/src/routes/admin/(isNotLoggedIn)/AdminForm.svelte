<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { getContext } from 'svelte';
  import { Input } from 'ui';
  import { key, type UserInputs } from './inputs';
  import { ROUTE } from '$lib/routes';
  import { defaultDE } from '$lib/easing';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  $: isSignUpPage = $page.url.pathname === ROUTE.ADMIN_SIGNUP;
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide|local={defaultDE}>
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
