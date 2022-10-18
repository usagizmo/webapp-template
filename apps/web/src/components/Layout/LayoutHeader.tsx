import type { FC } from 'react'
import { Button } from '@/components/Button/Button'
import { LayoutNavigation } from './LayoutNavigation'

type Props = {}

export const LayoutHeader: FC<Props> = () => {
  return (
    <header className="mb-10">
      <div className="container max-w-2xl">
        <div className="flex flex-col items-center border-b border-gray-200 py-4">
          <h1 className="inline-block text-3xl font-extrabold tracking-tight text-gray-900">
            Next.js Template
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

          <div className="mt-6">
            <LayoutNavigation />
          </div>
        </div>
      </div>
    </header>
  )
}
