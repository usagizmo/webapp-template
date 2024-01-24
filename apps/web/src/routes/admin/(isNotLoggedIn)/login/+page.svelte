<script lang="ts">
  import { Button, Meta, SignInIcon } from '@repo/ui';
  import { logIn } from '$lib/nhost';
  import { store } from '$lib/store.svelte';

  /**
   * Log in
   */
  async function handleSubmit(): Promise<void> {
    await logIn(store.userInputs);
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
