<script>
  export let label = '';
  export let type = 'text';
  export let value = '';

  /** @type {{ required?: string }} */
  export let error = {};

  let classes = 'w-full rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5';
  let isDirty = false;

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
      <input type="password" class={classes} bind:value on:blur={handleDirty} />
    {:else}
      <input type="text" class={classes} bind:value on:blur={handleDirty} />
    {/if}
  </label>
  {#if error.required && isDirty && !value}
    <div class="mt-1 text-sm text-red-600">{error.required}</div>
  {/if}
</div>
