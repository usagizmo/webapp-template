import { z } from 'zod';

export const ProfileSchema = z.object({
  bio: z.string().max(20, 'Bio must be within 20 characters'),
});
