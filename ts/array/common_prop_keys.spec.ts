import { type, type CommonPropKeys } from '../index.js'

test('no common key returns never', () => {
	type S = [{ a: number }, { b: number }]
	type A = CommonPropKeys<S>
	type.never<A>(true)
})

test('single common key', () => {
	type S = [{ a: number; c: number }, { a: number; b: number }]
	type A = CommonPropKeys<S>
	type.equal<A, 'a'>(true)
})

test('multiple common keys', () => {
	type S = [{ a: number; b: number }, { a: number; b: number }]
	type A = CommonPropKeys<S>
	type.equal<A, 'a' | 'b'>(true)
})