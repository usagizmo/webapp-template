import * as v from 'valibot';

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(6, 'Password must be at least 6 characters long')),
});

export const SignupSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(6, 'Password must be at least 6 characters long')),
  displayName: v.pipe(
    v.string(),
    v.minLength(1, 'Please enter a display name'),
    v.maxLength(50, 'Display name must be within 50 characters'),
  ),
});
