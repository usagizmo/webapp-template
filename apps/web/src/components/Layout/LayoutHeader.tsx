import type { FC } from 'react'
import { Button } from '@/components/Button/Button'
import { LayoutNavigation } from './LayoutNavigation'

type Props = {}

export const LayoutHeader: FC<Props> = () => {
  return (
    <header
      id="header"
      className="border-b border-[#e2e8f0] bg-slate-50 md:sticky md:top-0 md:z-30"
    >
      <div className="container max-w-6xl">
        <div className="py-5 text-center md:flex md:h-16 md:items-center md:justify-between md:py-0">
          <h1 className="text-2xl font-bold leading-tight tracking-tighter lg:text-[32px]">
            Next.js Template (web)
          </h1>
          <LayoutNavigation />
          <div className="md:flex md:items-center md:justify-center">
            <div className="mt-4 md:mt-0">
              <a
                href="https://github.com/usagizmo/nextjs-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button primary as="span">
                  <span className="text-base">GitHub</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
