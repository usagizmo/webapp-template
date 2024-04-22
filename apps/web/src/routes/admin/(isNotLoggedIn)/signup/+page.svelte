<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';
  import { signUp } from '$lib/supabase';
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
