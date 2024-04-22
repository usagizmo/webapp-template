<script lang="ts">
  import { logOut, updateUserBio } from '$lib/supabase';
  import { store } from '$lib/store.svelte';
  import type { User } from '$lib/store.svelte';
  import Button from '$lib/components/Button.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import SectionFrame from '$lib/components/SectionFrame.svelte';
  import SignOutIcon from '$lib/components/icons/16x16/SignOutIcon.svelte';

  const {
    user,
  }: {
    user: User;
  } = $props();

  let tempBio = $state(user.bio);

  /**
   * Log out the user
   */
  async function handleLogOut() {
    await logOut();
  }

  /**
   * Update the user's bio
   */
  async function handleUpdate() {
    const storeBio = store.user?.bio ?? '';
    if (storeBio === tempBio) return;

    await updateUserBio(user.id, tempBio);

    store.setUserBio(tempBio);
  }
</script>

<SectionFrame>
  <div class="flex flex-col items-center justify-center">
    <p class="text-4xl font-bold">{user.displayName}</p>
    <p>{user.email}</p>
    <div class="mt-4 w-full">
      <TextArea
        placeholder="bio"
        value={tempBio}
        oninput={(event) => tempBio = (event.target as HTMLInputElement).value}
        onblur={handleUpdate}
      />
    </div>
  </div>
  <div class="mt-8 flex items-center justify-center">
    <Button primary on:click={handleLogOut}>
      <SignOutIcon />
      <span>Log out</span>
    </Button>
  </div>
</SectionFrame>
