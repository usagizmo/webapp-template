<script lang="ts">
  import type { AuthSession } from '@supabase/supabase-js';
  import { onMount } from 'svelte';

  import { getUser } from '$lib/features/user/userRequests';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import { supabase } from '$lib/supabase';

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
