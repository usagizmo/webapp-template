<script lang="ts">
  import SignOutIcon from '$lib/components/icons/16x16/SignOutIcon.svelte';
  import ProfileForm from '$lib/components/pages/auth/ProfileForm.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { userStore } from '$lib/stores';

  /**
   * Log out the user
   */
  async function handleLogOut() {
    const { error } = await userStore.signOut();
    if (error) {
      console.error('Sign out error:', error.message);
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
        <Button onclick={handleLogOut}>
          <SignOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
{/if}
