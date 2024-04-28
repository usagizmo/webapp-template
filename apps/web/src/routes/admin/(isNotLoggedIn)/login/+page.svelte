<script lang="ts">
  import { userStore } from '$lib/features/user/userStore.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Button from '$lib/components/Button.svelte';
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';

  /**
   * Log in
   */
  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    await userStore.logIn();
  }

  const meta = {
    title: `Admin (Login) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/login',
  };
</script>

<Meta {...meta} />

<form onsubmit={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <Button type="submit" primary>
      <SignInIcon />
      <span>Log in</span>
    </Button>
  </div>
</form>
