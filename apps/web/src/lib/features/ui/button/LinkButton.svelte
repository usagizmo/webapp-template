<script lang="ts">
  export let href = '';
  export let primary = false;

  $: classes = primary ? 'bg-[#18181b] text-white' : 'bg-slate-50 border border-[#d4d4d8]';
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex rounded-md px-5 py-2 text-sm hover:opacity-80 {classes}"
>
  <slot />
</a>
