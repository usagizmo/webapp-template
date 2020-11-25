import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'
import useStore, { getInitialMouse } from '../../store'

const useMouseOnWindowEmitter = (): void => {
  const { emitter } = useMitt()
  const updateMouse = useStore((state) => state.actions.updateMouse)

  useEffectOnce(() => {
    const mouse = getInitialMouse()

    const onMouseDown = ({ clientX: x, clientY: y }: MouseEvent) => {
      mouse.down.is = true
      mouse.x = x
      mouse.y = y
      mouse.down.x = x
      mouse.down.y = y
      mouse.drag.is = false
      mouse.drag.x = 0
      mouse.drag.y = 0
      updateMouse(mouse)
      emitter.emit(EMITTER.mouseDown, mouse)
    }

    const onMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
      mouse.delta.x = x - mouse.x
      mouse.delta.y = y - mouse.y
      mouse.x = x
      mouse.y = y
      if (mouse.down.is) {
        mouse.drag.is = true
        mouse.drag.x = x - mouse.down.x
        mouse.drag.y = y - mouse.down.y
      }
      updateMouse(mouse)
      emitter.emit(EMITTER.mouseMove, mouse)
    }

    const onMouseUp = ({ clientX: x, clientY: y }: MouseEvent) => {
      mouse.down.is = false
      mouse.delta.x = 0
      mouse.delta.y = 0
      mouse.x = x
      mouse.y = y
      updateMouse(mouse)
      emitter.emit(EMITTER.mouseUp, mouse)
      mouse.drag.is = false
      mouse.drag.x = 0
      mouse.drag.y = 0
    }

    const options = { capture: true, passive: true }

    window.addEventListener('mousedown', onMouseDown, options)
    window.addEventListener('mousemove', onMouseMove, options)
    window.addEventListener('mouseup', onMouseUp, options)
    return () => {
      window.removeEventListener('mousedown', onMouseDown, options)
      window.removeEventListener('mousemove', onMouseMove, options)
      window.removeEventListener('mouseup', onMouseUp, options)
    }
  })
}

export default useMouseOnWindowEmitter
