<script lang="ts">
  import { LinkButton, SectionFrame } from 'ui';
  import MessageCards from './MessageCards.svelte';
</script>

<main class="px-4 pt-[68px] pb-20 md:pt-10">
  <div class="mx-auto max-w-[792px] space-y-5">
    <SectionFrame noPad="y">
      <div class="flex items-center justify-center py-5">
        <LinkButton href="/admin">Log in to send a message</LinkButton>
      </div>
    </SectionFrame>

    <SectionFrame noPad="y">
      <div class="pb-[14px]">
        <!-- attention -->
        <div class="flex items-center justify-center border-b border-slate-200 pt-2.5 pb-2">
          <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
        </div>

        <div>
          <MessageCards />
        </div>
      </div>
    </SectionFrame>
  </div>
</main>

<footer class="mt-4 px-4">
  <div class="mx-auto max-w-[1120px] border-t border-zinc-200 py-3 pb-4 text-center">
    <a
      href="https://usagizmo.com"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 text-sm text-zinc-500 hover:opacity-80"
    >
      @usagizmo
    </a>
  </div>
</footer>
