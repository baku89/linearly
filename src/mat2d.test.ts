import {describe, expect, it, test} from 'vitest'

import {mat2d} from './mat2d'

const matA: mat2d = [1, 2, 3, 4, 5, 6]
const matB: mat2d = [7, 8, 9, 10, 11, 12]

test('invert', () => {
	expect(mat2d.invert(matA)).toEqual([-2, 1, 1.5, -0.5, 1, -2])
	expect(mat2d.invert([1, 0, 2, 0, 0, 0])).toEqual(null)
})

test('determinant', () => {
	expect(mat2d.determinant(matA)).toEqual(-2)
	expect(mat2d.determinant([1, 0, 2, 0, 0, 0])).toEqual(0)
})

test('multiply', () => {
	expect(mat2d.multiply(matA, matB)).toEqual([31, 46, 39, 58, 52, 76])
})

test('rotate', () => {
	expect(mat2d.rotate(matA, Math.PI * 0.5)).toEqual([3, 4, -1, -2, 5, 6])
})

test('scale', () => {
	expect(mat2d.scale(matA, [2, 3])).toEqual([2, 4, 9, 12, 5, 6])
})

test('translate', () => {
	expect(mat2d.translate(matA, [2, 3])).toEqual([1, 2, 3, 4, 16, 22])
})

test('frob', () => {
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

test('add', () => {
	expect(mat2d.add(matA, matB)).toEqual([8, 10, 12, 14, 16, 18])
})

describe('subtract', () => {
	it('should subtract two matrices', () => {
		expect(mat2d.subtract(matA, matB)).toEqual([-6, -6, -6, -6, -6, -6])
	})
})

test('multiplyScalar', () => {
	expect(mat2d.multiplyScalar(matA, 2)).toEqual([2, 4, 6, 8, 10, 12])
})

test('multiplyScalarAndAdd', () => {
	expect(mat2d.multiplyScalarAndAdd(matA, matB, 0.5)).toEqual([
		4.5, 6, 7.5, 9, 10.5, 12,
	])
})

describe('exactEquals', () => {
	const matA: mat2d = [0, 1, 2, 3, 4, 5]
	const matB: mat2d = [0, 1, 2, 3, 4, 5]
	const matC: mat2d = [1, 2, 3, 4, 5, 6]

	it('should return true for identical matrices', () => {
		expect(mat2d.exactEquals(matA, matB)).toBe(true)
	})
	it('should return false for different matrices', () => {
		expect(mat2d.exactEquals(matA, matC)).toBe(false)
	})
})

describe('equals', () => {
	const matA: mat2d = [0, 1, 2, 3, 4, 5]
	const matB: mat2d = [0, 1, 2, 3, 4, 5]
	const matC: mat2d = [1, 2, 3, 4, 5, 6]
	const matD: mat2d = [1e-16, 1, 2, 3, 4, 5]

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

test('toString', () => {
	expect(mat2d.toString(matA)).toEqual(
		`[1, 2,
 3, 4,
 5, 6]`
	)
	expect(mat2d.toString([1 / 3, -2, 0, 2, 0, 0])).toEqual(
		`[0.33, -2,
 0   ,  2,
 0   ,  0]`
	)
})
