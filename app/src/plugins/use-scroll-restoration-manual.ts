import { useMount } from 'react-use'

const useScrollRestorationManual = () => {
  useMount(() => {
    history.scrollRestoration = 'manual'
  })
}

export default useScrollRestorationManual
