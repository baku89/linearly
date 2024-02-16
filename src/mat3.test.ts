import {describe, expect, it} from 'vitest'

import {mat3} from './mat3'

describe('fromRotation', () => {
	it('should rotate 0° correctly', () => {
		expect(mat3.fromRotation(0)).toEqual(mat3.id)
	})

	it('should rotate 90° correctly', () => {
		expect(mat3.fromRotation(90)).toEqual([0, 1, 0, -1, 0, 0, 0, 0, 1])
	})

	it('should rotate 180° correctly', () => {
		expect(mat3.fromRotation(180)).toEqual([-1, 0, 0, 0, -1, 0, 0, 0, 1])
	})

	it('should rotate 240° correctly', () => {
		const t = Math.sqrt(3) / 2
		expect(mat3.fromRotation(240)).toEqual([-0.5, -t, 0, t, -0.5, 0, 0, 0, 1])
	})
})
