import { css } from '@emotion/react'

export const textLink = css({
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  color: '#888',
  transition: 'color .3s',
  '&::after': {
    position: 'absolute',
    content: '""',
    height: 1,
    bottom: 0,
    left: -1,
    width: '100%',
    backgroundColor: '#000',
    transform: 'translateX(-100%)',
    transition: 'transform .3s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  '&:hover': {
    color: '#000',
    '&::after': {
      transform: 'translateX(0%)',
    },
  },
})
