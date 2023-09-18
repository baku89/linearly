import {EPSILON} from './common'
import type {Mat2d} from './mat2d'
import * as mat2d from './mat2d'

function areMat2dEqual(a: unknown, b: unknown) {
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

;(expect as any).addEqualityTesters([areMat2dEqual])

const matA: Mat2d = [1, 2, 3, 4, 5, 6]
const matB: Mat2d = [7, 8, 9, 10, 11, 12]

describe('invert', () => {
	expect(mat2d.invert(matA)).toEqual([-2, 1, 1.5, -0.5, 1, -2])
	expect(mat2d.invert([1, 0, 2, 0, 0, 0])).toEqual(null)
})

describe('determinant', () => {
	expect(mat2d.determinant(matA)).toEqual(-2)
	expect(mat2d.determinant([1, 0, 2, 0, 0, 0])).toEqual(0)
})

describe('multiply', () => {
	expect(mat2d.multiply(matA, matB)).toEqual([31, 46, 39, 58, 52, 76])
})

describe('rotate', () => {
	expect(mat2d.rotate(matA, Math.PI * 0.5)).toEqual([3, 4, -1, -2, 5, 6])
})

describe('scale', () => {
	expect(mat2d.scale(matA, [2, 3])).toEqual([2, 4, 9, 12, 5, 6])
})

describe('translate', () => {
	expect(mat2d.translate(matA, [2, 3])).toEqual([1, 2, 3, 4, 16, 22])
})

describe('frob', () => {
	expect(mat2d.frob(matA)).toEqual(
		Math.sqrt(
			Math.pow(1, 2) +
				Math.pow(2, 2) +
				Math.pow(3, 2) +
				Math.pow(4, 2) +
				Math.pow(5, 2) +
				Math.pow(6, 2) +
				1
		)
	)
})

describe('add', () => {
	expect(mat2d.add(matA, matB)).toEqual([8, 10, 12, 14, 16, 18])
})

describe('subtract', () => {
	expect(mat2d.subtract(matA, matB)).toEqual([-6, -6, -6, -6, -6, -6])
})

describe('multiplyScalar', () => {
	expect(mat2d.multiplyScalar(matA, 2)).toEqual([2, 4, 6, 8, 10, 12])
})

describe('multiplyScalarAndAdd', () => {
	expect(mat2d.multiplyScalarAndAdd(matA, matB, 0.5)).toEqual([
		4.5, 6, 7.5, 9, 10.5, 12,
	])
})

describe('exactEquals', () => {
	const matA: Mat2d = [0, 1, 2, 3, 4, 5]
	const matB: Mat2d = [0, 1, 2, 3, 4, 5]
	const matC: Mat2d = [1, 2, 3, 4, 5, 6]

	it('should return true for identical matrices', () => {
		expect(mat2d.exactEquals(matA, matB)).toBe(true)
	})
	it('should return false for different matrices', () => {
		expect(mat2d.exactEquals(matA, matC)).toBe(false)
	})
})

describe('equals', () => {
	const matA: Mat2d = [0, 1, 2, 3, 4, 5]
	const matB: Mat2d = [0, 1, 2, 3, 4, 5]
	const matC: Mat2d = [1, 2, 3, 4, 5, 6]
	const matD: Mat2d = [1e-16, 1, 2, 3, 4, 5]

	it('should return true for identical matrices', () => {
		expect(mat2d.equals(matA, matB)).toBe(true)
	})
	it('should return false for different matrices', () => {
		expect(mat2d.equals(matA, matC)).toBe(false)
	})
	it('should return true for close but not identical matrices', () => {
		expect(mat2d.equals(matA, matD)).toBe(true)
	})
})
