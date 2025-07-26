<script lang="ts">
  import * as FormPrimitive from 'formsnap';

  import { cn, type WithoutChild } from '../../../utils/shadcnUtils.js';
  import { Label } from '../label/index.js';

  let {
    ref = $bindable(null),
    children,
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.LabelProps> = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
  {#snippet child({ props })}
    <Label
      {...props}
      data-slot="form-label"
      class={cn('data-[fs-error]:text-destructive', className)}
    >
      {@render children?.()}
    </Label>
  {/snippet}
</FormPrimitive.Label>
