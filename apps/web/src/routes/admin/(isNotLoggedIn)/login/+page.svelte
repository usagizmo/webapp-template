<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, SignInIcon } from 'ui';
  import { logIn } from '$lib/nhost';
  import { key, type UserInputs } from '../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  async function handleSubmit() {
    await logIn(inputs);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Log in</span>
    </Button>
  </div>
</form>
