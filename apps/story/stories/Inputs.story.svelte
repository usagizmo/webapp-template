<script lang="ts">
  import type { Hst as HstType } from '@histoire/plugin-svelte';
  import { Input } from 'ui';

  export let Hst: HstType;

  let label = 'Text';
  let value = '';
  let required = 'Text is required.';
</script>

<Hst.Story layout={{ type: 'grid', width: 280 }}>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={label} title="Label" />
    <Hst.Text bind:value title="Text" />
    <Hst.Text bind:value={required} title="Required" />
  </svelte:fragment>

  <Input {label} type="text" bind:value error={{ required }} />
</Hst.Story>
