import { css, SerializedStyles } from '@emotion/react'

export const size = {
  wh: (w: string | number, h: string | number): SerializedStyles =>
    css({
      width: w,
      height: h,
    }),
  w: (w: string | number): SerializedStyles =>
    css({
      width: w,
    }),
  h: (h: string | number): SerializedStyles =>
    css({
      height: h,
    }),
}
