import { quintOut } from 'svelte/easing';

export const defaultDE = {
  duration: 450,
  easing: quintOut,
} as const satisfies {
  duration: number;
  easing: (t: number) => number;
};
