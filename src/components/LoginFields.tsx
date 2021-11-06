import React from 'react'
import { useForm } from 'react-hook-form'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import Input from './Input'
import ERROR from '../constants/error'
import Button from './Button'
import CONST from '../constants/const'

type Inputs = {
  email: string
  password: string
}

export default function App() {
  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = useFirebaseAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(signInWithEmailAndPassword)} className="space-y-[24px]">
      <div className="flex flex-col">
        <Input
          registerReturn={register('email', {
            required: ERROR.REQUIRED('E-mail'),
            pattern: { value: CONST.REGEX_EMAIL, message: ERROR.PATTERN('E-mail') },
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
        <Button type="button" onClick={handleSubmit(createUserWithEmailAndPassword)}>
          Sign in
        </Button>
      </div>
    </form>
  )
}
