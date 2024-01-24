<script lang="ts">
  import { Button, Meta, SignInIcon } from '@repo/ui';
  import { signUp } from '$lib/nhost';
  import { store } from '$lib/store.svelte';

  const handleSubmit = async () => {
    await signUp(store.userInputs);
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
