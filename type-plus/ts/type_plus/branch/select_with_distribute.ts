import type { IsAnyOrNever } from '../../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from './distributive.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from './selection.js'
import type { $ResolveOptions } from '../resolve_options.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined> // true
 *
 * type R = SelectWithDistribute<never, undefined> // false
 * type R = SelectWithDistribute<unknown, undefined> // false
 * type R = SelectWithDistribute<string | boolean, undefined> // false
 *
 * type R = SelectWithDistribute<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = SelectWithDistribute<never, undefined, { selection: 'filter' }> // never
 * type R = SelectWithDistribute<unknown, undefined, { selection: 'filter' }> // never
 * type R = SelectWithDistribute<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = SelectWithDistribute<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined, { selection: 'filter-unknown' }> // undefined
 *
 * type R = SelectWithDistribute<never, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = SelectWithDistribute<unknown, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = SelectWithDistribute<string | boolean, undefined, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = SelectWithDistribute<undefined | 1, undefined> // boolean
 * type R = SelectWithDistribute<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined, $SelectionBranch> // $Then
 * type R = SelectWithDistribute<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type SelectWithDistribute<
	T,
	U,
	$O extends SelectWithDistribute.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? T extends U ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>
		: [T] extends [U] ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>)
	: never : never

export namespace SelectWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}