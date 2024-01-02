<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from '@repo/ui';
  import { logIn } from '$lib/nhost';
  import { userInputsKey } from '$lib/userInputs';
  import type { UserInputs } from '$lib/userInputs';

  const { getInputs } = getContext<{ getInputs: () => UserInputs }>(userInputsKey);
  const inputs = getInputs();

  /**
   * Log in
   */
  async function handleSubmit(): Promise<void> {
    await logIn(inputs);
  }

  const meta = {
    title: `Admin (Login) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/login',
  };
</script>

<Meta {...meta} />

<form on:submit|preventDefault={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Log in</span>
    </Button>
  </div>
</form>
