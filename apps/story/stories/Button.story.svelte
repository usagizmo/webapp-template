<script lang="ts">
  import type { Hst as HstType } from '@histoire/plugin-svelte';
  import { Button } from 'ui';

  export let Hst: HstType;
</script>

<Hst.Story>
  <Button>Simple</Button>
</Hst.Story>
