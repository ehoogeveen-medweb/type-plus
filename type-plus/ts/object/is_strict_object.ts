import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsNever } from '../never/is_never.js'
import type { IsObject } from './is_object.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is strictly the `object` type.
 */
export type IsStrictObject<T, Then = true, Else = false> = IsObject<
	T,
	IdentityEqual<T, {}, Else, IsNever<keyof T, { $then: Then, $else: Else }>>,
	Else
>
