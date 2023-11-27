import {expect} from '@jest/globals'

import {EPSILON} from './src/common'

function areNumericVectorEqual(a: unknown, b: unknown) {
	if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
		return undefined
	}

	for (let i = 0; i < a.length; i++) {
		const nearlyEqual =
			Math.abs(a[i] - b[i]) <=
			EPSILON * Math.max(1, Math.abs(a[i]), Math.abs(b[i]))

		if (!nearlyEqual) {
			return undefined
		}
	}
	return true
}

expect.addEqualityTesters([areNumericVectorEqual])
