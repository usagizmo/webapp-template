<script lang="ts">
  import SignInIcon from '$lib/components/icons/16x16/SignInIcon.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { signUp } from '$lib/features/user/userQueries';
  import { buttonVariants } from '$lib/variants/buttonVariants';

  import { userInputs } from '../UserInputs.svelte';

  const meta = {
    title: `Admin (Sign up) | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin/signup',
  };

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { error } = await signUp(userInputs);
    error && alert(error.message);
  }
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
