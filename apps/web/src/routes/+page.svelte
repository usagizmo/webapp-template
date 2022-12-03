<script lang="ts">
  import LinkButton from '$lib/features/ui/buttons/LinkButton.svelte';
  import MessageCards from './MessageCards.svelte';
</script>

<main class="px-4 pt-[68px] pb-20 md:pt-10">
  <div class="mx-auto max-w-[792px]">
    <section class="rounded-lg bg-slate-50 p-4">
      <div class="flex items-center justify-center">
        <LinkButton href="/admin" blank>Log in to send a message</LinkButton>
      </div>
    </section>

    <section class="mt-5 rounded-lg bg-slate-50 px-6 pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-slate-200 pt-2.5 pb-2">
        <p class="text-sm text-zinc-500">Comments will be deleted as appropriate.</p>
      </div>

      <div>
        <MessageCards />
      </div>
    </section>
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
