import { FastifyServerOptions } from 'fastify'

export const createLogger = (env: unknown): FastifyServerOptions['logger'] => {
  switch (env) {
    case 'test':
      return false
    case 'production':
      return true
    default:
      return {
        transport: {
          target: '@fastify/one-line-logger'
        }
      }
  }
}
