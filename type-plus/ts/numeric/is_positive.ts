import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'

/**
 * Is `T` a positive numeric type.
 *
 * ```ts
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // true
 * type R = IsPositive<1n> // true
 *
 * type R = IsPositive<number> // boolean
 * type R = IsPositive<bigint> // boolean
 * type R = IsPositive<any> // boolean
 *
 * type R = IsPositive<-1> // false
 * ```
 */
export type IsPositive<T, $O extends IsPositive.$Options = {}> = IsBigint<T, {
	distributive: $O['distributive'],
	$then: $Then,
	$else: $Else
}> extends infer R
	? R extends $Then ? IsPositive._Negative<T, bigint, $O>
	: (
		IsNumber<Exclude<T, bigint>, { distributive: $O['distributive'], $then: $Then, $else: $Else }> extends infer R
		? (
			R extends $Then
			? IsPositive._Negative<T, number, $O>
			: $ResolveSelection<$O, T, $Else>
		)
		: never
	)
	: never

export namespace IsPositive {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _Negative<T, U extends number | bigint, $O extends IsPositive.$Options> = T extends U
		? (
			`${T}` extends `-${string}`
			? $ResolveSelection<$O, T, $Else>
			: U extends T ? $ResolveSelection<$O, T, $Then> | $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
		)
		: never
}
