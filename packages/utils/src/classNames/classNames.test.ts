import { classNames } from './classNames'

test('Class names are properly added', () => {
  expect(classNames('piyo piyo2 piyo3', 'piyo4')).toBe('piyo piyo2 piyo3 piyo4')
})
