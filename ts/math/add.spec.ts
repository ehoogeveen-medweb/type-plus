import { it } from '@jest/globals'
import { testType } from '../index.js'
import { Add } from './add.js'

// 123 + 123 = 246
// => [[1, 2, 3], 0]
// +  [[1, 2, 3], 0]
// => [[1 + 1, 2 + 2, 3 + 3], 0 + 0]
// => [[2, 4, 6], 0]

// 13579 + 97531 = 111110
// => [[1, 3, 5, 7, 9], 0]
// +  [[9, 7, 5, 3, 1], 0]
// => [     [10, 10, 10, 10, 10], 0]
// => [[  1,  1,  1,  1,  1,  0], 0]

it('adds two positive bigints', () => {
	testType.equal<Add<1n, 1n>, 2n>(true)

	testType.equal<Add<1n, 10n>, 11n>(true)
	testType.equal<Add<10n, 1n>, 11n>(true)

	testType.equal<Add<123n, 123n>, 246n>(true)

	testType.equal<Add<19n, 1n>, 20n>(true)
	testType.equal<Add<1n, 19n>, 20n>(true)

	testType.equal<Add<13579n, 97531n>, 111110n>(true)
})

// 1357.9 + 13.579 = 1371.479
// => [[1, 3, 5, 7, 9], 1]
// +  [[1, 3, 5, 7, 9], 3]
// => [[ 1, 3, 5, 7, 9, 0, 0, 0], 4]
// => [      [ 1, 3, 5, 7, 9, 0], 4]
// => [[ 1, 3, 7, 1, 4, 7, 9, 0], 4]
// => [[ 1, 3, 7, 1, 4, 7, 9], 4]

// can find a way to get [0]
// => [[ 1, 3, 5, 7, 9, 0, 0], 4]
// => [      [ 1, 3, 5, 7, 9], 4]
// => [[ 1, 3, 7, 1, 4, 7, 9], 4]
