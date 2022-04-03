import { clone } from './clone'

test('The value of the object before cloning is not changed', () => {
  const base = { piyo: 'piyo' }
  const res = clone({ piyo: 'piyo' })
  res.piyo = 'piyo2'
  expect(base).toStrictEqual({ piyo: 'piyo' })
  expect(res).toStrictEqual({ piyo: 'piyo2' })
})
