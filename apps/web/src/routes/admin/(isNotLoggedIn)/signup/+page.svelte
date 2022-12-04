<script lang="ts">
  import { signUp } from '$lib/nhost';
  import { getContext } from 'svelte';
  import { Button, SignInIcon } from 'ui';
  import { key, type UserInputs } from '../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  async function handleSubmit() {
    await signUp(inputs);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Sign up</span>
    </Button>
  </div>
</form>
