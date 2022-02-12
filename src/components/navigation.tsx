import { VFC } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { pagesPath } from '@/generated/$path'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { TextLink } from '@/components/text-link'

type Props = {}

const links = [
  {
    href: pagesPath.$url(),
    title: 'HOME',
  },
  {
    href: pagesPath.edit.$url(),
    title: 'EDIT',
    auth: true,
  },
  {
    href: pagesPath.admin.$url(),
    title: 'ADMIN',
  },
]

export const Navigation: VFC<Props> = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const queryHandle = useQueryHandle({ status })

  if (queryHandle) return queryHandle

  const filteredLinks = links.filter((link) => !link.auth || session)

  return (
    <ul className="flex h-[40px] items-center justify-center">
      {filteredLinks.map(({ href, title }) => (
        <li
          key={title}
          className="relative before:px-[8px] before:content-['/'] first:before:hidden"
        >
          {router.pathname === href.pathname ? (
            <span className="font-semibold">{title}</span>
          ) : (
            <TextLink href={href}>{title}</TextLink>
          )}
        </li>
      ))}
    </ul>
  )
}
