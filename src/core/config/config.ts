import { env } from 'node:process'

import { Static } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import Fp from 'fastify-plugin'

import schema from './schema.js'

const CONFIG_KEY = 'config'

declare module 'fastify' {
  interface FastifyInstance {
    [CONFIG_KEY]: Static<typeof schema>
  }
}

const config: FastifyPluginAsync = async (fastify) => {
  await fastify.register(import('@fastify/env'), { schema, data: env, confKey: CONFIG_KEY })
}

export default Fp(config)
