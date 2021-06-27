import { css } from '@emotion/react'
import { flex } from './flex'
import { media } from './media'
import { size } from './size'

export const theText = {
  wrapper: css([
    flex.center,
    size.h('100%'),
    {
      flexDirection: 'column',
      padding: 20,
    },
  ]),
  title: css({
    letterSpacing: 1.5,
    lineHeight: 1.35,
    fontSize: 28,
    [media.pc]: {
      fontSize: 38,
    },
  }),
}
