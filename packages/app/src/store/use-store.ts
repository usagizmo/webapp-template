import create from 'zustand'
import createVanilla from 'zustand/vanilla'
import { State } from '../interfaces'
// import { Post } from './types'

export type Mouse = {
  x: number
  y: number
  down: { is: boolean; x: number; y: number }
  drag: { is: boolean; x: number; y: number }
  delta: { x: number; y: number }
}

export const getInitialMouse = (): Mouse => ({
  x: 0,
  y: 0,
  down: { is: false, x: 0, y: 0 },
  drag: { is: false, x: 0, y: 0 },
  delta: { x: 0, y: 0 },
})

const vanillaStore = createVanilla<State>((set, get) => {
  return {
    isMenuOpen: false,
    wpData: {
      postsPerPage: 0,
      // posts: [],
      // postById: {},
    },
    mutation: {
      mouse: getInitialMouse(),
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
      updatePostsPerPage(count: number) {
        set({
          wpData: { ...get().wpData, postsPerPage: count },
        })
      },
      // updateWpData(wpData: any) {
      //   const posts: Post[] = wpData.posts.nodes
      //   const postById = posts.reduce((acc, post) => {
      //     acc[post.id] = post
      //     return acc
      //   }, {})

      //   set({
      //     wpData: {
      //       ...get().wpData,
      //       posts,
      //       postById,
      //     },
      //   })
      // },
      toggleIsMenuOpen(open) {
        set({ isMenuOpen: open === undefined ? !get().isMenuOpen : open })
      },
    },
  }
})

export const useStore = create(vanillaStore)
