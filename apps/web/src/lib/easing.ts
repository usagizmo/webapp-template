import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export const myCrossfade = () =>
  crossfade({
    duration: 400,
    easing: quintOut,
  });
