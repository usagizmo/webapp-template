<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import Input from '$lib/components/Input.svelte';

  const isSignUpPage = $derived($page.url.pathname === ROUTE.ADMIN_SIGNUP);
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide={defaultDE}>
      <Input
        label="Display Name"
        type="text"
        value={userStore.userInputs.displayName}
        oninput={(event) => userStore.setUserInputs({ displayName: (event.target as HTMLInputElement).value })}
        error={{ required: 'Display Name is required.' }}
      />
    </div>
  {/if}
  <Input
    label="Email"
    type="email"
    value={userStore.userInputs.email}
    oninput={(event) => userStore.setUserInputs({ email: (event.target as HTMLInputElement).value })}
    error={{ required: 'E-mail is required.' }}
  />
  <Input
    label="Password"
    type="password"
    value={userStore.userInputs.password}
    oninput={(event) => userStore.setUserInputs({ password: (event.target as HTMLInputElement).value })}
    error={{ required: 'Password is required.' }}
  />
</div>
