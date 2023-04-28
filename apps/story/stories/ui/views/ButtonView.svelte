<script>
  import { Button, PaperPlaneIcon } from 'ui';
</script>

<div class="flex gap-1">
  <Button {...$$props}>Click me!</Button>

  <Button {...$$props}>
    <PaperPlaneIcon />
  </Button>

  <Button {...$$props}>
    <PaperPlaneIcon />
    <span>Click me!</span>
  </Button>
</div>
