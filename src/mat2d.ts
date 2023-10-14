import * as Common from './common'
import * as mat2 from './mat2'
import {Mat2} from './mat2'
import type {Vec2} from './vec2'
import * as vec2 from './vec2'

/**
 * Represents 2D affine transformation (translation, rotation, scaling, skewing), omitting reduction thrid row which is always set to `[0, 0, 1]`. The order of six elements is the same as CSS transform matrix.
 *
 * A mat2d contains six elements defined as:
 * ```
 * [a, b,
 *  c, d,
 *  tx, ty]
 * ```
 * This is a short form for the {@link Mat3}:
 * ```
 * [xx, xy, 0,
 *  yx, yy, 0,
 *  tx, ty, 1]
 * ```
 * The last column is ignored so the array is shorter and operations are faster.
 *
 * @category Types
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
 */
// prettier-ignore
export type Mat2d = readonly [
	a: number, b: number,
	c: number, d: number,
	tx: number, ty: number
]

/**
 * Mutable version of {@link Mat2d}
 * @category Types
 */
// prettier-ignore
export type MutableMat2d = [
	a: number, b: number,
	c: number, d: number,
	tx: number, ty: number
]

/**
 * Creates a new matrix from given elements
 * @category Generators
 */
// prettier-ignore
export function of(
	a: number,  b: number,
	c: number,  d: number,
	tx: number, ty: number
): Mat2d {
	return [a, b, c, d, tx, ty]
}

/**
 * Creates a mutable clone of given mat2d
 * @category Generators
 */
export function clone(a: Mat2d): MutableMat2d {
	return [...a]
}

/**
 * The identity matrix of mat2d
 * ```
 * [1, 0,
 *  0, 1,
 *  0, 0]
 * ```
 * @category Constants
 */
// prettier-ignore
export const identity: Mat2d = Object.freeze([
	1, 0,
	0, 1,
	0, 0
])

/**
 * The mat2d matrix filled with zeros.
 * @category Constants
 */
export const zero: Mat2d = Object.freeze([0, 0, 0, 0, 0, 0])

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
 * Multiplies given mat2d's
 */
export function multiply(...ms: Mat2d[]): Mat2d {
	if (ms.length === 0) {
		return identity
	} else if (ms.length === 1) {
		return ms[0]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return multiply(multiply(a, b), ...rest)
	}

	const [a, b] = ms

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
export function rotate(m: Mat2d, rad: number, origin?: Vec2): Mat2d {
	if (origin) {
		if (origin) {
			return pivot(rotate(m, rad), origin)
		}
	}

	const [a0, a1, a2, a3, tx, ty] = m
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
export function scale(m: Mat2d, s: Vec2, origin?: Vec2): Mat2d {
	if (origin) {
		return pivot(scale(m, s), origin)
	}

	const [a0, a1, a2, a3, tx, ty] = m
	const [sx, sy] = s

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

export function pivot(m: Mat2d, origin: Vec2): Mat2d {
	return multiply(
		fromTranslation(origin),
		m,
		fromTranslation(vec2.negate(origin))
	)
}

/**
 * Apply skew to the mat2d by the given radians
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function skew(m: Mat2d, rads: Vec2, origin: Vec2): Mat2d {
	return multiply(m, fromSkew(rads, origin))
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 * @category Generators
 */
export function fromRotation(rad: number, origin?: Vec2): Mat2d {
	if (origin) {
		return pivot(fromRotation(rad), origin)
	}

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
 * @category Generators
 */
export function fromScaling(v: Vec2 | number, origin?: Vec2): Mat2d {
	if (origin) {
		return pivot(fromScaling(v), origin)
	}

	const [x, y] = typeof v === 'number' ? [v, v] : v

	// prettier-ignore
	return [
		x, 0,
		0, y,
		0, 0,
	]
}

/**
 * Creates a matrix from a vector translation
 * @category Generators
 */
export function fromTranslation(v: Vec2 | number): Mat2d {
	const [x, y] = typeof v === 'number' ? [v, v] : v

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
 * @category Generators
 */
export function fromSkew(angles: Vec2, origin?: Vec2): Mat2d {
	if (origin) {
		return pivot(fromSkew(angles), origin)
	}

	const [ax, ay] = angles
	const x = Math.tan(ax)
	const y = Math.tan(ay)

	// prettier-ignore
	return [
		1, y,
		x, 1,
		0, 0,
	]
}

export function fixedPoint(m: Mat2d): Vec2 | null {
	const [a, b, c, d, tx, ty] = m

	// Computes (I - A)
	const iMinusA: Mat2 = [1 - a, -c, -b, 1 - d]

	// Computes an inverse matrix
	const iMinusAInv = mat2.invert(iMinusA)

	if (!iMinusAInv) {
		return null
	}

	// Computes a fixed point
	const x = iMinusAInv[0] * tx + iMinusAInv[1] * ty
	const y = iMinusAInv[2] * tx + iMinusAInv[3] * ty

	return [x, y]
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
 * Adds given mat2d's
 */
export function add(...ms: Mat2d[]): Mat2d {
	if (ms.length === 0) {
		return zero
	} else if (ms.length === 1) {
		return ms[0]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return add(add(a, b), ...rest)
	}

	const [a, b] = ms

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
export function subtract(...ms: Mat2d[]): Mat2d {
	if (ms.length === 0) {
		return zero
	} else if (ms.length === 1) {
		return [-ms[0], -ms[1], -ms[2], -ms[3], -ms[4], -ms[5]]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return subtract(subtract(a, b), ...rest)
	}

	const [a, b] = ms

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
 * Subtracts b from a
 */
export function delta(a: Mat2d, b: Mat2d): Mat2d {
	return [
		b[0] - a[0],
		b[1] - a[1],
		b[2] - a[2],
		b[3] - a[3],
		b[4] - a[4],
		b[5] - a[5],
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
 Adds given mat2d's after multiplying each element of the second operand by a scalar value.
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
 * Creates a matrix that maps from the given points to another. If the third point is not given, the orthogonal matrix is returned.
 * ```text
 * f-s         f'-s'
 * |/  ---M--> |/
 * t           t'
 * ```
 * @category Generators
 * @param first a pair of first point
 * @param second a pair of second point
 * @param third a pair of third point
 */
export function fromPoints(
	first: [Vec2, Vec2],
	second: [Vec2, Vec2],
	third?: [Vec2, Vec2]
): Mat2d | null {
	if (!third) {
		// Computes third points by rotating second points 90 degrees
		const PI_HALF = Math.PI / 2
		third = [
			vec2.add(first[0], vec2.rotate(vec2.sub(second[0], first[0]), PI_HALF)),
			vec2.add(first[1], vec2.rotate(vec2.sub(second[1], first[1]), PI_HALF)),
		]
	}

	// Creates an affine matrix whose origin is first,
	// [1, 0] is second, and [1, 0] is third.
	// Then computes M = M_dst * M_src^-1
	const src: Mat2d = [
		second[0][0] - first[0][0],
		second[0][1] - first[0][1],
		third[0][0] - first[0][0],
		third[0][1] - first[0][1],
		first[0][0],
		first[0][1],
	]

	const srcInv = invert(src)

	if (!srcInv) {
		return null
	}

	const dst: Mat2d = [
		second[1][0] - first[1][0],
		second[1][1] - first[1][1],
		third[1][0] - first[1][0],
		third[1][1] - first[1][1],
		first[1][0],
		first[1][1],
	]

	return multiply(dst, srcInv)
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with `===`)
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

/**
 * Alias for {@link mat2d.subtract}
 * @category Aliases
 */
export const sub = subtract

/**
 * Alias for {@link mat2d.multiply}
 * @category Aliases
 */
export const mul = multiply

/**
 * Alias for {@link mat2d.determinant}
 * @category Aliases
 */
export const det = determinant
