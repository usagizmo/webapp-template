<script lang="ts">
  export let noPad: 'y' | 'top' | '' = '';

  $: padClass = (() => {
    switch (noPad) {
      case 'y':
        return 'px-6';
      case 'top':
        return 'px-6 pb-6';
      default:
        return 'p-6';
    }
  })();
</script>

<section class="rounded-lg bg-slate-50 {padClass}"><slot /></section>
