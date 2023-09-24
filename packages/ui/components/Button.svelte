<script>
  export let href = '';

  /** @type {'button' | 'reset' | 'submit'} */
  export let type = 'button';
  export let primary = false;
  export let blank = false;
  export let disabled = false;

  $: element = href ? 'a' : 'button';
  $: kindClass = primary
    ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700'
    : 'border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100';
  $: classAttrs = `inline-flex items-center justify-center space-x-1 rounded-md border px-5 py-2 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40 ${kindClass}`;
  $: blankAttrs =
    href && blank
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};
</script>

{#if element === 'a'}
  <a {...blankAttrs} class={classAttrs} {href}>
    <slot />
  </a>
{:else}
  <button {type} class={classAttrs} {disabled} on:click>
    <slot />
  </button>
{/if}
