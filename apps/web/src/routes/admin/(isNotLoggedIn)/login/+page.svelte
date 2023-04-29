<script>
  import { getContext } from 'svelte';
  import { Button, Meta, SignInIcon } from 'ui';
  import { logIn } from '$lib/nhost';
  import { userInputsKey } from '$lib/userInputs';

  /** @type {{ getInputs: () => import('$lib/userInputs').UserInputs}} */
  const { getInputs } = getContext(userInputsKey);
  const inputs = getInputs();

  /** @returns {Promise<void>} */
  async function handleSubmit() {
    await logIn(inputs);
  }

  $: meta = {
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
