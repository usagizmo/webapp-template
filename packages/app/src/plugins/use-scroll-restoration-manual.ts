import { useMount } from 'react-use'

const useScrollRestorationManual = (): void => {
  useMount(() => {
    history.scrollRestoration = 'manual'
  })
}

export default useScrollRestorationManual
