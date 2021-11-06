const useQueryHandle = (
  { status }: { status: string },
  loadingMessage?: string
): JSX.Element | null => {
  if (status === 'loading') {
    return <div className="h-full u-flex-center">{loadingMessage ?? 'Loading...'}</div>
  }
  if (status === 'error') {
    return <div className="h-full u-flex-center">Error</div>
  }

  return null
}

export default useQueryHandle
