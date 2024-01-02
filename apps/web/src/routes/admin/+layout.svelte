<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{
    children: Snippet;
  }>();
</script>

<div class="mx-auto max-w-[488px]">
  {@render children()}
</div>
