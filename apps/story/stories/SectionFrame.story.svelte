<script lang="ts">
  import type { Hst as HstType } from '@histoire/plugin-svelte';
  import { SectionFrame } from 'ui';

  export let Hst: HstType;

  let text = 'Content';
  let noPad = '';
  let source: string;

  $: {
    source = `<SectionFrame`;
    if (noPad) {
      source += noPad === 'true' ? ` noPad` : ` noPad="${noPad}"`;
    }
    source += `>${text}</SectionFrame>`;
  }
</script>

<Hst.Story layout={{ type: 'grid', width: 400 }}>
  <Hst.Variant {source} title="default">
    <svelte:fragment slot="controls">
      <Hst.Text bind:value={text} title="Text" />
      <Hst.Radio
        options={[
          {
            label: 'false',
            value: '',
          },
          {
            label: 'true',
            value: 'true',
          },
          {
            label: 'y',
            value: 'y',
          },
          {
            label: 'top',
            value: 'top',
          },
        ]}
        bind:value={noPad}
        title="noPad"
      />
    </svelte:fragment>

    <SectionFrame {noPad}>{text}</SectionFrame>
  </Hst.Variant>

  <Hst.Variant title="noPad">
    <SectionFrame noPad>{text}</SectionFrame>
  </Hst.Variant>

  <Hst.Variant title={`noPad="y"`}>
    <SectionFrame noPad="y">{text}</SectionFrame>
  </Hst.Variant>

  <Hst.Variant title={`noPad="top"`}>
    <SectionFrame noPad="top">{text}</SectionFrame>
  </Hst.Variant>
</Hst.Story>
