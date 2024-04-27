<script lang="ts">
  import { userStore } from '$lib/features/user/userStore.svelte';
  import type { User } from '$lib/features/user/userStore.svelte';
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
    await userStore.logOut();
  }

  /**
   * Update the user's bio
   */
  async function handleUpdate() {
    const storeBio = user.bio;
    if (storeBio === tempBio) return;

    const { error } = await userStore.updateUser(user.id, { bio: tempBio });
    if (error) {
      alert(error.message);
      return;
    }
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
    <Button primary onclick={handleLogOut}>
      <SignOutIcon />
      <span>Log out</span>
    </Button>
  </div>
</SectionFrame>
