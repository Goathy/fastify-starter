import { fastify } from './server.js'
import { exit } from 'node:process'

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (error) {
    fastify.log.error(error)
    exit(1)
  }
}

start().catch(() => exit(1))
