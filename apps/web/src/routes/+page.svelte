<script lang="ts">
  import LinkButton from '$lib/features/ui/button/LinkButton.svelte';
</script>

<!-- <LinkButton href="https://github.com/usagizmo/webapp-template">GitHub</LinkButton> -->

<main class="pt-16 pb-20 md:pt-10">
  <div class="mx-auto max-w-[824px] space-y-9 px-4">
    <!-- Development -->
    <div>
      <section class="rounded-lg bg-slate-50 p-4">
        <div class="flex items-center justify-center">
          <LinkButton href="https://github.com/usagizmo/webapp-template"
            >Log in to send a message</LinkButton
          >
        </div>
      </section>
    </div>

    <!-- Commands -->
    <div>
      <h2 class="mb-4 text-2xl font-bold text-[#18181b] md:text-3xl">Development</h2>

      <pre class="overflow-auto rounded-2xl bg-[#1e293b] p-6"><code
          class="font-mono font-bold text-white"
          ><span class="text-[#7dd3fc]">pnpm</span> build     <span class="text-[#64748b]"
            ># Build and then output to `public/*`</span
          >
<span class="text-[#7dd3fc]">pnpm</span> dev       <span class="text-[#64748b]"
            ># Watch build files and launch browser-sync server on port 8000</span
          >
<span class="text-[#7dd3fc]">pnpm</span> lint      <span class="text-[#64748b]"># Linting</span>
<span class="text-[#7dd3fc]">pnpm</span> list:fix  <span class="text-[#64748b]"
            ># Format with `eslint --fix`</span
          >
<span class="text-[#7dd3fc]">pnpm</span> test      <span class="text-[#64748b]"># Testing</span>
<span class="text-[#7dd3fc]">pnpm</span> clean     <span class="text-[#64748b]"
            ># Delete `node_modules` etc.</span
          >

<span class="text-[#64748b]"># `commands/*`</span>
<span class="text-[#7dd3fc]">pnpm</span> clean-image  <span class="text-[#64748b]"
            ># Remove unused image files in `public/images/*`</span
          >
<span class="text-[#7dd3fc]">pnpm</span> deploy       <span class="text-[#64748b]"
            ># When deploying to a VPS such as DigitalOcean using `rsync`</span
          ></code
        ></pre>

      <!-- Buttons -->
      <div class="mt-9 flex items-center justify-center">
        <LinkButton href="https://github.com/usagizmo/webapp-template" primary>GitHub</LinkButton>
      </div>
    </div>
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
