<script lang="ts">
  import { signUp } from '$lib/nhost';
  import { getContext } from 'svelte';
  import { Button, Input, SignInIcon } from 'ui';
  import { key, type UserInputs } from '../../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  function handleSubmit() {
    signUp(inputs);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
    <Input
      label="Display Name"
      type="text"
      bind:value={inputs.displayName}
      error="Display Name is required."
    />
    <Input label="Email" type="email" bind:value={inputs.email} error="E-mail is required." />
    <Input
      label="Password"
      type="password"
      bind:value={inputs.password}
      error="Password is required."
    />
  </div>

  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Sign up</span>
    </Button>
  </div>
</form>
