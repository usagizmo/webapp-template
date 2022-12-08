<script lang="ts">
  export let noPad: boolean | string = false;

  $: padClass = (() => {
    switch (noPad) {
      case 'y':
        return 'px-6';
      case 'top':
        return 'px-6 pb-6';
      case true:
        return '';
      default:
        return 'p-6';
    }
  })();
</script>

<section class="rounded-lg bg-slate-50 {padClass}"><slot /></section>
