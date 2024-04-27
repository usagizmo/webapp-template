<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  let {
    oninput,
    label = '',
    type = 'text',
    value = '',
    error = {},
  }: {
    oninput: HTMLInputAttributes['oninput'];
    label?: string;
    type?: HTMLInputAttributes['type'];
    value?: string;
    error?: { required?: string };
  } = $props();

  const classes = 'w-full rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5';
  let isDirty = $state(false);

  /**
   * Set the isDirty flag for the input
   */
  function handleDirty() {
    isDirty = true;
  }
</script>

<div>
  <label>
    <span class="mb-1 block font-semibold">{label}</span>
    {#if type === 'password'}
      <input type="password" class={classes} {oninput} onblur={handleDirty} {value} />
    {:else}
      <input type="text" class={classes} {oninput} onblur={handleDirty} {value} />
    {/if}
  </label>
  {#if error.required && isDirty && !value}
    <div class="mt-1 text-sm text-red-600">{error.required}</div>
  {/if}
</div>
