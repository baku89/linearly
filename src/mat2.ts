import * as Common from './common.js'
import {Vec2} from './vec2.js'

export type Mat2 = readonly [number, number, number, number]

/**
 * The identity matrix of mat2
 *
 */
export const identity: Mat2 = Object.freeze([1, 0, 0, 1])

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
	const detinv = 1.0 / det

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
 * Multiplies two mat2's
 */
export function multiply(a: Mat2, b: Mat2): Mat2 {
	const [a0, a1, a2, a3] = a
	const [b0, b1, b2, b3] = b

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
export function scale(a: Mat2, v: Vec2): Mat2 {
	const [a0, a1, a2, a3] = a
	const [v0, v1] = v

	return [a0 * v0, a1 * v0, a2 * v1, a3 * v1]
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
 * Returns Frobenius norm of a mat2
 */
export function frob(a: Mat2) {
	return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3])
}

/**
 * Adds two mat2's
 */
export function add(a: Mat2, b: Mat2): Mat2 {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
}

/**
 * Subtracts matrix b from matrix a
 */
export function subtract(a: Mat2, b: Mat2): Mat2 {
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
			Common.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
	)
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param a the matrix to scale
 * @param s amount to scale the matrix's elements by
 */
export function multiplyScalar(a: Mat2, s: number): Mat2 {
	return [a[0] * s, a[1] * s, a[2] * s, a[3] * s]
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 */
export function multiplyScalarAndAdd(a: Mat2, b: Mat2, scale: number): Mat2 {
	return [
		a[0] + b[0] * scale,
		a[1] + b[1] * scale,
		a[2] + b[2] * scale,
		a[3] + b[3] * scale,
	]
}
