import type { $Else, $ResolveSelection, $SelectionOptions, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any, { selection: 'filter' }> // any
 *
 * type R = IsAny<never, { selection: 'filter' }> // never
 * type R = IsAny<unknown, { selection: 'filter' }> // never
 * type R = IsAny<string | boolean, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsAny<any, $SelectionBranch> // $Then
 * type R = IsAny<string, $SelectionBranch> // $Else
 * ```
 */
export type IsAny<
	T,
	$O extends $SelectionOptions = {}
> = 0 extends 1 & T
	? $ResolveSelection<$O, T, $Then>
	: $ResolveSelection<$O, T, $Else>
