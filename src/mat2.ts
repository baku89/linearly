import * as Common from './common'
import {Vec2} from './vec2'

export type Mat2 = Readonly<MutableMat2>
export type MutableMat2 = [number, number, number, number]

export function of(m00: number, m01: number, m10: number, m11: number): Mat2 {
	return [m00, m01, m10, m11]
}

/**
 * Creates a mutable clone of given mat2
 */
export function clone(a: Mat2): MutableMat2 {
	return [...a]
}

/**
 * The identity matrix of mat2
 *
 */
export const identity: Mat2 = Object.freeze([1, 0, 0, 1])

export const zero: Mat2 = Object.freeze([0, 0, 0, 0])

/**
 * Transpose the values of a mat2
 */
export function transpose(a: Mat2): Mat2 {
	// prettier-ignore
	return [
		a[0], a[2],
		a[1], a[3],
	]
}

/**
 * Inverts a mat2
 */
export function invert(a: Mat2): Mat2 | null {
	const [a0, a1, a2, a3] = a

	// Calculate the determinant
	const det = a0 * a3 - a2 * a1

	if (!det) {
		return null
	}
	const detinv = 1 / det

	// prettier-ignore
	return [
	   a3 * detinv, -a1 * detinv,
	  -a2 * detinv,  a0 * detinv
	]
}

/**
 * Calculates the adjugate of a mat2
 */
export function adjoint(a: Mat2): Mat2 {
	// Caching this value is necessary if out == a
	const a0 = a[0]
	return [a[3], -a[1], -a[2], a0]
}

/**
 * Calculates the determinant of a mat2
 * @returns determinant of a
 */
export function determinant(a: Mat2) {
	return a[0] * a[3] - a[2] * a[1]
}

/**
 * Multiplies given mat2's
 */
export function multiply(...ms: Mat2[]): Mat2 {
	if (ms.length === 0) {
		return identity
	} else if (ms.length === 1) {
		return ms[0]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return multiply(multiply(a, b), ...rest)
	}

	const [a0, a1, a2, a3] = ms[0]
	const [b0, b1, b2, b3] = ms[1]

	return [
		a0 * b0 + a2 * b1,
		a1 * b0 + a3 * b1,
		a0 * b2 + a2 * b3,
		a1 * b2 + a3 * b3,
	]
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param a the matrix to rotate
 * @param rad the angle to rotate the matrix by
 */
export function rotate(a: Mat2, rad: number): Mat2 {
	const [a0, a1, a2, a3] = a
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	return [a0 * c + a2 * s, a1 * c + a3 * s, a0 * -s + a2 * c, a1 * -s + a3 * c]
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 **/
export function scale(a: Mat2, v: Vec2 | number): Mat2 {
	const [a0, a1, a2, a3] = a
	const [v0, v1] = typeof v === 'number' ? [v, v] : v

	return [a0 * v0, a1 * v0, a2 * v1, a3 * v1]
}

/**
 * Apply skew to the mat2d by the given angles
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function skew(m: Mat2, ax: number, ay: number): Mat2 {
	return multiply(m, fromSkew(ax, ay))
}

/**
 * Creates a matrix from a given angle
 */
export function fromRotation(rad: number): Mat2 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)
	return [c, s, -s, c]
}

/**
 * Creates a matrix from a vector scaling
 */
export function fromScaling(v: Vec2): Mat2 {
	return [v[0], 0, 0, v[1]]
}

/**
 * Creates a matrix from a vector skew
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function fromSkew(ax: number, ay: number): Mat2 {
	const x = Math.tan(ax)
	const y = Math.tan(ay)

	// prettier-ignore
	return [
		1, y,
		x, 1,
	]
}

/**
 * Returns Frobenius norm of a mat2
 */
export function frob(a: Mat2) {
	return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3])
}

/**
 * Adds given mat2's
 */
export function add(...ms: Mat2[]): Mat2 {
	if (ms.length === 0) {
		return zero
	} else if (ms.length === 1) {
		return ms[0]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return add(add(a, b), ...rest)
	}

	const [a, b] = ms

	return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
}

/**
 * Subtracts matrix b from matrix a
 */
export function subtract(...ms: Mat2[]): Mat2 {
	if (ms.length === 0) {
		return zero
	} else if (ms.length === 1) {
		return [-ms[0], -ms[1], -ms[2], -ms[3]]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return subtract(subtract(a, b), ...rest)
	}

	const [a, b] = ms

	return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 */
export function exactEquals(a: Mat2, b: Mat2) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 */
export function equals(a: Mat2, b: Mat2) {
	const [a0, a1, a2, a3] = a
	const [b0, b1, b2, b3] = b
	return (
		Math.abs(a0 - b0) <=
			Common.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <=
			Common.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3))
	)
}

export const sub = subtract
export const mul = multiply
