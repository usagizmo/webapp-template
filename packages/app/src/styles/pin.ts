import { css } from '@emotion/react'

export const pin = {
  t: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  }),
  b: css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  }),
  l: css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
  }),
  r: css({
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
  }),
  full: css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  }),
}
