import { VFC } from 'react'

export const LayoutFooter: VFC = () => {
  return (
    <footer className="mt-4 flex items-center justify-center py-4">
      <a href="https://usagizmo.com" target="_blank" rel="noopener noreferrer">
        <small className="text-[12px]">@usagizmo</small>
      </a>
    </footer>
  )
}
