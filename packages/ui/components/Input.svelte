<script lang="ts">
  export let label = '';
  export let type = 'text';
  export let value = '';
  export let error = '';

  const typeAction = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<div>
  <label>
    <span class="mb-1 block font-semibold">{label}</span>
    <input
      use:typeAction
      bind:value
      class="w-full rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5"
    />
  </label>
  {#if error}
    <div class="mt-1 text-sm text-red-600">{error}</div>
  {/if}
</div>
