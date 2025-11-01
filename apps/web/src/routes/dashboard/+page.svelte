<script lang="ts">
  import Loader2Icon from '@lucide/svelte/icons/loader-2';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import { Button } from '@repo/shared/components/ui/button';
  import * as Card from '@repo/shared/components/ui/card';
  import { toast } from 'svelte-sonner';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ProfileForm from '$lib/components/pages/auth/ProfileForm.svelte';
  import { userStore } from '$lib/stores';

  let isLoading = $state(false);

  /**
   * Log out the user
   */
  async function handleLogOut() {
    isLoading = true;
    const { error } = await userStore.signOut();
    if (error) {
      toast.error(error.message);
      isLoading = false;
    } else {
      goto(resolve('/auth/login'));
    }
  }
</script>

{#if userStore.profile}
  {@const profile = userStore.profile}
  <Card.Root class="mx-auto max-w-md">
    <Card.Content>
      <div class="flex flex-col items-center justify-center">
        <p class="text-4xl font-bold">{profile.display_name}</p>
        <p>{profile.email}</p>
        <div class="mt-6 w-full">
          <ProfileForm />
        </div>
      </div>
      <div class="mt-6 flex items-center justify-center">
        <Button onclick={handleLogOut} disabled={isLoading}>
          {#if isLoading}
            <Loader2Icon class="animate-spin" />
            Logging out...
          {:else}
            <LogOutIcon />
            <span>Log out</span>
          {/if}
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
{/if}
