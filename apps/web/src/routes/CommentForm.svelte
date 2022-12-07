<script lang="ts">
  import { GQL_InsertComment } from '$houdini';
  import { nhost } from '$lib/nhost';
  import { tick } from 'svelte';
  import { Button, PaperPlaneIcon, SectionFrame } from 'ui';

  let textAreaEl: HTMLTextAreaElement;
  let isSending = false;
  let text = '';
  let files: FileList | null = null;
  $: file = files?.[0] ?? null;

  const exec = async (callback: () => Promise<void>) => {
    isSending = true;
    await callback();
    isSending = false;

    await tick();
    textAreaEl.focus();
  };

  const handleSend = async () => {
    if (!text) {
      textAreaEl.focus();
      return;
    }

    exec(async () => {
      let fileId: string | null = null;

      if (file) {
        const res = await nhost.storage.upload({ file });
        const errorMessage = res.error?.message;
        if (errorMessage) {
          alert(errorMessage);
          return;
        }

        fileId = res.fileMetadata?.id ?? null;
        if (!fileId) {
          alert('File ID not found');
          return;
        }
      }

      try {
        await GQL_InsertComment.mutate({ text, fileId });
      } catch (err) {
        const errorMessage = (err as { message?: string }[])[0]?.message;
        alert(errorMessage);
        window.location.reload();
        return;
      }
      text = '';
      files = null;
    });
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
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          bind:files
          class="peer sr-only"
          disabled={isSending}
        />
        {#if file}
          {@const blobUrl = URL.createObjectURL(file)}
          <img
            class="h-24 w-32 cursor-pointer rounded-md border border-slate-200 duration-200 hover:brightness-90 peer-disabled:pointer-events-none peer-disabled:opacity-40"
            src={blobUrl}
            alt={file.name}
            title={file.name}
          />
        {:else}
          <span
            class="grid h-24 w-32 cursor-pointer place-content-center rounded-md border border-slate-200 bg-gray-100 text-zinc-500 duration-200 hover:brightness-95 peer-disabled:pointer-events-none peer-disabled:opacity-40"
            disabled={isSending}>+Add</span
          >
        {/if}
      </label>
    </div>
    <div class="mt-2.5 text-right">
      <Button type="button" primary on:click={handleSend} disabled={!text || isSending}>
        <PaperPlaneIcon />
        <span>Send</span>
      </Button>
    </div>
  </div>
</SectionFrame>
