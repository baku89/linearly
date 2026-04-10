import {expect, test} from 'vitest'

import {mat4} from './mat4'

test('multiply', () => {
	expect(
		mat4.multiply(
			mat4.fromTranslation([1, 2, 3]),
			mat4.fromTranslation([4, 5, 6])
		)
	).toEqual(mat4.fromTranslation([5, 7, 9]))

	expect(
		mat4.multiply(
			mat4.fromScaling([0.5, 0.5, 0.5]),
			mat4.fromTranslation([4, 5, 6])
		)
	).toEqual(mat4.of(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 2, 2.5, 3, 1))
})

test('clamp01', () => {
	const m = mat4.fromScaling([2, -1, 0.5])
	expect(mat4.clamp01(m)).toEqual(mat4.fromScaling([1, 0, 0.5]))
})

test('clamp11', () => {
	const m = mat4.fromScaling([-2, 0.5, 3])
	expect(mat4.clamp11(m)).toEqual(mat4.fromScaling([-1, 0.5, 1]))
})
