<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '../../../utils/shadcnUtils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card-action"
  class={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
  {...restProps}
>
  {@render children?.()}
</div>
