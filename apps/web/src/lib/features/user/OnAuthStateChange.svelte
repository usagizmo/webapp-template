<script lang="ts">
  import type { AuthSession } from '@supabase/supabase-js';
  import { onMount } from 'svelte';

  import { supabase } from '$lib/supabase';

  import { getUser } from './userRequests';
  import { userStore } from './userStore.svelte';

  let session = $state<AuthSession | null>(null);

  $effect(() => {
    if (!session) {
      userStore.user = null;
      return;
    }

    getUser(session.user.id).then(({ user }) => {
      userStore.user = user;
    });
  });

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    });
  });
</script>
