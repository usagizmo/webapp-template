<script lang="ts">
  import SignOutIcon from '$lib/components/icons/16x16/SignOutIcon.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import { signOut } from '$lib/features/user/userRequests';
  import { type User, userStore } from '$lib/features/user/userStore.svelte';
  import { buttonVariants } from '$lib/variants/buttonVariants';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';

  const {
    user,
  }: {
    user: User;
  } = $props();

  let tempInputs = $state({
    bio: user.bio ?? '',
  });

  /**
   * Log out the user
   */
  async function handleLogOut() {
    const { error } = await signOut();
    if (error) alert(error.message);
  }

  /**
   * Update the user's bio
   */
  async function handleUpdate() {
    const currentBio = user.bio ?? '';
    if (currentBio === tempInputs.bio) return;

    const { error } = await userStore.updateUser(user.id, { bio: tempInputs.bio });
    if (error) alert(error.message);
  }
</script>

<section class={sectionFrameVariants()}>
  <div class="flex flex-col items-center justify-center">
    <p class="text-4xl font-bold">{user.displayName}</p>
    <p>{user.email}</p>
    <div class="mt-4 w-full">
      <TextArea
        placeholder="bio"
        value={tempInputs.bio}
        oninput={(event) => (tempInputs.bio = (event.target as HTMLInputElement).value)}
        onblur={handleUpdate}
      />
    </div>
  </div>
  <div class="mt-8 flex items-center justify-center">
    <button class={buttonVariants({ primary: true })} onclick={handleLogOut}>
      <SignOutIcon />
      <span>Log out</span>
    </button>
  </div>
</section>
