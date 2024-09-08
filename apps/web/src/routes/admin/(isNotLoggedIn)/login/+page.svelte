<script lang="ts">
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { signIn } from '$lib/features/user/userRequests';
  import { buttonVariants } from '$lib/variants/buttonVariants';

  import { userInputs } from '../UserInputs.svelte';

  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const { error } = await signIn(userInputs);
    if (error) alert(error.message);
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
