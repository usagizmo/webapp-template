<script lang="ts">
  import type { ButtonProps } from './types';

  let {
    children,
    href = '',
    type = 'button',
    primary = false,
    blank = false,
    disabled = false,
  }: ButtonProps = $props();

  const element = $derived(href ? 'a' : 'button');
  const kindClass = $derived(
    primary
      ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700'
      : 'border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100',
  );
  const classAttrs = $derived(
    `inline-flex items-center justify-center space-x-1 rounded-md border px-5 py-2 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40 ${kindClass}`,
  );
  const blankAttrs = $derived(
    href && blank
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {},
  );
</script>

{#if element === 'a'}
  <a {...blankAttrs} class={classAttrs} {href}>
    {@render children()}
  </a>
{:else}
  <button {type} class={classAttrs} {disabled} on:click>
    {@render children()}
  </button>
{/if}
