import {describe, expect, it} from 'vitest'

import {mat2} from './mat2'

describe('fromRotation', () => {
	it('should rotate 0° correctly', () => {
		expect(mat2.rotation(0)).toEqual(mat2.id)
	})

	it('should rotate 90° correctly', () => {
		expect(mat2.rotation(90)).toEqual([0, 1, -1, 0])
	})

	it('should rotate 180° correctly', () => {
		expect(mat2.rotation(180)).toEqual([-1, 0, 0, -1])
	})

	it('should rotate 240° correctly', () => {
		expect(mat2.rotation(240)).toEqual([
			-0.5,
			-Math.sqrt(3) / 2,
			Math.sqrt(3) / 2,
			-0.5,
		])
	})
})

describe('fromSkew', () => {
	it('should skew [45°, 0°] correctly', () => {
		expect(mat2.fromSkew([45, 0])).toEqual([1, 0, 1, 1])
	})

	it('should skew [0°, 45°] correctly', () => {
		expect(mat2.fromSkew([0, 45])).toEqual([1, 1, 0, 1])
	})
})
