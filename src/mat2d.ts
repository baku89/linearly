import * as Common from './common'
import {Vec2} from './vec2'

/**
 * 2x3 Matrix
 * @module mat2d
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

export type Mat2d = [number, number, number, number, number, number]

// prettier-ignore
export function of(
	a: number,  b: number,
	c: number,  d: number,
	tx: number, ty: number
): Mat2d {
	return [a, b, c, d, tx, ty]
}

/**
 * The identity matrix of mat2d
 */
// prettier-ignore
export const identity: Readonly<Mat2d> = Object.freeze([
	1, 0,
	0, 1,
	0, 0
])

export const zero: Readonly<Mat2d> = Object.freeze([0, 0, 0, 0, 0, 0])

/**
 * Inverts a mat2d
 */
export function invert(a: Mat2d): Mat2d | null {
	const [aa, ab, ac, ad, atx, aty] = a

	const det = aa * ad - ab * ac

	if (!det) {
		return null
	}

	const detinv = 1 / det

	// prettier-ignore
	return [
	   ad * detinv, -ab * detinv,
	  -ac * detinv,  aa * detinv,

	  (ac * aty - ad * atx) * detinv,
		(ab * atx - aa * aty) * detinv,
	]
}

/**
 * Calculates the determinant of a mat2d
 */
export function determinant(a: Mat2d) {
	return a[0] * a[3] - a[1] * a[2]
}

/**
 * Multiplies two mat2d's
 */
export function multiply(a: Mat2d, b: Mat2d, ...rest: Mat2d[]): Mat2d {
	if (rest.length > 0) {
		const [m2, ...ms] = rest
		return multiply(multiply(a, b), m2, ...ms)
	}

	const [a0, a1, a2, a3, a4, a5] = a
	const [b0, b1, b2, b3, b4, b5] = b

	// prettier-ignore
	return [
		a0 * b0 + a2 * b1, a1 * b0 + a3 * b1,
		a0 * b2 + a2 * b3, a1 * b2 + a3 * b3,
		
		a0 * b4 + a2 * b5 + a4,
		a1 * b4 + a3 * b5 + a5,
	]
}

/**
 * Rotates a mat2d by the given angle
 */
export function rotate(a: Mat2d, rad: number): Mat2d {
	const [a0, a1, a2, a3, tx, ty] = a
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		a0 *  c + a2 * s,  a1 *  c + a3 * s,
		a0 * -s + a2 * c,  a1 * -s + a3 * c,
		tx, ty
	]
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 **/
export function scale(a: Mat2d, v: Vec2): Mat2d {
	const [a0, a1, a2, a3, tx, ty] = a
	const [sx, sy] = v

	// prettier-ignore
	return [
		a0 * sx, a1 * sx,
		a2 * sy, a3 * sy,
		tx,      ty
	]
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 **/
export function translate(m: Mat2d, v: Vec2): Mat2d {
	const [a, b, c, d, tx, ty] = m
	const [x, y] = v

	// prettier-ignore
	return [
		a, b,
		c, d,
		a * x + c * y + tx,
		b * x + d * y + ty]
}

/**
 * Apply skew to the mat2d by the given angles
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function skew(m: Mat2d, ax: number, ay: number): Mat2d {
	return multiply(m, fromSkew(ax, ay))
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 */
export function fromRotation(rad: number): Mat2d {
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		 c, s,
		-s, c,
		 0, 0,
	]
}

/**
 * Creates a matrix from a vector scaling
 */
export function fromScaling(v: Vec2): Mat2d {
	const [x, y] = v

	// prettier-ignore
	return [
	  x, 0,
		0, y,
		0, 0,
	]
}

/**
 * Creates a matrix from a vector translation
 */
export function fromTranslation(v: Vec2): Mat2d {
	const [x, y] = v

	// prettier-ignore
	return [
		1, 0,
		0, 1,
		x, y,
	]
}

/**
 * Creates a matrix from a vector skew
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function fromSkew(ax: number, ay: number): Mat2d {
	const x = Math.tan(ax)
	const y = Math.tan(ay)

	// prettier-ignore
	return [
		1, y,
		x, 1,
		0, 0,
	]
}

/**
 * Returns Frobenius norm of a mat2d
 */
export function frob(a: Mat2d) {
	// prettier-ignore
	return Math.sqrt(
		a[0] ** 2 +
		a[1] ** 2 +
		a[2] ** 2 +
		a[3] ** 2 +
		a[4] ** 2 +
		a[5] ** 2 + 1
	)
}

/**
 * Adds two mat2d's
 */
export function add(a: Mat2d, b: Mat2d): Mat2d {
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
		a[3] + b[3],
		a[4] + b[4],
		a[5] + b[5],
	]
}

/**
 * Subtracts matrix b from matrix a
 */
export function subtract(a: Mat2d, b: Mat2d): Mat2d {
	return [
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
		a[3] - b[3],
		a[4] - b[4],
		a[5] - b[5],
	]
}

/**
 * Multiply each element of the matrix by a scalar.
 */
export function multiplyScalar(a: Mat2d, s: number): Mat2d {
	// prettier-ignore
	return [
		a[0] * s, a[1] * s,
		a[2] * s, a[3] * s,
		a[4] * s, a[5] * s,
	]
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 */
export function multiplyScalarAndAdd(a: Mat2d, b: Mat2d, scale: number): Mat2d {
	return [
		a[0] + b[0] * scale,
		a[1] + b[1] * scale,
		a[2] + b[2] * scale,
		a[3] + b[3] * scale,
		a[4] + b[4] * scale,
		a[5] + b[5] * scale,
	]
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 */
export function exactEquals(a: Mat2d, b: Mat2d) {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5]
	)
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 */
export function equals(a: Mat2d, b: Mat2d) {
	const [a0, a1, a2, a3, a4, a5] = a
	const [b0, b1, b2, b3, b4, b5] = b
	return (
		Math.abs(a0 - b0) <=
			Common.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <=
			Common.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
		Math.abs(a4 - b4) <=
			Common.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
		Math.abs(a5 - b5) <=
			Common.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5))
	)
}
