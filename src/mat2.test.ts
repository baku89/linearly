import {describe, expect, it} from 'vitest'

import {mat2} from './mat2'
import {scalar} from './scalar'

describe('fromRotation', () => {
	it('should rotate 0° correctly', () => {
		expect(mat2.rotation(0)).toEqual(mat2.id)
	})

	it('should rotate 90° correctly', () => {
		expect(mat2.rotation(Math.PI / 2)).toEqual([0, 1, -1, 0])
	})

	it('should rotate 180° correctly', () => {
		expect(mat2.rotation(Math.PI)).toEqual([-1, 0, 0, -1])
	})

	it('should rotate 240° correctly', () => {
		expect(mat2.rotation(scalar.rad(240))).toEqual([
			-0.5,
			-Math.sqrt(3) / 2,
			Math.sqrt(3) / 2,
			-0.5,
		])
	})
})

describe('fromSkew', () => {
	it('should skew [45°, 0°] correctly', () => {
		expect(mat2.fromSkew([scalar.rad(45), 0])).toEqual([1, 0, 1, 1])
	})

	it('should skew [0°, 45°] correctly', () => {
		expect(mat2.fromSkew([0, scalar.rad(45)])).toEqual([1, 1, 0, 1])
	})
})
