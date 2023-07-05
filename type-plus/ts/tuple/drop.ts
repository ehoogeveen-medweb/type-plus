import type { IsEqual } from '../equal/equal.js'
import type { NonNull, NonUndefined } from '../utils/index.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Drops the first entry in the tuple `T`.
 *
 * If the type is an array, the same array will be returned.
 *
 * @example
 * ```ts
 * type R = DropFirst<[1, 2, 3]> // [2, 3]
 * type R = DropFirst<[string]> // []
 * type R = DropFirst<[]> // []
 * type R = DropFirst<string[]> // string[]
 * ```
 *
 * @typeParam Options['caseArray'] Return type when `T` is `Array`.
 * Default to `T`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is an empty tuple.
 * Default to `[]`.
 */
export type DropFirst<
	T extends unknown[],
	Options extends DropFirst.Options = DropFirst.DefaultOptions<T>
> = number extends T['length']
	? Options['caseArray']
	: T['length'] extends 0
	? Options['caseEmptyTuple']
	: T['length'] extends 1
	? []
	: T extends [any, ...infer Tail]
	? Tail
	: never

export namespace DropFirst {
	export interface Options {
		caseArray?: unknown,
		caseEmptyTuple?: unknown,
	}
	export interface DefaultOptions<T> {
		caseArray: T,
		caseEmptyTuple: []
	}
}

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Drops the last entry in the tuple `T`.
 *
 * If the type is an array, the same array will be returned.
 *
 * @example
 * ```ts
 * type R = DropLast<[1, 2, 3]> // [2, 3]
 * type R = DropLast<[string]> // []
 * type R = DropLast<[]> // []
 * type R = DropLast<string[]> // string[]
 * ```
 *
 * @typeParam Options['caseArray'] Return type when `T` is `Array`.
 * Default to `T`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is an empty tuple.
 * Default to `[]`.
 */
export type DropLast<
	T extends unknown[],
	Cases extends DropLast.Options = DropLast.DefaultOptions<T>
> = number extends T['length']
	? Cases['caseArray']
	: T['length'] extends 0
	? Cases['caseEmptyTuple']
	: T['length'] extends 1
	? []
	: T extends [...infer Heads, any]
	? Heads
	: never


export namespace DropLast {
	export interface Options {
		caseArray?: unknown,
		caseEmptyTuple?: unknown,
	}
	export interface DefaultOptions<T> {
		caseArray: T,
		caseEmptyTuple: []
	}
}

type ExcludeUnionOfEmptyTuple<A> = IsEqual<A, []> extends true ? A : Exclude<A, []>

/**
 * ⚗️ *transform*
 *
 * Drops entries matching `Criteria` in array or tuple `A`.
 *
 * @example
 * ```ts
 * type R = DropMatch<Array<string | undefined>, undefined> // string[]
 * type R = DropMatch<Array<string>, string> // never[]
 * type R = DropMatch<Array<1 | 2>, number> // never[]
 * ```
 */
export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = number extends A['length']
	? // array
	A[0] extends Criteria
	? // criteria matches: DropAll<string[], string>
	never[]
	: undefined extends Criteria
	? null extends Criteria
	? Array<NonNullable<A[0]>>
	: Array<NonUndefined<A[0]>>
	: null extends Criteria
	? Array<NonNull<A[0]>>
	: Criteria extends A[0]
	? Array<Exclude<A[0], Criteria>>
	: A[0] extends Criteria
	? A
	: Array<Exclude<A[0], Criteria>>
	: DropMatchTuple<A, Criteria>

type DropMatchTuple<A extends Readonly<Array<any>>, Criteria> = A['length'] extends 0
	? // empty tuple
	A
	: A extends readonly [infer Head, ...infer Tail]
	? Tail['length'] extends 0
	? // single element tuple
	undefined extends Criteria
	? ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
	: ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
	: // multiple elements
	Exclude<Head, Criteria> extends never
	? DropMatch<Tail, Criteria>
	: [Exclude<Head, Criteria>, ...DropMatch<Tail, Criteria>]
	: never[]

export type DropNull<A extends Array<any>> = DropMatch<A, null>
export type DropNullable<A extends Array<any>> = DropMatch<A, null | undefined>
export type DropUndefined<A extends Array<any>> = DropMatch<A, undefined>

/**
 * drop a particular value from an array.
 *
 * 💀 *deprecated* the type does not sufficiently cover the use cases.
 */
export function drop<A extends Readonly<unknown[]>, const C>(array: A, value: C): DropMatch<A, C> {
	return array.filter(v => v !== value) as DropMatch<A, C>
}
