export const useQueryHandle = (
  { status }: { status: string },
  loadingMessage?: string
): JSX.Element | null => {
  if (status === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        {loadingMessage ?? 'Loading...'}
      </div>
    )
  }
  if (status === 'error') {
    return <div className="flex h-full items-center justify-center">Error</div>
  }

  return null
}
