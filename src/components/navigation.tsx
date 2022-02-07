import { VFC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ROUTE from '../constants/route'
import useStore from '../store/use-store'

interface Props {}

const links = [
  {
    href: ROUTE.HOME,
    title: 'HOME',
  },
  {
    href: ROUTE.EDIT,
    title: 'EDIT',
    auth: true,
  },
  {
    href: ROUTE.ADMIN,
    title: 'ADMIN',
  },
]

const Input: VFC<Props> = () => {
  const router = useRouter()
  const user = useStore((state) => state.user)

  const filteredLinks = links.filter((link) => !link.auth || user)

  return (
    <ul className="u-flex-center h-[40px]">
      {filteredLinks.map(({ href, title }) => (
        <li
          key={title}
          className="relative before:px-[8px] before:content-['/'] first:before:hidden"
        >
          {router.pathname === href ? (
            <span className="font-semibold">{title}</span>
          ) : (
            <Link href={href}>
              <a className="u-link">{title}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Input
