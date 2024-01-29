<script lang="ts">
  let {
    oninput,
    label = '',
    placeholder = '',
    value = '',
    error = {},
    onblur = () => {},
  } = $props<{
    oninput: HTMLTextAreaElement['oninput'];
    label?: string;
    placeholder?: string;
    value?: string;
    error?: { required?: string };
    onblur?: HTMLTextAreaElement['onblur'];
  }>();

  let isDirty = $state(false);

  /**
   * Set the isDirty flag for the input
   * @param event - InputEvent
   */
  function handleBlur(event: InputEvent) {
    isDirty = true;
    onblur(event)
  }
</script>

<div class="w-full">
  <label>
    <span class="mb-1 block font-semibold">{label}</span>
    <textarea class="w-full rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5 h-20" {oninput} onblur={handleBlur} {placeholder}>{value}</textarea>
  </label>
  {#if error.required && isDirty && !value}
    <div class="mt-1 text-sm text-red-600">{error.required}</div>
  {/if}
</div>
