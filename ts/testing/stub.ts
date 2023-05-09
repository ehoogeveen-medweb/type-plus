import { requiredDeep } from 'unpartial'
import type { AnyFunction } from '../function/any_function.js'
import type { RecursivePartial } from '../object/RecursivePartial.js'
import type { NoInfer } from '../type/no_infer.js'

export namespace stub {
	export type Param<T> = T extends AnyFunction ? T : RecursivePartial<NoInfer<T>>
}

export function stub<T extends AnyFunction>(stub: T): T
export function stub<T>(stub: RecursivePartial<NoInfer<T>>): T
export function stub<T>(stub: unknown): T {
	return stub as T
}

/**
 * builds a stub function
 */
function build<T>(): (stub?: stub.Param<T>) => T
function build<T>(
	init: RecursivePartial<T> | ((stub?: stub.Param<T>) => RecursivePartial<T>)
): (stub?: stub.Param<T>) => T
function build<T>(init?: RecursivePartial<T> | ((stub?: stub.Param<T>) => RecursivePartial<T>)) {
	return function (value?: stub.Param<T>) {
		if (typeof init === 'function') {
			return init(value)
		}
		if (init) {
			return requiredDeep(init, value)
		}
		return value
	}
}

stub.build = build
