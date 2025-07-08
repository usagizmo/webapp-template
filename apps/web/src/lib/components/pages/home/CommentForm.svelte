<script lang="ts">
  import { tick } from 'svelte';

  import PaperPlaneIcon from '$lib/components/icons/16x16/PaperPlaneIcon.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Textarea } from '$lib/components/ui/textarea';
  import { commentStore } from '$lib/stores';

  let textAreaEl = $state<HTMLTextAreaElement | null>(null);
  let isSending = $state(false);
  let text = $state('');
  let file = $state<File>();

  /**
   * Send the comment
   */
  async function handleSend(): Promise<void> {
    if (!text) {
      textAreaEl?.focus();
      return;
    }

    // before
    isSending = true;

    const { error } = await commentStore.insertComment(text, file);
    if (error) {
      console.error('Comment insert error:', error);
      isSending = false;
      return;
    }

    // after
    isSending = false;

    text = '';
    file = undefined;

    await tick();
    textAreaEl?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.metaKey && event.key === 'Enter') {
      handleSend();
    }
  }

  function handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    file = target.files?.[0] ?? undefined;

    target.value = '';
  }
</script>

<Card.Root class="py-4">
  <Card.Content>
    <div class="gap flex gap-1.5">
      <Textarea
        bind:ref={textAreaEl}
        class="h-24"
        placeholder="Write a comment..."
        bind:value={text}
        onkeydown={handleKeyDown}
        disabled={isSending}
      ></Textarea>
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          class="peer sr-only"
          onchange={handleFileChange}
          disabled={isSending}
        />
        {#if file}
          {@const blobUrl = URL.createObjectURL(file)}
          <img
            class="h-24 w-32 cursor-pointer rounded-md border border-slate-200 duration-200 hover:brightness-90 peer-disabled:pointer-events-none peer-disabled:opacity-40"
            src={blobUrl}
            alt=""
          />
        {:else}
          <span
            class=" grid h-24 w-32 cursor-pointer place-content-center rounded-md border border-slate-200 bg-gray-100 text-zinc-500 duration-200 hover:brightness-95 peer-disabled:pointer-events-none peer-disabled:opacity-40"
            >+Add</span
          >
        {/if}
      </label>
    </div>
    <div class="mt-2.5 text-right">
      <Button onclick={handleSend} disabled={!text || isSending}>
        <PaperPlaneIcon />
        <span>Send</span>
      </Button>
    </div>
  </Card.Content>
</Card.Root>
