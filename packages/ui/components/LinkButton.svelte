<script lang="ts">
  export let href = '';
  export let primary = false;
  export let blank = false;
  export let warn = false;

  $: kindClass = primary
    ? 'bg-zinc-900 text-white hover:bg-zinc-700'
    : 'border border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100';
  $: warnClass = warn ? 'text-red-600 hover:bg-red-50 hover:border-red-400' : '';
  $: blankAttrs = blank
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};
</script>

<a
  {href}
  {...blankAttrs}
  class="inline-flex rounded-md px-5 py-2 text-sm duration-200 {kindClass} {warnClass}"
>
  <slot />
</a>
