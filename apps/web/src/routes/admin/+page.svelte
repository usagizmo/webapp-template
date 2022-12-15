<script lang="ts">
  import { goto } from '$app/navigation';
  import { isLoggedIn, logOut, user } from '$lib/nhost';
  import { ROUTE } from '$lib/routes';
  import { Button, SectionFrame, SignOutIcon } from 'ui';
  import LoginMessage from '../LoginMessage.svelte';

  const handleLogOut = async () => {
    await logOut();
    goto(ROUTE.ADMIN_LOGIN);
  };
</script>

{#if $isLoggedIn && $user}
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
