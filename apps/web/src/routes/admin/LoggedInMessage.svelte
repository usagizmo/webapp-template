<script lang="ts">
  import { Button, SectionFrame, SignOutIcon, TextArea } from '@repo/ui';
  import { logOut } from '$lib/nhost';
  import { store } from '$lib/store.svelte';
import type {User} from '$lib/store.svelte';
  import { UpdateBio } from '$lib/$generated/graphql';

  const { user } = $props<{
    user: User
  }>();

  let tempBio = $state(user.profile!.bio);

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
    const storeBio = store.user?.profile?.bio ?? '';
    if (storeBio === tempBio) return;

    const { data } = await UpdateBio({
      variables: {
        id: user.id,
        bio: tempBio,
      }
    })

    const nextBio = data?.updateProfile?.bio ?? '';

    tempBio = nextBio;
    store.setUserBio(nextBio);
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
