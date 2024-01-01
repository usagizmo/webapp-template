<script lang="ts">
  import { Button, Meta, SectionFrame, SignOutIcon } from '@repo/ui';
  import { logOut } from '$lib/nhost';
  import { store } from '$lib/store.svelte';
  import LoginMessage from '../LoginMessage.svelte';

  /**
   * Log out the user
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

{#if store.user}
  <SectionFrame>
    <div class="flex flex-col items-center justify-center">
      <p class="text-4xl font-bold">{store.user.displayName}</p>
      <p>{store.user.email}</p>
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
