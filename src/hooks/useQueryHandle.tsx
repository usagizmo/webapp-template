interface Props {
  status: string
}

const useQueryHandle = ({ status }: Props): JSX.Element | null => {
  if (status === 'loading') {
    return <div className="h-full u-flex-center">Loading...</div>
  }
  if (status === 'error') {
    return <div className="h-full u-flex-center">Error</div>
  }

  return null
}

export default useQueryHandle
