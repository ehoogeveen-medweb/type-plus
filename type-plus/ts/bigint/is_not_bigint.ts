import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `bigint` nor `bigint` literals.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint> // false
 * type R = IsNotBigint<1n> // false
 *
 * type R = IsNotBigint<never> // true
 * type R = IsNotBigint<unknown> // true
 * type R = IsNotBigint<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `bigint` nor `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint, { selection: 'filter' }> // never
 * type R = IsNotBigint<1n, { selection: 'filter' }> // never
 *
 * type R = IsNotBigint<never, { selection: 'filter' }> // never
 * type R = IsNotBigint<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBigint<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint | 1> // boolean
 * type R = IsNotBigint<bigint | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<string, $SelectionBranch> // $Then
 * type R = IsNotBigint<bigint, $SelectionBranch> // $Else
 * ```
 */
export type IsNotBigint<T, $O extends IsNotBigint.$Options = {}> = $SelectInvert<T, bigint, $O>

export namespace IsNotBigint {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
