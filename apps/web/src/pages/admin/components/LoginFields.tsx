import type { FC } from 'react'
import { CONST } from 'constants/const'
import { ERROR } from 'constants/error'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { useAuth } from '@/hooks/useAuth'

type Inputs = {
  email: string
  password: string
}

const useLoginFields = () => {
  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } =
    useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    register,
    errors,
    handleSubmit,
  }
}

export const LoginFields: FC = () => {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    register,
    errors,
    handleSubmit,
  } = useLoginFields()

  return (
    <form
      onSubmit={handleSubmit(signInWithEmailAndPassword)}
      className="space-y-6"
    >
      <div className="flex flex-col">
        <Input
          registerReturn={register('email', {
            required: ERROR.REQUIRED('E-mail'),
            pattern: {
              value: CONST.REGEX_EMAIL,
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
              value: 6,
              message: ERROR.MIN_LENGTH('Password', 6),
            },
          })}
          fieldError={errors.password}
          type="password"
          label="Password"
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" primary>
          Log in
        </Button>
        <Button onClick={handleSubmit(createUserWithEmailAndPassword)}>
          Sign in
        </Button>
      </div>
    </form>
  )
}
