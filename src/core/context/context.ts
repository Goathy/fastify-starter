
import { FastifyPluginAsync } from 'fastify'
import Fp from 'fastify-plugin'

import { REQUEST_ID, REVISION } from './constraints.js'

declare module '@fastify/request-context' {
  interface RequestContextData {
    [REQUEST_ID]: string
    [REVISION]: number
  }
}

const context: FastifyPluginAsync = async (fastify) => {
  await fastify.register(import('@fastify/request-context'), { hook: 'onRequest' })

  fastify.addHook('onRequest', async (req) => {
    req.requestContext.set(REVISION, 0)
    req.requestContext.set(REQUEST_ID, req.id)
  })
}

export default Fp(context)
