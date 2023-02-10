import { Type } from '@sinclair/typebox'

const schema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('production'), Type.Literal('development'), Type.Literal('test')], { default: 'development' }),
  PORT: Type.Number({ minimum: 0, maximum: 65535, default: 3000 }),
  HOST: Type.String({ format: 'ipv4', default: '0.0.0.0' })
})

export default schema
