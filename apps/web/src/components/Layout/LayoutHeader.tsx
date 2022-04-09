import { VFC } from 'react'
import { CONST } from 'constants/const'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { pagesPath } from '@/lib/$path'
import { TextLink } from '../TextLink/TextLink'

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
  {
    href: pagesPath.$1.$url(),
    title: '1',
  },
  {
    href: pagesPath.$2.$url(),
    title: '2',
  },
]

export const LayoutHeader: VFC<Props> = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const queryHandle = useQueryHandle({ status })

  if (queryHandle) return queryHandle

  const filteredLinks = links.filter((link) => !link.auth || session)

  return (
    <header className="container">
      <h1 className="flex h-20 items-center justify-center text-[24px] font-bold">
        {CONST.SITE_NAME}
      </h1>

      <ul className="flex justify-center">
        {filteredLinks.map(({ href, title }) => (
          <li
            key={title}
            className="relative before:px-2 before:content-['/'] first:before:hidden"
          >
            {router.pathname === href.pathname ? (
              <span className="font-semibold">{title}</span>
            ) : (
              <TextLink href={href}>{title}</TextLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
