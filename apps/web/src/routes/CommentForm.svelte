<script lang="ts">
  import { GQL_InsertComment } from '$houdini';
  import { tick } from 'svelte';
  import { Button, PaperPlaneIcon, SectionFrame } from 'ui';

  let textAreaEl: HTMLTextAreaElement;
  let isSending = false;
  let text = '';

  const handleSend = async () => {
    isSending = true;
    await GQL_InsertComment.mutate({ text });
    text = '';
    isSending = false;
    await tick();
    textAreaEl.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'Enter') {
      handleSend();
    }
  };
</script>

<SectionFrame noPad="y">
  <div class="py-3">
    <div class="gap flex gap-1.5">
      <textarea
        bind:this={textAreaEl}
        class="h-24 flex-1 rounded-md border border-zinc-300 bg-slate-50 py-2 px-2.5 placeholder:text-zinc-300 disabled:bg-slate-100"
        placeholder="Write a comment..."
        bind:value={text}
        on:keydown={handleKeyDown}
        disabled={isSending}
      />
      <button
        class="grid h-24 w-32 place-content-center rounded-md border border-slate-200 bg-gray-100 text-zinc-500 duration-200 hover:bg-gray-200 disabled:opacity-40"
        disabled={isSending}>+Add</button
      >
    </div>
    <div class="mt-2.5 text-right">
      <Button type="button" primary on:click={handleSend} disabled={isSending}>
        <PaperPlaneIcon />
        <span>Send</span>
      </Button>
    </div>
  </div>
</SectionFrame>
