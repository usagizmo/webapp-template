<script lang="ts">
  import SendIcon from '@lucide/svelte/icons/send';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button, buttonVariants } from '@repo/shared/components/ui/button';
  import * as Card from '@repo/shared/components/ui/card';
  import { Textarea } from '@repo/shared/components/ui/textarea';
  import { tick } from 'svelte';

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

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    file = target.files?.[0] ?? undefined;

    target.value = '';
  }

  function handleRemoveFile(event: MouseEvent) {
    event.preventDefault();
    file = undefined;
  }
</script>

<Card.Root class="py-4">
  <Card.Content>
    <div class="gap flex gap-1.5">
      <div class="flex-1">
        <Textarea
          bind:ref={textAreaEl}
          class="h-24"
          placeholder="Write a comment..."
          bind:value={text}
          onkeydown={handleKeyDown}
          disabled={isSending}
        ></Textarea>
      </div>
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
          <div class="group relative">
            <img
              class="h-24 w-32 cursor-pointer rounded-md border border-slate-200 duration-200 hover:brightness-90 peer-disabled:pointer-events-none peer-disabled:opacity-40"
              src={blobUrl}
              alt=""
            />
            <Button
              variant="secondary"
              size="icon"
              class="not-group-hover:opacity-0 absolute right-[-8px] top-[-8px] size-6 rounded-full transition-none"
              onclick={handleRemoveFile}
            >
              <XIcon class="size-4" />
            </Button>
          </div>
        {:else}
          <span class={buttonVariants({ variant: 'secondary', class: 'h-24 w-32' })}> ＋Add </span>
        {/if}
      </label>
    </div>
    <div class="mt-2.5 text-right">
      <Button onclick={handleSend} disabled={!text || isSending}>
        <SendIcon />
        <span>Send</span>
      </Button>
    </div>
  </Card.Content>
</Card.Root>
