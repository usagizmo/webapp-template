<script lang="ts">
  import Loader2Icon from '@lucide/svelte/icons/loader-2';
  import UserRoundPlusIcon from '@lucide/svelte/icons/user-round-plus';
  import { toast } from 'svelte-sonner';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { SignupSchema } from '$lib/schemas/auth';
  import { userStore } from '$lib/stores';

  const signupFormData = superForm(
    defaults({ email: '', password: '', displayName: '' }, zod(SignupSchema)),
    {
      SPA: true,
      validators: zod(SignupSchema),
      onUpdate: async ({ form }) => {
        if (!form.valid) return;
        const data = form.data;
        const { error } = await userStore.signUp(data.email, data.password, data.displayName);
        if (error) {
          toast.error(error.message);
        }
      },
    },
  );
  const { form, enhance, submitting } = signupFormData;
</script>

<form use:enhance class="grid gap-6">
  <Form.Field form={signupFormData} name="displayName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Display Name</Form.Label>
        <Input {...props} type="text" placeholder="Your name" bind:value={$form.displayName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field form={signupFormData} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} type="email" placeholder="your@email.com" bind:value={$form.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field form={signupFormData} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input
          {...props}
          type="password"
          placeholder="••••••••"
          autocomplete="new-password"
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
        Creating Account...
      {:else}
        <UserRoundPlusIcon />
        Create Account
      {/if}
    </Form.Button>
  </div>
</form>
