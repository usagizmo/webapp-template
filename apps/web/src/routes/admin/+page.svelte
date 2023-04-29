<script>
  import { Button, Meta, SectionFrame, SignOutIcon } from 'ui';
  import { user, logOut } from '$lib/nhost';
  import LoginMessage from '../LoginMessage.svelte';

  /**
   * Log out the user
   * @returns {Promise<void>}
   */
  async function handleLogOut() {
    await logOut();
  }

  $: meta = {
    title: `Admin | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin',
  };
</script>

<Meta {...meta} />

{#if $user}
  <SectionFrame>
    <div class="flex flex-col items-center justify-center">
      <p class="text-4xl font-bold">{$user.displayName}</p>
      <p>{$user.email}</p>
    </div>
    <div class="mt-8 flex items-center justify-center">
      <Button primary on:click={handleLogOut}>
        <SignOutIcon />
        <span>Log out</span>
      </Button>
    </div>
  </SectionFrame>
{:else}
  <LoginMessage />
{/if}
