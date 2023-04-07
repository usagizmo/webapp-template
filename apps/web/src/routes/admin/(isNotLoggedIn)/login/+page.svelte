<script lang="ts">
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from 'ui';
  import { logIn } from '$lib/nhost';
  import { key } from '../inputs';
  import type { UserInputs } from '../inputs';

  const { getInputs } = getContext<{
    getInputs: () => UserInputs;
  }>(key);
  const inputs = getInputs();

  async function handleSubmit() {
    await logIn(inputs);
  }

  $: meta = {
    title: `Admin (Login) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/login',
  } as const;
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
