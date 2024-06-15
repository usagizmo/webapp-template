<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { userStore } from '$lib/features/user/userStore.svelte';

  import LoginMessage from '../LoginMessage.svelte';
  import LoggedInMessage from './LoggedInMessage.svelte';

  const meta = {
    title: `Admin | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin',
  };
</script>

<Meta {...meta} />

{#if userStore.user}
  <LoggedInMessage user={userStore.user} />
{:else}
  <LoginMessage />
{/if}
