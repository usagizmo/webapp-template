import type { FC } from 'react'

export const LayoutFooter: FC = () => {
  return (
    <footer className="mt-4 flex items-center justify-center py-4">
      <a href="https://usagizmo.com" target="_blank" rel="noopener noreferrer">
        <small className="c-hover-underline">@usagizmo</small>
      </a>
    </footer>
  )
}
