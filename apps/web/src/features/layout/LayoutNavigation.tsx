import type { FC } from 'react'
import { useAuthenticationStatus } from '@nhost/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { pagesPath } from '@/lib/$path'

type Props = {}

const links = [
  {
    href: pagesPath.$url(),
    title: 'HOME',
  },
  {
    href: pagesPath.admin.$url(),
    title: 'ADMIN',
  },
  {
    href: pagesPath.secret.$url(),
    title: 'Secret',
    auth: true,
  },
]

const useLayoutNavigation = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthenticationStatus()
  const filteredLinks = links.filter((link) => !link.auth || isAuthenticated)

  return {
    router,
    filteredLinks,
  }
}

export const LayoutNavigation: FC<Props> = () => {
  const { router, filteredLinks } = useLayoutNavigation()

  return (
    <ul className="flex">
      {filteredLinks.map(({ href, title }) => (
        <li
          key={title}
          className="relative flex items-center before:px-2 before:content-['/'] first:before:hidden"
        >
          {router.pathname === href.pathname ? (
            <span className="font-medium">{title}</span>
          ) : (
            <Link href={href}>
              <a className="c-hover-underline text-gray-400">{title}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
