import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import type { Inputs } from '@/hooks/useAuth'
import { useAuth } from '@/hooks/useAuth'
import { ERROR, REGEX } from '@/validation'

export const LOGIN_FIELDS_TYPE = {
  SIGN_UP: 'sign-up',
  LOGIN: 'login',
} as const

export type LOGIN_FIELDS_TYPE =
  typeof LOGIN_FIELDS_TYPE[keyof typeof LOGIN_FIELDS_TYPE]

type Props = {
  type: LOGIN_FIELDS_TYPE
}

const useHook = () => {
  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } =
    useAuth()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      email: 'email@add.com',
      password: 'password',
    },
  })

  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    register,
    errors,
    handleSubmit,
  }
}

export const LoginFields: FC<Props> = ({ type }) => {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    register,
    errors,
    handleSubmit,
  } = useHook()

  return (
    <form
      onSubmit={handleSubmit(signInWithEmailAndPassword)}
      className="space-y-6"
    >
      {type === LOGIN_FIELDS_TYPE.SIGN_UP ? (
        <p className="text-sm text-gray-500">
          You can register as a member with an appropriate email
          address/password.
          <br />
          No email will be sent.
        </p>
      ) : (
        <p className="text-sm text-gray-500">
          Guest account
          <br />
          email: email@add.com
          <br />
          pass: password
        </p>
      )}
      {type === LOGIN_FIELDS_TYPE.SIGN_UP && (
        <div className="flex flex-col">
          <Input
            registerReturn={register('displayName', {
              required: ERROR.REQUIRED('Display Name'),
            })}
            fieldError={errors.displayName}
            type="text"
            label="Display Name"
            placeholder="e.g. Anonymous"
          />
        </div>
      )}
      <div className="flex flex-col">
        <Input
          registerReturn={register('email', {
            required: ERROR.REQUIRED('E-mail'),
            pattern: {
              value: REGEX.EMAIL,
              message: ERROR.PATTERN('E-mail'),
            },
          })}
          fieldError={errors.email}
          type="email"
          label="E-mail"
        />
      </div>
      <div className="flex flex-col">
        <Input
          registerReturn={register('password', {
            required: ERROR.REQUIRED('Password'),
            minLength: {
              value: 8,
              message: ERROR.MIN_LENGTH('Password', 8),
            },
          })}
          fieldError={errors.password}
          type="password"
          label="Password"
        />
      </div>
      <div className="flex space-x-4">
        {type === LOGIN_FIELDS_TYPE.SIGN_UP ? (
          <Button
            primary
            onClick={handleSubmit(createUserWithEmailAndPassword)}
          >
            Sign up
          </Button>
        ) : (
          <Button type="submit" primary>
            Login
          </Button>
        )}
      </div>
    </form>
  )
}
