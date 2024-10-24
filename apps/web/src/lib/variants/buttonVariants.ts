import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'font-ui inline-flex items-center justify-center space-x-1 rounded-md border px-5 py-2 text-sm duration-200 disabled:pointer-events-none disabled:opacity-40',
  variants: {
    primary: {
      true: 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700',
      false: 'border-zinc-300 bg-slate-50 hover:border-zinc-400 hover:bg-slate-100',
    },
  },
  defaultVariants: {
    primary: false,
  },
});
