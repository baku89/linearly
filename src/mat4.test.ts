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
