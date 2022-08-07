import type { FC } from 'react'

export const LayoutFooter: FC = () => {
  return (
    <footer>
      <div className="container max-w-6xl">
        <div className="flex items-center justify-center border-t border-[#e2e8f0] pt-3 pb-6">
          <a
            className="u-hover-underline text-sm"
            href="https://usagizmo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @usagizmo
          </a>
        </div>
      </div>
    </footer>
  )
}
