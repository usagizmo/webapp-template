import { VFC } from 'react'
import { useUsersQuery } from '../hooks/queries/useUsersQuery'

interface Props {}

const UserList: VFC<Props> = () => {
  const { status, data } = useUsersQuery()

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>

  return (
    <div>
      {data?.map((user) => (
        <div className="py-[8px]" key={user.id}>
          <div className="font-semibold font-mono text-sm px-[4px] py-[2px]">{user.email}</div>
          <div className="font-mono text-xs px-[4px] py-[2px]">{user.id}</div>
        </div>
      ))}
    </div>
  )
}

export default UserList
