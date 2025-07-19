<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import * as Form from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';
  import { ProfileSchema } from '$lib/schemas/profile';
  import { userStore } from '$lib/stores';

  const profileFormData = superForm(
    defaults(
      {
        bio: userStore.profile?.bio ?? '',
      },
      zod(ProfileSchema),
    ),
    {
      SPA: true,
      validators: zod(ProfileSchema),
      resetForm: false,
      onUpdate: async ({ form }) => {
        if (!form.valid) return;
        const { error } = await userStore.updateUserProfile({
          bio: form.data.bio,
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Profile updated successfully');
        }
      },
    },
  );
  const { form, enhance, submit } = profileFormData;
</script>

<form use:enhance class="grid gap-6">
  <Form.Field form={profileFormData} name="bio">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label for="bio">Bio</Form.Label>
        <Textarea
          {...props}
          placeholder="Tell us about yourself (within 20 characters)"
          rows={3}
          bind:value={$form.bio}
          onblur={() => submit()}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
