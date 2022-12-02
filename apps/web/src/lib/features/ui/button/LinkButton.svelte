<script lang="ts">
  export let href = '';
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex rounded-md bg-[#18181b] px-5 py-2 text-sm text-white hover:bg-opacity-80"
>
  <slot />
</a>
