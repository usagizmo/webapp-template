<script lang="ts">
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import { buttonVariants } from '$lib/variants/buttonVariants';

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    await userStore.signUp();
  };

  const meta = {
    title: `Admin (Sign up) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/signup',
  };
</script>

<Meta {...meta} />

<form onsubmit={handleSubmit}>
  <div class="mt-5 flex justify-center">
    <button class={buttonVariants({ primary: true })} type="submit">
      <SignInIcon />
      <span>Sign up</span>
    </button>
  </div>
</form>
