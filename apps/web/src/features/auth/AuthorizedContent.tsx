import type { FC } from 'react'
import type { User } from '@nhost/core'
import { SignOut } from 'phosphor-react'
import { Button } from '@/components/Button/Button'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  user: User
}

const useHook = () => {
  const { signOut } = useAuth()

  return {
    signOut,
  }
}

export const AuthorizedContent: FC<Props> = ({ user }) => {
  const { signOut } = useHook()

  return (
    <div className="text-center">
      <p>
        Logged in as{' '}
        <span className="mt-1 block text-2xl font-medium">
          {user.displayName}
        </span>
        <span className="mt-1 block text-2xl font-medium">{user.email}</span>
        <span className="mt-1block text-sm">{user.id}</span>
      </p>
      <div className="mt-10">
        <Button
          onClick={() => {
            signOut()
          }}
        >
          <SignOut width={20} height={20} className="mr-1.5" />
          <span>Sign out</span>
        </Button>
      </div>
    </div>
  )
}
