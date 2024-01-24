<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from '@repo/ui';
  import { signUp, userInputsKey } from '$lib/nhost';
  import type { UserInputs } from '$lib/nhost';

  const { getInputs } = getContext<{ getInputs: () => UserInputs }>(userInputsKey);
  const inputs = getInputs();

  const handleSubmit = async () => {
    await signUp(inputs);
  };

  const meta = {
    title: `Admin (Sign up) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/signup',
  };
</script>

<Meta {...meta} />

<form on:submit|preventDefault={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Sign up</span>
    </Button>
  </div>
</form>
