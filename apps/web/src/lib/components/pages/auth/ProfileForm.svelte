<script lang="ts">
  import * as Form from '@repo/shared/components/ui/form';
  import { Textarea } from '@repo/shared/components/ui/textarea';
  import { toast } from 'svelte-sonner';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';

  import { ProfileSchema } from '$lib/schemas/profile';
  import { userStore } from '$lib/stores';

  const profileFormData = superForm(
    defaults(
      {
        bio: userStore.profile?.bio ?? '',
      },
      zod4(ProfileSchema),
    ),
    {
      SPA: true,
      validators: zod4(ProfileSchema),
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
  const { form, enhance, submit, tainted } = profileFormData;
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
          onblur={() => {
            if ($tainted?.bio) {
              submit();
            }
          }}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
