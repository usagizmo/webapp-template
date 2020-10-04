import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'
import useStore from '../../store'

const useMouseMoveEmitter = () => {
  const updateMouse = useStore((state) => state.actions.updateMouse)
  const { emitter } = useMitt()
  useEffectOnce(() => {
    const onMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
      const mouse = { x, y }
      updateMouse(mouse)
      emitter.emit(EMITTER.mouseMove, mouse)
    }
    document.addEventListener('mousemove', onMouseMove)
    return () => void document.removeEventListener('mousemove', onMouseMove)
  })
}

export default useMouseMoveEmitter
