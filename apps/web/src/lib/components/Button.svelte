<script lang="ts" context="module">
  export interface ButtonProps {
    children: Snippet;
    href?: string;
    type?: HTMLButtonAttributes['type'];
    primary?: boolean;
    blank?: boolean;
    disabled?: boolean;
    onclick?: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let {
    children,
    href = '',
    type = 'button',
    primary = false,
    blank = false,
    disabled = false,
    onclick = () => {},
  }: ButtonProps = $props();

  const element = $derived(href ? 'a' : 'button');
  const kindClass = $derived(
    primary
      ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700'
      : 'border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100',
  );
  const classAttrs = $derived(
    `font-ui inline-flex items-center justify-center space-x-1 rounded-md border py-2 px-5 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40 ${kindClass}`,
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
  <button {type} class={classAttrs} {disabled} {onclick}>
    {@render children()}
  </button>
{/if}
