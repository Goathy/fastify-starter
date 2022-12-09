import { fastify as Fastify } from 'fastify'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { env } from 'node:process'
import { createLogger } from './logger.js'

const fastify = Fastify({
  logger: createLogger(env.NODE_ENV),
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier']
    }
  },
  return503OnClosing: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.get('/', async () => ({ status: 'ok' }))

export { fastify }
