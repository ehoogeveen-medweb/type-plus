export type Number<Value extends number = number> = { name: 'number', value: Value }

export namespace Number {
  export const name = 'number'
  export const value = 0

  /**
   * Creates a single value number.
   */
  export function val<N extends number>(value: N): Number<N> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'number', value }
  }
}