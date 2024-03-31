<script lang="ts">
  let { size = 20 }: { size?: number } = $props();

  const style = $derived(`width: ${size}px; height: ${size}px;`);
</script>

<div
  class="relative flex items-center justify-center rounded-full bg-slate-50 shadow-md hover:bg-slate-100"
  {style}
>
  <span class="absolute h-[2px] w-[14px] -rotate-45 bg-zinc-900" />
  <span class="absolute h-[2px] w-[14px] rotate-45 bg-zinc-900" />
</div>
