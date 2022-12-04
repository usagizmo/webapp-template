<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { getContext } from 'svelte';
  import { Input } from 'ui';
  import { key, type UserInputs } from './inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  $: isSignUpPage = $page.url.pathname === '/admin/signup';
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide|local>
      <Input
        label="Display Name"
        type="text"
        bind:value={inputs.displayName}
        error="Display Name is required."
      />
    </div>
  {/if}
  <Input label="Email" type="email" bind:value={inputs.email} error="E-mail is required." />
  <Input
    label="Password"
    type="password"
    bind:value={inputs.password}
    error="Password is required."
  />
</div>
