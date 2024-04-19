<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { defaultDE } from '$lib/easing';
  import { ROUTE } from '$lib/routes';
  import { store } from '$lib/store.svelte';
  import Input from '$lib/components/Input.svelte';

  const isSignUpPage = $derived($page.url.pathname === ROUTE.ADMIN_SIGNUP);
</script>

<div class="[&>*]:mb-3">
  {#if isSignUpPage}
    <div transition:slide={defaultDE}>
      <Input
        label="Display Name"
        type="text"
        value={store.userInputs.displayName}
        oninput={(event) => store.setUserInputs({ displayName: (event.target as HTMLInputElement).value })}
        error={{ required: 'Display Name is required.' }}
      />
    </div>
  {/if}
  <Input
    label="Email"
    type="email"
    value={store.userInputs.email}
    oninput={(event) => store.setUserInputs({ email: (event.target as HTMLInputElement).value })}
    error={{ required: 'E-mail is required.' }}
  />
  <Input
    label="Password"
    type="password"
    value={store.userInputs.password}
    oninput={(event) => store.setUserInputs({ password: (event.target as HTMLInputElement).value })}
    error={{ required: 'Password is required.' }}
  />
</div>
