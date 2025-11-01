<script lang="ts">
  import Loader2Icon from '@lucide/svelte/icons/loader-2';
  import LogInIcon from '@lucide/svelte/icons/log-in';
  import * as Form from '@repo/shared/components/ui/form';
  import { Input } from '@repo/shared/components/ui/input';
  import { toast } from 'svelte-sonner';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { LoginSchema } from '$lib/schemas/auth';
  import { userStore } from '$lib/stores';

  const loginFormData = superForm(
    defaults({ email: 'email@add.com', password: 'password0' }, zod4(LoginSchema)),
    {
      SPA: true,
      validators: zod4(LoginSchema),
      onUpdate: async ({ form }) => {
        if (!form.valid) return;
        const data = form.data;
        const { error } = await userStore.signIn(data.email, data.password);
        if (error) {
          toast.error(error.message);
        }
      },
    },
  );
  const { form, enhance, submitting } = loginFormData;
</script>

<form use:enhance class="grid gap-6">
  <Form.Field form={loginFormData} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} type="email" placeholder="your@email.com" bind:value={$form.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field form={loginFormData} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input
          {...props}
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          bind:value={$form.password}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <div class="flex justify-center">
    <Form.Button disabled={$submitting}>
      {#if $submitting}
        <Loader2Icon class="animate-spin" />
        Logging in...
      {:else}
        <LogInIcon />
        Login
      {/if}
    </Form.Button>
  </div>
</form>
