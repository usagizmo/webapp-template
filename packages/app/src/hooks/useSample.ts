import { useMount } from 'react-use'

const useSample = (): void => {
  useMount(() => {
    // eslint-disable-next-line no-console
    console.log('This hook is useSample')
  })
}

export default useSample
