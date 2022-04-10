import { wait } from './wait'

test('Delayed', async () => {
  const start = Date.now()
  await wait(200)
  const end = Date.now()
  expect(end - start).toBeGreaterThanOrEqual(199) // -1ms: for estimate buffer
})
