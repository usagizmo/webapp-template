<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SectionFrame from '$lib/components/SectionFrame.svelte';
</script>

<SectionFrame noPad="y">
  <div class="flex items-center justify-center py-5">
    <Button href="/admin/login">Log in to send a message</Button>
  </div>
</SectionFrame>
