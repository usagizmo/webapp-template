import type { FC } from 'react'
import { CONST } from 'constants/const'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button/Button'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { pagesPath } from '@/lib/$path'

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

export const LayoutHeader: FC<Props> = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const queryHandle = useQueryHandle({ status })

  if (queryHandle) return queryHandle

  const filteredLinks = links.filter((link) => !link.auth || session)

  return (
    <header className="container max-w-lg">
      <div className="mb-10 flex flex-col items-center border-b border-gray-200 pb-8 pt-6">
        <h1 className="inline-block text-3xl font-extrabold tracking-tight text-gray-900">
          {CONST.SITE_NAME}
        </h1>

        <div className="mt-3">
          <a
            href="https://github.com/usagizmo/nextjs-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button black as="span">
              GitHub
            </Button>
          </a>
        </div>

        <ul className="mt-6 flex">
          {filteredLinks.map(({ href, title }) => (
            <li
              key={title}
              className="relative flex items-center before:px-2 before:content-['/'] first:before:hidden"
            >
              {router.pathname === href.pathname ? (
                <span className="font-bold">{title}</span>
              ) : (
                <Link href={href}>
                  <a className="c-hover-underline">{title}</a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
