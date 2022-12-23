import { env } from 'node:process'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { fastify as Fastify } from 'fastify'
import { nanoid } from 'nanoid'

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
  genReqId: () => nanoid()
}).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(import('./core/config/config.js'))
await fastify.register(import('./core/context/context.js'))

fastify.get('/', async () => ({ status: 'ok' }))

export { fastify }
