<script lang="ts">
  import { logIn } from '$lib/supabase';
  import { store } from '$lib/store.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Button from '$lib/components/Button.svelte';
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';

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
