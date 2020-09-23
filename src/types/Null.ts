import { typeSym } from '../utils'
import { FixedType } from './types'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = FixedType<'null'>

const any: Null = { [typeSym]: 'null' as const }

export const nil = Object.assign({}, any, {
  optional: union.create(any, undef)
})
