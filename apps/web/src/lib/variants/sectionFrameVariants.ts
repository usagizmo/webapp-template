import { tv } from 'tailwind-variants';

export const sectionFrameVariants = tv({
  base: 'rounded-lg bg-slate-50',
  variants: {
    pad: {
      x: 'px-6',
      xb: 'px-6 pb-6',
      default: 'p-6',
    },
  },
  defaultVariants: {
    pad: 'default',
  },
});
