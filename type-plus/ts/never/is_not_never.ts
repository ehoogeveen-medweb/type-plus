import type { $FlipSelection, $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { IsNever } from './is_never.js'

/**
 * Is `T` not `never`.
 *
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 */

export type IsNotNever<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = IsNever<T, $FlipSelection<$Options>>
