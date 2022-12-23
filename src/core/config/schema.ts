import { Type } from '@sinclair/typebox'

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isIP.js
const IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
const IPv4AddressFormat = `(${IPv4SegmentFormat}[.]){3}${IPv4SegmentFormat}`
const IPv4AddressRegExp = `^${IPv4AddressFormat}$`

const schema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('production'), Type.Literal('development'), Type.Literal('test')], { default: 'development' }),
  PORT: Type.Number({ minimum: 0, maximum: 65535, default: 3000 }),
  HOST: Type.String({ pattern: IPv4AddressRegExp, default: '0.0.0.0' })
})

export default schema
