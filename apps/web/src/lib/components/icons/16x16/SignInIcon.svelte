<script lang="ts">
  let { size = 16 }: { size?: number } = $props();

  const style = $derived(`width: ${size}px; height: ${size}px;`);
</script>

<svg width="192" height="192" viewBox="0 0 256 256" class="fill-current" {style}
  ><rect width="256" height="256" fill="none" /><path
    d="M141.7,133.7l-42,42A8.3,8.3,0,0,1,94,178a7.7,7.7,0,0,1-3-.6,8,8,0,0,1-5-7.4V136H24a8,8,0,0,1,0-16H86V86a8,8,0,0,1,5-7.4,8.2,8.2,0,0,1,8.7,1.7l42,42A8.1,8.1,0,0,1,141.7,133.7ZM192,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h56a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"
  /></svg
>
