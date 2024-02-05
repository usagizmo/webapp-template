import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export interface ButtonProps {
  children: Snippet;
  href?: string;
  type?: HTMLButtonAttributes['type'];
  primary?: boolean;
  blank?: boolean;
  disabled?: boolean;
}
