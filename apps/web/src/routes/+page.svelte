<script lang="ts">
  import LinkButton from '$lib/features/ui/buttons/LinkButton.svelte';
  import MessageCards from './MessageCards.svelte';
</script>

<main class="pt-[68px] pb-20 md:pt-10">
  <div class="mx-auto max-w-[824px] px-4">
    <section class="rounded-lg bg-slate-50 p-4">
      <div class="flex items-center justify-center">
        <LinkButton href="/admin" blank>Log in to send a message</LinkButton>
      </div>
    </section>

    <section class="mt-5 rounded-lg bg-slate-50 px-6 pb-[14px]">
      <!-- attention -->
      <div class="flex items-center justify-center border-b border-[#e2e8f0] pt-2.5 pb-2">
        <p class="text-sm text-[#71717a]">Comments will be deleted as appropriate.</p>
      </div>

      <div>
        <MessageCards />
      </div>
    </section>
  </div>
</main>

<footer class="border-[bg-[#18181b] mt-4 border-t pb-4 text-center">
  <div class="mx-auto max-w-[1152px] py-3 px-4">
    <a
      href="https://usagizmo.com"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 text-sm text-[#71717a] hover:opacity-80"
    >
      @usagizmo
    </a>
  </div>
</footer>
