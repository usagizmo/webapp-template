<script lang="ts">
  import { store } from '$lib/store.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import LoginMessage from '../LoginMessage.svelte';
  import LoggedInMessage from './LoggedInMessage.svelte';

  const meta = {
    title: `Admin | WebApp Template (web)`,
    canonical: 'https://webapp-template.usagizmo.com/admin',
  };
</script>

<Meta {...meta} />

{#if store.user}
  <LoggedInMessage user={store.user} />
{:else}
  <LoginMessage />
{/if}
