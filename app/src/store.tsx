import create from 'zustand'

type State = {
  mutation: {
    mouse: { x: number; y: number }
  }
  actions: {
    updateMouse: (mouse: { x: number; y: number }) => void
  }
}

const useStore = create<State>((_set, get) => {
  return {
    mutation: {
      mouse: { x: 0, y: 0 },
    },
    actions: {
      updateMouse({ x, y }) {
        get().mutation.mouse.x = x
        get().mutation.mouse.y = y
      },
    },
  }
})

export default useStore
