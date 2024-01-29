<script lang="ts">
  import Button from '../../../../web/src/lib/components/Button.svelte';
  import type { ButtonProps } from '../../../../web/src/lib/components/types';
  import PaperPlaneIcon from '../../../../web/src/lib/components/icons/16x16/PaperPlaneIcon.svelte';

  const { ...props } = $props<ButtonProps>();
</script>

<div class="flex gap-1">
  <Button {...props}>Click me!</Button>

  <Button {...props}>
    <PaperPlaneIcon />
  </Button>

  <Button {...props}>
    <PaperPlaneIcon />
    <span>Click me!</span>
  </Button>
</div>
