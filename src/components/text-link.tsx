import { FC } from 'react'
import Link from 'next/link'

type Props = {
  href: string
}

export const TextLink: FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="relative inline-flex overflow-hidden text-gray-600 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:translate-x-[calc(-100%-1px)] after:bg-black after:duration-150 hover:text-black hover:after:translate-x-0">
        {children}
      </a>
    </Link>
  )
}
