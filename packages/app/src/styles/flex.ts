import { css } from '@emotion/react'

export const flex = {
  center: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  column: css({
    display: 'flex',
    flexDirection: 'column',
  }),
}

export const flexItem = {
  1: css({
    flex: 1,
  }),
}
