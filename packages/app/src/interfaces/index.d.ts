export type DetailPost = {
  title: string
  date: string
  content: string
}

export type PostForHome = {
  node: {
    id: string
    title: string
    content: string
  }
}

export type PageInfo = {
  offsetPagination: {
    total: number
  }
}

export type ImageType = {
  id: string
  sourceUrl: string
  altText: string
}

export type Post = {
  id: string
  title: string
  content: string
  featuredImage: {
    node: ImageType
  }
}

export interface State {
  isMenuOpen: boolean
  wpData: {
    postsPerPage: number
    // posts: Post[]
    // postById: { [id: string]: Post }
  }
  mutation: {
    mouse: Mouse
  }
  actions: {
    updateMouse: (mouse: Mouse) => void
    updatePostsPerPage: (count: number) => void
    toggleIsMenuOpen: (open?: boolean) => void
  }
}
