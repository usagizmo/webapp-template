<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from '@repo/ui';
  import { logIn, userInputsKey } from '$lib/nhost';
  import type { UserInputs } from '$lib/nhost';

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
