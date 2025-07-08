<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
  <Card.Content class="flex items-center justify-center">
    <Button href="/auth/login" variant="outline">Log in to send a message</Button>
  </Card.Content>
</Card.Root>
