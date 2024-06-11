<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';
</script>

<section class={sectionFrameVariants({ pad: 'x' })}>
  <div class="flex items-center justify-center py-5">
    <Button href="/admin/login">Log in to send a message</Button>
  </div>
</section>
