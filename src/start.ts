import { exit } from 'node:process'

import { fastify } from './server.js'

const start = async (): Promise<void> => {
  try {
    await fastify.ready()

    const { HOST, PORT } = fastify.config

    await fastify.listen({ port: PORT, host: HOST })
  } catch (error) {
    fastify.log.error(error)
    exit(1)
  }
}

start().catch(() => exit(1))
