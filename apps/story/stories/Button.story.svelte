<script lang="ts">
  import type { Hst as HstType } from '@histoire/plugin-svelte';
  import { logEvent } from 'histoire/client';
  import { Button, PaperPlaneIcon } from 'ui';

  export let Hst: HstType;

  let text = 'Button';
  let primary = false;
  let disabled = false;
  let warn = false;
  let source: string;

  $: {
    source = `<Button`;
    if (primary) {
      source += ` primary`;
    }
    if (disabled) {
      source += ` disabled`;
    }
    if (warn) {
      source += ` warn`;
    }
    source += `>${text}</Button>`;
  }
</script>

<Hst.Story layout={{ type: 'grid' }}>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={text} title="Text" />
    <Hst.Checkbox bind:value={primary} title="Primary" />
    <Hst.Checkbox bind:value={disabled} title="Disabled" />
    <Hst.Checkbox bind:value={warn} title="Warn" />
  </svelte:fragment>

  <Hst.Variant title="default" {source}>
    <Button {primary} {disabled} {warn} on:click={(event) => logEvent('click', event)}
      >{text}</Button
    >
  </Hst.Variant>

  <Hst.Variant title="icon">
    <Button {primary} {disabled} {warn} on:click={(event) => logEvent('click', event)}>
      <PaperPlaneIcon />
    </Button>
  </Hst.Variant>

  <Hst.Variant title="icon text">
    <Button {primary} {disabled} {warn} on:click={(event) => logEvent('click', event)}>
      <PaperPlaneIcon />
      <span>{text}</span>
    </Button>
  </Hst.Variant>
</Hst.Story>
