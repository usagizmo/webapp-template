import React, { VFC } from 'react'
import { SwitchVerticalIcon } from '@heroicons/react/outline'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

interface Props {}

const LoginFields: VFC<Props> = () => {
  const { email, password, isLogin, onChangeEmail, onChangePassword, toggleIsLogin, login } =
    useFirebaseAuth()

  return (
    <form onSubmit={login}>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label>E-mail:</label>
          <input
            className="mt-2 px-3 py-1 border rounded border-gray-300"
            placeholder="email@add.com"
            type="text"
            value={email}
            onChange={onChangeEmail}
            autoComplete="on"
          />
        </div>
        <div className="flex flex-col">
          <label>Password:</label>
          <input
            className="mt-2 px-3 py-1 border rounded border-gray-300"
            placeholder="****"
            type="password"
            value={password}
            onChange={onChangePassword}
            autoComplete="off"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SwitchVerticalIcon
            className="h-5 w-5 text-blue-500 cursor-pointer"
            onClick={toggleIsLogin}
          />
          <button
            disabled={!email || !password}
            type="submit"
            className="disabled:opacity-40 py-1 px-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default LoginFields
