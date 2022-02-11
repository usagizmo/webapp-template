export const useQueryHandle = (
  { status }: { status: string },
  loadingMessage?: string
): JSX.Element | null => {
  if (status === 'loading') {
    return (
      <div className="u-flex-center h-full">
        {loadingMessage ?? 'Loading...'}
      </div>
    )
  }
  if (status === 'error') {
    return <div className="u-flex-center h-full">Error</div>
  }

  return null
}
