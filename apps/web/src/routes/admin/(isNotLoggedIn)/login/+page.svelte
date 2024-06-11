<script lang="ts">
  import { userStore } from '$lib/features/user/userStore.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';
  import { buttonVariants } from '$lib/variants/buttonVariants';

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
    <button class={buttonVariants({ primary: true })} type="submit">
      <SignInIcon />
      <span>Log in</span>
    </button>
  </div>
</form>
