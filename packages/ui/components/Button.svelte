<script>
  export let href = '';
  export let type = '';
  export let primary = false;
  export let blank = false;
  export let disabled = false;

  $: element = href ? 'a' : 'button';
  $: typeAttr = type ? { type } : href ? {} : { type: 'button' };
  $: kindClass = primary
    ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700'
    : 'border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100';
  $: hrefAttr = href ? { href } : {};
  $: blankAttrs =
    href && blank
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};
  $: disabledAttr = disabled ? { disabled: true } : {};
</script>

<svelte:element
  this={element}
  {...typeAttr}
  {...hrefAttr}
  {...blankAttrs}
  {...disabledAttr}
  class="inline-flex items-center justify-center space-x-1 rounded-md border px-5 py-2 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40 {kindClass}"
  on:click
>
  <slot />
</svelte:element>
