<script lang="ts">
  import { buttonVariants } from '$lib/variants/buttonVariants';
  import { sectionFrameVariants } from '$lib/variants/sectionFrameVariants';
</script>

<section class={sectionFrameVariants({ pad: 'x' })}>
  <div class="flex items-center justify-center py-5">
    <a class={buttonVariants()} href="/admin/login">Log in to send a message</a>
  </div>
</section>
