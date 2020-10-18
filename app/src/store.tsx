import create from 'zustand'

export type Mouse = {
  x: number
  y: number
  down: { is: boolean; x: number; y: number }
  drag: { is: boolean; x: number; y: number }
  delta: { x: number; y: number }
}

type State = {
  mutation: {
    mouse: Mouse
  }
  actions: {
    updateMouse: (mouse: Mouse) => void
  }
}

const useStore = create<State>((_set, get) => {
  return {
    mutation: {
      mouse: {
        x: 0,
        y: 0,
        down: { is: false, x: 0, y: 0 },
        drag: { is: false, x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      },
    },
    actions: {
      updateMouse(mouse) {
        const ref = get().mutation.mouse
        ref.x = mouse.x
        ref.y = mouse.y
        ref.down.is = mouse.down.is
        ref.down.x = mouse.down.x
        ref.down.y = mouse.down.y
        ref.drag.is = mouse.drag.is
        ref.drag.x = mouse.drag.x
        ref.drag.y = mouse.drag.y
        ref.delta.x = mouse.delta.x
        ref.delta.y = mouse.delta.y
      },
    },
  }
})

export default useStore
