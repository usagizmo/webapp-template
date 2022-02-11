import React, { VFC } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/input'
import { ERROR } from '@/constants/error'
import { Button } from '@/components/button'
import { CONST } from '@/constants/const'
import { useAuth } from '@/hooks/use-auth'

type Inputs = {
  email: string
  password: string
}

export const LoginFields: VFC = () => {
  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } =
    useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  return (
    <form
      onSubmit={handleSubmit(signInWithEmailAndPassword)}
      className="space-y-[24px]"
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
      <div className="flex space-x-[16px]">
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
