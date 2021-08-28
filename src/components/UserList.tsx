import { VFC } from 'react'
import { useQueryUsers } from '../hooks/useQueryUsers'

interface Props {}

const UserList: VFC<Props> = () => {
  const { status, data } = useQueryUsers()

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>

  return (
    <div>
      {data?.map((user) => (
        <div className="py-2" key={user.id}>
          <div className="font-semibold font-mono text-sm px-1 py-0.5">{user.email}</div>
          <div className="font-mono text-xs px-1 py-0.5">{user.id}</div>
        </div>
      ))}
    </div>
  )
}

export default UserList
