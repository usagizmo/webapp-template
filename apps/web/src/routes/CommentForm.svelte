<script lang="ts">
  import { GQL_InsertComment } from '$houdini';
  import { Button, PaperPlaneIcon, SectionFrame } from 'ui';

  let text = '';

  const handleSend = () => {
    GQL_InsertComment.mutate({ text });
  };
</script>

<SectionFrame noPad="y">
  <div class="py-3">
    <div class="gap flex gap-1.5">
      <textarea
        class="h-24 flex-1 rounded-md border border-zinc-300 py-2 px-2.5 placeholder:text-zinc-300"
        placeholder="Write a comment..."
        bind:value={text}
      />
      <button
        class="grid h-24 w-32 place-content-center rounded-md border border-slate-200 bg-gray-100 text-zinc-500 duration-200 hover:bg-gray-200"
        >+Add</button
      >
    </div>
    <div class="mt-2.5 text-right">
      <Button type="button" primary on:click={handleSend}>
        <PaperPlaneIcon />
        <span>Send</span>
      </Button>
    </div>
  </div>
</SectionFrame>
