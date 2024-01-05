<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, noPad = '' } = $props<{
    children: Snippet;
    noPad?: 'y' | 'top' | '';
  }>();

  /**
   * Get the padding class based on the `noPad` prop
   * @returns The padding class
   */
  function getPadClass(): string {
    switch (noPad) {
      case 'y':
        return 'px-6';
      case 'top':
        return 'px-6 pb-6';
      default:
        return 'p-6';
    }
  }

  const padClass = $derived(getPadClass());
</script>

<section class="rounded-lg bg-slate-50 {padClass}">
  {@render children()}
</section>
