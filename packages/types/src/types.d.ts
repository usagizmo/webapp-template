/**
 * Common types
 */

export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type Rect = Position & Size

export type IdMap = { [id: string]: true | undefined }
