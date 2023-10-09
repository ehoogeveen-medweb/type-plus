import type { $Branch } from '../type_plus/branch/$branch.js'

/**
 * 🧰 *type util*
 *
 * Options for specifically handling the type `any`.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $AnyOptions
 *   export type $Default = $AnyDefault
 *   export type $Override = $AnyOverride
 * }
 * ```
 */
export type $AnyOptions = {
	$any?: unknown
}

export type $Any = $Branch<'$any'>

/**
 * 🧰 *type util*
 *
 * Branch option for specifically handling the type `any`.
 *
 * Use this to finely customize the behavior of your type.
 *
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $AnyOptions
 *   export type $Default = $AnyDefault
 *   export type $Branch = $AnyBranch
 * }
 *
 * type R = YourType<T, YourType.$Branch> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $AnyBranch = {
	$any: $Any
}

/**
 * 🧰 *type util*
 *
 * Default options for `any`.
 *
 * Unsurprisingly, defaulting `$any` to `any`.
 */
export type $AnyDefault = {
	$any: any
}
