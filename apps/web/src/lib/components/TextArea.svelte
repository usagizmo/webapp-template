<script lang="ts">
  import type { FocusEventHandler } from 'svelte/elements';

  let {
    oninput,
    label = '',
    placeholder = '',
    value = '',
    error = {},
    onblur = () => {},
  }: {
    oninput: HTMLTextAreaElement['oninput'];
    label?: string;
    placeholder?: string;
    value?: string;
    error?: { required?: string };
    onblur?: FocusEventHandler<HTMLTextAreaElement>;
  } = $props();

  let isDirty = $state(false);

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    isDirty = true;
    onblur(event);
  };
</script>

<div class="w-full">
  <label>
    <span class="mb-1 block font-semibold">{label}</span>
    <textarea
      class="h-20 w-full rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5"
      {oninput}
      onblur={handleBlur}
      {placeholder}>{value}</textarea
    >
  </label>
  {#if error.required && isDirty && !value}
    <div class="mt-1 text-sm text-red-600">{error.required}</div>
  {/if}
</div>
