import * as v from 'valibot';

export const ProfileSchema = v.object({
  bio: v.pipe(v.string(), v.maxLength(20, 'Bio must be within 20 characters')),
});
