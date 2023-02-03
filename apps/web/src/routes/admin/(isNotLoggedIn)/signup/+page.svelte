<script lang="ts">
  import { signUp } from '$lib/nhost';
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from 'ui';
  import { key, type UserInputs } from '../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  const handleSubmit = async () => {
    await signUp(inputs);
  };

  $: meta = {
    title: `Admin (Sign up) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/signup',
  } as const;
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
