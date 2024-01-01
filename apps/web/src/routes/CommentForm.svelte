<script lang="ts">
  import { tick } from 'svelte';
  import { Button, PaperPlaneIcon, SectionFrame } from '@repo/ui';
  import { nhost } from '$lib/nhost';

  let textAreaEl: HTMLTextAreaElement;

  let isSending = false;
  let text = '';

  let files: FileList | null = null;

  $: file = (files?.[0] ?? null) as File | null;

  const insertComment = `
    mutation ($text: String!, $fileId: String) {
      insert_comments(objects: {text: $text, fileId: $fileId}) {
        returning {
          id
        }
      }
    }
  `;

  /**
   * Send the comment
   */
  async function handleSend(): Promise<void> {
    if (!text) {
      textAreaEl.focus();
      return;
    }

    // before
    isSending = true;

    let fileId: string | null = null;

    if (file) {
      const { fileMetadata, error } = await nhost.storage.upload({ file });
      if (error) {
        alert(error.message);
        return;
      }

      fileId = fileMetadata.id ?? null;
      if (!fileId) {
        alert('File ID not found');
        return;
      }
    }

    const { error } = await nhost.graphql.request(insertComment, { text, fileId });

    if (error) {
      alert(Array.isArray(error) ? error.map((e) => e.message).join(', ') : error.message);
      window.location.reload();
      return;
    }

    text = '';
    files = null;

    // after
    isSending = false;
    await tick();
    textAreaEl.focus();
  }

  const handleKeyDown = (e: KeyboardEvent): void => {
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
        class="h-24 flex-1 rounded-md border border-zinc-300 bg-slate-50 px-2.5 py-2 placeholder:text-zinc-300 disabled:bg-slate-100"
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
            >+Add</span
          >
        {/if}
      </label>
    </div>
    <div class="mt-2.5 text-right">
      <Button primary on:click={handleSend} disabled={!text || isSending}>
        <PaperPlaneIcon />
        <span>Send</span>
      </Button>
    </div>
  </div>
</SectionFrame>
