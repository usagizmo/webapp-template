<script lang="ts">
  export let noPad: boolean | string = false;

  $: pad = (() => {
    switch (noPad) {
      case 'x':
        return 'py-6';
      case 'y':
        return 'px-6';
      case true:
        return '';
      default:
        return 'p-6';
    }
  })();
</script>

<section class="rounded-lg bg-slate-50 {pad}"><slot /></section>
