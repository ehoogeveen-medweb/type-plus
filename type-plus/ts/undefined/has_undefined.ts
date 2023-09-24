import type { $Else, $ResolveSelection, $SelectionOptions, $Then } from '../type_plus/branch/selection.js'
import type { IsUndefined } from './is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `undefined` or an union with `undefined`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // true
 * type R = HasUndefined<undefined | 1> // true
 *
 * type R = HasUndefined<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `undefined` or an union with `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // undefined
 * type R = HasUndefined<undefined | 1> // undefined | 1
 *
 * type R = HasUndefined<number> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined, $SelectionBranch> // $Then
 * type R = HasUndefined<string, $SelectionBranch> // $Else
 * ```
 */
export type HasUndefined<
	T,
	$O extends $SelectionOptions = {}
> = IsUndefined<T> extends false ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
