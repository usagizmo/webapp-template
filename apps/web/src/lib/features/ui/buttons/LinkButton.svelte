<script lang="ts">
  export let href = '';
  export let primary = false;
  export let blank = false;
  export let warn = false;

  $: kindClass = primary ? 'bg-[#18181b] text-white' : 'bg-slate-50 border border-[#d4d4d8]';
  $: warnClass = warn ? 'text-[#dc2626]' : '';
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
  class="inline-flex rounded-md px-5 py-2 text-sm hover:opacity-80 {kindClass} {warnClass}"
>
  <slot />
</a>
