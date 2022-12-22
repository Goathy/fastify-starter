import tap from 'tap'
import { fastify } from '../src/server.js'

void tap.test('server', async (t) => {
  t.plan(1)

  const response = await fastify.inject('/')

  t.same(response.json(), { status: 'ok' })
})
