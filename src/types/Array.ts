// import { BigInt } from './BigInt'
import { any, Any } from './Any'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { Unknown, unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Object<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  | Union<any>
  | Unknown | Any
  | Symbol // | BigInt

export type Array<Value extends AllTypes = AllTypes> = {
  name: 'array',
  value: Value
}

/**
 * Creates an array type.
 */
function create<Value extends AllTypes>(value: Value): Array<Value> {
  return {
    name: 'array',
    value: value
  }
}

export const array = {
  ...create(any),
  create,
  optional: {
    ...union.create(create(any), undef),
    /**
     * Creates an optional array type.
     */
    create<Value extends AllTypes>(value: Value): Union<[Array<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  },
  unknown: create(unknown)
}