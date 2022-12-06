<script lang="ts">
  export let href = '';
  export let type = '';
  export let primary = false;
  export let blank = false;
  export let warn = false;
  export let disabled = false;

  $: element = href ? 'a' : 'button';
  $: kindClass = primary
    ? 'bg-zinc-900 text-white hover:bg-zinc-700'
    : 'border border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100';
  $: warnClass = warn ? 'text-red-600 hover:bg-red-50 hover:border-red-400' : '';
  $: hrefAttr = href ? { href } : {};
  $: blankAttrs =
    href && blank
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};
  $: disabledAttr = disabled ? { disabled: true } : {};

  const typeAction = (node: HTMLButtonElement | HTMLAnchorElement) => {
    if (element !== 'button') return;
    if (!type) throw new Error('Button type is required when using a button element');
    node.type = type;
  };
</script>

<svelte:element
  this={element}
  use:typeAction
  {...hrefAttr}
  {...blankAttrs}
  {...disabledAttr}
  class="inline-flex items-center justify-center space-x-1 rounded-md px-5 py-2 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40 {kindClass} {warnClass}"
  on:click
>
  <slot />
</svelte:element>
