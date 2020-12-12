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
