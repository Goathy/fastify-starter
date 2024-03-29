import { env } from 'node:process'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { fastify as Fastify } from 'fastify'

import { generateId } from './core/util/request-id.js'
import { createLogger } from './logger.js'

const fastify = Fastify({
  logger: createLogger(env.NODE_ENV),
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier']
    }
  },
  return503OnClosing: true,
  requestIdLogLabel: 'request-id',
  requestIdHeader: 'x-request-id',
  genReqId: generateId()
}).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(import('@fastify/swagger'), {
  mode: 'dynamic'
})
await fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full'
  }
})

await fastify.register(import('./core/config/config.js'))

fastify.get('/', async () => ({ status: 'ok' }))

export { fastify }
