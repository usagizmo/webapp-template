<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, Input, SignInIcon } from 'ui';
  import { logIn } from '$lib/nhost';
  import { key, type UserInputs } from '../../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  async function handleSubmit() {
    await logIn(inputs);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
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
      <span>Log in</span>
    </Button>
  </div>
</form>
