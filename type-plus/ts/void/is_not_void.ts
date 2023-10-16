import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'
import type { $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `void`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<never> // true
 * type R = IsNotVoid<unknown> // true
 * type R = IsNotVoid<string | boolean> // true
 *
 * type R = IsNotVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, { selection: 'filter' }> // never
 *
 * type R = IsNotVoid<never, { selection: 'filter' }> // never
 * type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotVoid<string | void, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void | string> // boolean
 * type R = IsNotVoid<void | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, $SelectionBranch> // $Else
 * type R = IsNotVoid<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotVoid<
	T,
	$O extends IsNotVoid.$Options = {}
> = IsUndefined<T, $SelectionBranch> extends infer R
	? R extends $Then ?$ResolveBranch<T, $O, [$Then]>
	: $SelectInvert<T, void, $O>
	: never

export namespace IsNotVoid {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
