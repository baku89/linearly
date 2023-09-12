import * as Common from './common'
import {Mat4} from './mat4'
import {Quat} from './quat'
import {Vec2} from './vec2'
import {Vec3} from './vec3'

// prettier-ignore
export type Mat3 = readonly [
	number, number, number,
	number, number, number,
	number, number, number,
]

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Copies the upper-left 3x3 values into the given mat3.
 */
export function fromMat4(a: Mat4): Mat3 {
	// prettier-ignore
	return [
		a[0], a[1], a[2],
		a[4], a[5], a[6],
		a[8], a[9], a[10]
	]
}

/**
 * The identity matrix of mat3
 */
// prettier-ignore
export const identity = Object.freeze([
	1, 0, 0,
	0, 1, 0,
	0, 0, 1,
])

/**
 * Transpose the values of a mat3
 */
export function transpose(a: Mat3): Mat3 {
	// prettier-ignore
	return [
		a[0], a[3], a[6],
		a[1], a[4], a[7],
		a[2], a[5], a[8]
	]
}

/**
 * Inverts a mat3
 */
export function invert(a: Mat3): Mat3 | null {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a

	const b01 = a22 * a11 - a12 * a21
	const b11 = -a22 * a10 + a12 * a20
	const b21 = a21 * a10 - a11 * a20

	// Calculate the determinant
	const det = a00 * b01 + a01 * b11 + a02 * b21

	if (!det) {
		return null
	}

	const detinv = 1.0 / det

	return [
		b01 * detinv,
		(-a22 * a01 + a02 * a21) * detinv,
		(a12 * a01 - a02 * a11) * detinv,
		b11 * detinv,
		(a22 * a00 - a02 * a20) * detinv,
		(-a12 * a00 + a02 * a10) * detinv,
		b21 * detinv,
		(-a21 * a00 + a01 * a20) * detinv,
		(a11 * a00 - a01 * a10) * detinv,
	]
}

/**
 * Calculates the adjugate of a mat3
 */
export function adjoint(a: Mat3): Mat3 {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a

	return [
		a11 * a22 - a12 * a21,
		a02 * a21 - a01 * a22,
		a01 * a12 - a02 * a11,
		a12 * a20 - a10 * a22,
		a00 * a22 - a02 * a20,
		a02 * a10 - a00 * a12,
		a10 * a21 - a11 * a20,
		a01 * a20 - a00 * a21,
		a00 * a11 - a01 * a10,
	]
}

/**
 * Calculates the determinant of a mat3
 */
export function determinant(a: Mat3) {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a

	return (
		a00 * (a22 * a11 - a12 * a21) +
		a01 * (-a22 * a10 + a12 * a20) +
		a02 * (a21 * a10 - a11 * a20)
	)
}

/**
 * Multiplies two mat3's
 */
export function multiply(a: Mat3, b: Mat3): Mat3 {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a
	const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = b

	return [
		b00 * a00 + b01 * a10 + b02 * a20,
		b00 * a01 + b01 * a11 + b02 * a21,
		b00 * a02 + b01 * a12 + b02 * a22,

		b10 * a00 + b11 * a10 + b12 * a20,
		b10 * a01 + b11 * a11 + b12 * a21,
		b10 * a02 + b11 * a12 + b12 * a22,

		b20 * a00 + b21 * a10 + b22 * a20,
		b20 * a01 + b21 * a11 + b22 * a21,
		b20 * a02 + b21 * a12 + b22 * a22,
	]
}

/**
 * Translate a mat3 by the given vector
 */
export function translate(a: Mat3, v: Vec3): Mat3 {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a
	const [x, y] = v

	// prettier-ignore
	return [
		a00, a01, a02,
		a10, a11, a12,

		x * a00 + y * a10 + a20,
		x * a01 + y * a11 + a21,
		x * a02 + y * a12 + a22,
	]
}

/**
 * Rotates a mat3 by the given angle
 */
export function rotate(a: Mat3, rad: number): Mat3 {
	const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = a
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		c * a00 + s * a10,
		c * a01 + s * a11,
		c * a02 + s * a12,

		c * a10 - s * a00,
		c * a11 - s * a01,
		c * a12 - s * a02,

		a20, a21, a22,
	]
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 **/
export function scale(a: Mat3, v: Vec2): Mat3 {
	const [x, y] = v

	// prettier-ignore
	return [
		a[0] * x, a[1] * x, a[2] & x,
		a[3] * y, a[4] * y,	a[5] * y,
		a[6],     a[7],     a[8],
	]
}

/**
 * Creates a matrix from a vector translation
 */
export function fromTranslation(v: Vec2): Mat3 {
	const [x, y] = v

	// prettier-ignore
	return [
		1, 0, 0,
		0, 1, 0,
		x, y, 1,
	]
}

/**
 * Creates a matrix from a given angle
 */
export function fromRotation(rad: number): Mat3 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		c,  s, 0,
		-s, c, 0,
		0,  0, 1,
	]
}

/**
 * Creates a matrix from a vector scaling
 */
export function fromScaling(v: Vec2): Mat3 {
	const [x, y] = v

	// prettier-ignore
	return [
		x, 0, 0,
		0, y, 0,
		0, 0, 1
	]
}

/**
 * Copies the values from a mat2d into a mat3
 **/
export function fromMat2d(a: Mat3): Mat3 {
	// prettier-ignore
	return [
		a[0], a[1], 0,
		a[2], a[3], 0,
		a[4], a[5], 1
	]
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 */
export function fromQuat(q: Quat): Mat3 {
	const [x, y, z, w] = q

	const x2 = x + x
	const y2 = y + y
	const z2 = z + z

	const xx = x * x2
	const yx = y * x2
	const yy = y * y2
	const zx = z * x2
	const zy = z * y2
	const zz = z * z2
	const wx = w * x2
	const wy = w * y2
	const wz = w * z2

	return [
		1 - yy - zz,
		yx - wz,
		zx + wy,

		yx + wz,
		1 - xx - zz,
		zy - wx,

		zx - wy,
		zy + wx,
		1 - xx - yy,
	]
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 */
export function normalFromMat4(a: Mat4): Mat3 | null {
	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,
		a30, a31, a32, a33
	] = a

	const b00 = a00 * a11 - a01 * a10
	const b01 = a00 * a12 - a02 * a10
	const b02 = a00 * a13 - a03 * a10
	const b03 = a01 * a12 - a02 * a11
	const b04 = a01 * a13 - a03 * a11
	const b05 = a02 * a13 - a03 * a12
	const b06 = a20 * a31 - a21 * a30
	const b07 = a20 * a32 - a22 * a30
	const b08 = a20 * a33 - a23 * a30
	const b09 = a21 * a32 - a22 * a31
	const b10 = a21 * a33 - a23 * a31
	const b11 = a22 * a33 - a23 * a32

	// Calculate the determinant
	const det =
		b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

	if (!det) {
		return null
	}
	const detinv = 1.0 / det

	return [
		(a11 * b11 - a12 * b10 + a13 * b09) * detinv,
		(a12 * b08 - a10 * b11 - a13 * b07) * detinv,
		(a10 * b10 - a11 * b08 + a13 * b06) * detinv,

		(a02 * b10 - a01 * b11 - a03 * b09) * detinv,
		(a00 * b11 - a02 * b08 + a03 * b07) * detinv,
		(a01 * b08 - a00 * b10 - a03 * b06) * detinv,

		(a31 * b05 - a32 * b04 + a33 * b03) * detinv,
		(a32 * b02 - a30 * b05 - a33 * b01) * detinv,
		(a30 * b04 - a31 * b02 + a33 * b00) * detinv,
	]
}

/**
 * Generates a 2D projection matrix with the given bounds
 */
export function projection(width: number, height: number): Mat3 {
	return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]
}

/**
 * Returns Frobenius norm of a mat3
 */
export function frob(a: Mat3) {
	return Math.sqrt(
		a[0] * a[0] +
			a[1] * a[1] +
			a[2] * a[2] +
			a[3] * a[3] +
			a[4] * a[4] +
			a[5] * a[5] +
			a[6] * a[6] +
			a[7] * a[7] +
			a[8] * a[8]
	)
}

/**
 * Adds two mat3's
 */
export function add(a: Mat3, b: Mat3): Mat3 {
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
		a[3] + b[3],
		a[4] + b[4],
		a[5] + b[5],
		a[6] + b[6],
		a[7] + b[7],
		a[8] + b[8],
	]
}

/**
 * Subtracts matrix b from matrix a
 */
export function subtract(a: Mat3, b: Mat3): Mat3 {
	return [
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
		a[3] - b[3],
		a[4] - b[4],
		a[5] - b[5],
		a[6] - b[6],
		a[7] - b[7],
		a[8] - b[8],
	]
}

/**
 * Multiply each element of the matrix by a scalar.
 */
export function multiplyScalar(a: Mat3, s: number): Mat3 {
	return [
		a[0] * s,
		a[1] * s,
		a[2] * s,
		a[3] * s,
		a[4] * s,
		a[5] * s,
		a[6] * s,
		a[7] * s,
		a[8] * s,
	]
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 */
export function multiplyScalarAndAdd(a: Mat3, b: Mat3, scale: number): Mat3 {
	return [
		a[0] + b[0] * scale,
		a[1] + b[1] * scale,
		a[2] + b[2] * scale,
		a[3] + b[3] * scale,
		a[4] + b[4] * scale,
		a[5] + b[5] * scale,
		a[6] + b[6] * scale,
		a[7] + b[7] * scale,
		a[8] + b[8] * scale,
	]
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 */
export function exactEquals(a: Mat3, b: Mat3) {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5] &&
		a[6] === b[6] &&
		a[7] === b[7] &&
		a[8] === b[8]
	)
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 */
export function equals(a: Mat3, b: Mat3) {
	const a0 = a[0],
		a1 = a[1],
		a2 = a[2],
		a3 = a[3],
		a4 = a[4],
		a5 = a[5],
		a6 = a[6],
		a7 = a[7],
		a8 = a[8]
	const b0 = b[0],
		b1 = b[1],
		b2 = b[2],
		b3 = b[3],
		b4 = b[4],
		b5 = b[5],
		b6 = b[6],
		b7 = b[7],
		b8 = b[8]
	return (
		Math.abs(a0 - b0) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
		Math.abs(a4 - b4) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
		Math.abs(a5 - b5) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
		Math.abs(a6 - b6) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
		Math.abs(a7 - b7) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
		Math.abs(a8 - b8) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8))
	)
}
