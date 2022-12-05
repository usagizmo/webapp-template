<script lang="ts">
  import { goto } from '$app/navigation';
  import { isLoggedIn, logOut, user } from '$lib/nhost';
  import { ROUTE } from '$lib/routes';
  import { Button, SectionFrame, CircleEditIcon, SignOutIcon } from 'ui';
  import LoginMessage from '../LoginMessage.svelte';

  const handleLogOut = async () => {
    await logOut();
    goto(ROUTE.ADMIN_LOGIN);
  };
</script>

{#if $isLoggedIn && $user}
  <SectionFrame>
    <div class="flex flex-col items-center justify-center">
      <div class="relative">
        <p class="text-4xl font-bold">{$user.displayName}</p>
        <button
          type="button"
          class="absolute left-[calc(100%+12px)] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900 text-teal-50 duration-200 hover:bg-zinc-700"
        >
          <CircleEditIcon />
        </button>
      </div>
      <p>{$user.email}</p>
    </div>
    <div class="mt-8 flex items-center justify-center">
      <Button type="button" primary on:click={handleLogOut}>
        <SignOutIcon />
        <span>Log out</span>
      </Button>
    </div>
  </SectionFrame>
{:else}
  <LoginMessage />
{/if}
