import { customAlphabet, nanoid, urlAlphabet } from 'nanoid'

interface Options {
  urlSafe: boolean
  length: number
}

type Return = () => string

const wrap = (fn: typeof nanoid, arg?: number) => {
  return () => fn(arg)
}

export const generateId = (opts: Partial<Options> = { urlSafe: true, length: 21 }): Return => {
  if (opts.urlSafe === true) {
    return wrap(customAlphabet(urlAlphabet), opts.length)
  } else {
    return wrap(nanoid, opts.length)
  }
}

export default generateId
