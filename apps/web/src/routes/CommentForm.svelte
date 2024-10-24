<script lang="ts">
  import { tick } from 'svelte';

  import PaperPlaneIcon from '$lib/components/icons/16x16/PaperPlaneIcon.svelte';
  import { commentStore } from '$lib/features/comment/commentStore.svelte';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import { buttonVariants } from '$lib/variants/buttonVariants';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';

  let textAreaEl = $state<HTMLTextAreaElement>();
  let isSending = $state(false);
  let text = $state('');
  let file = $state<File>();

  /**
   * Send the comment
   */
  async function handleSend(): Promise<void> {
    if (!userStore.user) {
      alert('Please log in');
      window.location.reload();
      return;
    }

    if (!text) {
      textAreaEl?.focus();
      return;
    }

    // before
    isSending = true;

    const { error } = await commentStore.insertComment({ text, file });
    if (error) {
      alert(error.message);
      window.location.reload();
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

<section class={sectionFrameVariants({ pad: 'x' })}>
  <div class="py-3">
    <div class="gap flex gap-1.5">
      <textarea
        bind:this={textAreaEl}
        class="h-24 flex-1 rounded-md border border-zinc-300 bg-slate-50 px-2.5 py-2 placeholder:text-zinc-300 disabled:bg-slate-100"
        placeholder="Write a comment..."
        bind:value={text}
        onkeydown={handleKeyDown}
        disabled={isSending}
      ></textarea>
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
            class="font-ui grid h-24 w-32 cursor-pointer place-content-center rounded-md border border-slate-200 bg-gray-100 text-zinc-500 duration-200 hover:brightness-95 peer-disabled:pointer-events-none peer-disabled:opacity-40"
            >+Add</span
          >
        {/if}
      </label>
    </div>
    <div class="mt-2.5 text-right">
      <button
        class={buttonVariants({ primary: true })}
        onclick={handleSend}
        disabled={!text || isSending}
      >
        <PaperPlaneIcon />
        <span>Send</span>
      </button>
    </div>
  </div>
</section>
