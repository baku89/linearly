import * as Common from './common'
import {Quat} from './quat'
import {Vec3} from './vec3'

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 */

export type Mat4 = Readonly<MutableMat4>

// prettier-ignore
export type MutableMat4 = [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
]

/**
 * Creates a new matrix from given elements
 * @category Generators
 */
// prettier-ignore
export function of(
	m00: number, m01: number, m02: number, m03: number,
	m10: number, m11: number, m12: number, m13: number,
	m20: number, m21: number, m22: number, m23: number,
	m30: number, m31: number, m32: number, m33: number,
): Mat4 {
	// prettier-ignore
	return [
		m00, m01, m02, m03,
		m10, m11, m12, m13,
		m20, m21, m22, m23,
		m30, m31, m32, m33,
	]
}

/**
 * The identity matrix of mat4
 * @category Constants
 */
// prettier-ignore
export const identity: Mat4 = Object.freeze([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
])

/**
 * @category Constants
 */
export const zero: Mat4 = Object.freeze([
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
])

/**
 * Transpose the values of a mat4
 */
export function transpose(a: Mat4): Mat4 {
	// prettier-ignore
	return [
		a[0], a[4], a[8],  a[12],
		a[1], a[5], a[9],  a[13],
		a[2], a[6], a[10], a[14],
		a[3], a[7], a[11], a[15],
	]
}

/**
 * Inverts a mat4
 */
export function invert(a: Mat4): Mat4 | null {
	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,
		a30, a31, a32, a33] = a

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

	const detinv = 1 / det

	return [
		(a11 * b11 - a12 * b10 + a13 * b09) * detinv,
		(a02 * b10 - a01 * b11 - a03 * b09) * detinv,
		(a31 * b05 - a32 * b04 + a33 * b03) * detinv,
		(a22 * b04 - a21 * b05 - a23 * b03) * detinv,
		(a12 * b08 - a10 * b11 - a13 * b07) * detinv,
		(a00 * b11 - a02 * b08 + a03 * b07) * detinv,
		(a32 * b02 - a30 * b05 - a33 * b01) * detinv,
		(a20 * b05 - a22 * b02 + a23 * b01) * detinv,
		(a10 * b10 - a11 * b08 + a13 * b06) * detinv,
		(a01 * b08 - a00 * b10 - a03 * b06) * detinv,
		(a30 * b04 - a31 * b02 + a33 * b00) * detinv,
		(a21 * b02 - a20 * b04 - a23 * b00) * detinv,
		(a11 * b07 - a10 * b09 - a12 * b06) * detinv,
		(a00 * b09 - a01 * b07 + a02 * b06) * detinv,
		(a31 * b01 - a30 * b03 - a32 * b00) * detinv,
		(a20 * b03 - a21 * b01 + a22 * b00) * detinv,
	]
}

/**
 * Calculates the adjugate of a mat4
 */
export function adjoint(a: Mat4): Mat4 {
	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,
		a30, a31, a32, a33] = a

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

	return [
		a11 * b11 - a12 * b10 + a13 * b09,
		a02 * b10 - a01 * b11 - a03 * b09,
		a31 * b05 - a32 * b04 + a33 * b03,
		a22 * b04 - a21 * b05 - a23 * b03,
		a12 * b08 - a10 * b11 - a13 * b07,
		a00 * b11 - a02 * b08 + a03 * b07,
		a32 * b02 - a30 * b05 - a33 * b01,
		a20 * b05 - a22 * b02 + a23 * b01,
		a10 * b10 - a11 * b08 + a13 * b06,
		a01 * b08 - a00 * b10 - a03 * b06,
		a30 * b04 - a31 * b02 + a33 * b00,
		a21 * b02 - a20 * b04 - a23 * b00,
		a11 * b07 - a10 * b09 - a12 * b06,
		a00 * b09 - a01 * b07 + a02 * b06,
		a31 * b01 - a30 * b03 - a32 * b00,
		a20 * b03 - a21 * b01 + a22 * b00,
	]
}

/**
 * Calculates the determinant of a mat4
 */
export function determinant(a: Mat4) {
	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,
		a30, a31, a32, a33] = a

	const b0 = a00 * a11 - a01 * a10
	const b1 = a00 * a12 - a02 * a10
	const b2 = a01 * a12 - a02 * a11
	const b3 = a20 * a31 - a21 * a30
	const b4 = a20 * a32 - a22 * a30
	const b5 = a21 * a32 - a22 * a31
	const b6 = a00 * b5 - a01 * b4 + a02 * b3
	const b7 = a10 * b5 - a11 * b4 + a12 * b3
	const b8 = a20 * b2 - a21 * b1 + a22 * b0
	const b9 = a30 * b2 - a31 * b1 + a32 * b0

	// Calculate the determinant
	return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9
}

/**
 * Multiplies given mat4's
 */
export function multiply(...ms: Mat4[]): Mat4 {
	if (ms.length === 0) {
		return identity
	} else if (ms.length === 1) {
		return ms[0]
	} else if (ms.length > 2) {
		const [a, b, ...rest] = ms
		return multiply(multiply(a, b), ...rest)
	}

	const [a, b] = ms

	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,
		a30, a31, a32, a33] = a

	const out = Array(16)

	// Cache only the current line of the second matrix
	let [b0, b1, b2, b3] = b

	out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
	out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
	out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
	out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

	b0 = b[4]
	b1 = b[5]
	b2 = b[6]
	b3 = b[7]
	out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
	out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
	out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
	out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

	b0 = b[8]
	b1 = b[9]
	b2 = b[10]
	b3 = b[11]
	out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
	out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
	out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
	out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

	b0 = b[12]
	b1 = b[13]
	b2 = b[14]
	b3 = b[15]
	out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
	out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
	out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
	out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

	return out as any
}

/**
 * Translate a mat4 by the given vector
 *
 * @param a the matrix to translate
 * @param v vector to translate by
 */
export function translate(a: Mat4, v: Vec3): Mat4 {
	const [x, y, z] = v

	// prettier-ignore
	const [a00, a01, a02, a03,
		     a10, a11, a12, a13,
				 a20, a21, a22, a23] = a

	// prettier-ignore
	return [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23,

		a00 * x + a10 * y + a20 * z + a[12],
		a01 * x + a11 * y + a21 * z + a[13],
		a02 * x + a12 * y + a22 * z + a[14],
		a03 * x + a13 * y + a23 * z + a[15],
	]
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 **/
export function scale(a: Mat4, v: Vec3): Mat4 {
	const [x, y, z] = v

	// prettier-ignore
	return [
		a[0] * x, a[1] * x, a[2]  * x, a[3]  * x,
		a[4] * y, a[5] * y, a[6]  * y, a[7]  * y,
		a[8] * z, a[9] * z, a[10] * z, a[11] * z,
		a[12],    a[13],    a[14],     a[15],
	]
}

/**
 * Rotates a mat4 by the given angle around the given axis
 */
export function rotate(a: Mat4, rad: number, axis: Vec3): Mat4 | null {
	let [x, y, z] = axis
	const len = Math.sqrt(x * x + y * y + z * z)

	if (len < Common.EPSILON) {
		return null
	}

	x /= len
	y /= len
	z /= len

	const s = Math.sin(rad)
	const c = Math.cos(rad)
	const t = 1 - c

	// prettier-ignore
	const [
		a00, a01, a02, a03,
		a10, a11, a12, a13,
		a20, a21, a22, a23] = a

	// Construct the elements of the rotation matrix
	const b00 = x * x * t + c
	const b01 = y * x * t + z * s
	const b02 = z * x * t - y * s
	const b10 = x * y * t - z * s
	const b11 = y * y * t + c
	const b12 = z * y * t + x * s
	const b20 = x * z * t + y * s
	const b21 = y * z * t - x * s
	const b22 = z * z * t + c

	// prettier-ignore
	return [
		a00 * b00 + a10 * b01 + a20 * b02,
		a01 * b00 + a11 * b01 + a21 * b02,
		a02 * b00 + a12 * b01 + a22 * b02,
		a03 * b00 + a13 * b01 + a23 * b02,
		a00 * b10 + a10 * b11 + a20 * b12,
		a01 * b10 + a11 * b11 + a21 * b12,
		a02 * b10 + a12 * b11 + a22 * b12,
		a03 * b10 + a13 * b11 + a23 * b12,
		a00 * b20 + a10 * b21 + a20 * b22,
		a01 * b20 + a11 * b21 + a21 * b22,
		a02 * b20 + a12 * b21 + a22 * b22,
		a03 * b20 + a13 * b21 + a23 * b22,
		a[12], a[13], a[14], a[15],
	]
}

/**
 * Rotates a matrix by the given angle around the X axis
 */
export function rotateX(a: Mat4, rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)
	const a10 = a[4]
	const a11 = a[5]
	const a12 = a[6]
	const a13 = a[7]
	const a20 = a[8]
	const a21 = a[9]
	const a22 = a[10]
	const a23 = a[11]

	// prettier-ignore
	return [
		a[0], a[1], a[2], a[3],
		a10 * c + a20 * s, a11 * c + a21 * s, a12 * c + a22 * s, a13 * c + a23 * s,
		a20 * c - a10 * s, a21 * c - a11 * s, a22 * c - a12 * s, a23 * c - a13 * s,
		a[12], a[13], a[14], a[15],
	]
}

/**
 * Rotates a matrix by the given angle around the Y axis
 */
export function rotateY(a: Mat4, rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)
	const a00 = a[0]
	const a01 = a[1]
	const a02 = a[2]
	const a03 = a[3]
	const a20 = a[8]
	const a21 = a[9]
	const a22 = a[10]
	const a23 = a[11]

	// prettier-ignore
	return [
		a00 * c - a20 * s,
		a01 * c - a21 * s,
		a02 * c - a22 * s,
		a03 * c - a23 * s,
		a[4], a[5], a[6], a[7],
		a00 * s + a20 * c,
		a01 * s + a21 * c,
		a02 * s + a22 * c,
		a03 * s + a23 * c,
		a[12], a[13], a[14], a[15],
	]
}

/**
 * Rotates a matrix by the given angle around the Z axis
 */
export function rotateZ(a: Mat4, rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)
	const a00 = a[0]
	const a01 = a[1]
	const a02 = a[2]
	const a03 = a[3]
	const a10 = a[4]
	const a11 = a[5]
	const a12 = a[6]
	const a13 = a[7]

	// prettier-ignore
	return [
		a00 * c + a10 * s,
		a01 * c + a11 * s,
		a02 * c + a12 * s,
		a03 * c + a13 * s,
		a10 * c - a00 * s,
		a11 * c - a01 * s,
		a12 * c - a02 * s,
		a13 * c - a03 * s,
		a[8],  a[9],  a[10], a[11],
		a[12], a[13], a[14], a[15],
	]
}

/**
 * Creates a matrix from a vector translation
 * @category Generators
 */
export function fromTranslation(v: Vec3): Mat4 {
	const [x, y, z] = v

	// prettier-ignore
	return [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		x, y, z, 1,
	]
}

/**
 * Creates a matrix from a vector scaling
 * @category Generators
 */
export function fromScaling(v: Vec3): Mat4 {
	const [x, y, z] = v

	// prettier-ignore
	return [
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1
	]
}

/**
 * Creates a matrix from a given angle around a given axis
 * @category Generators
 */
export function fromRotation(rad: number, axis: Vec3): Mat4 | null {
	let [x, y, z] = axis
	const len = Math.sqrt(x * x + y * y + z * z)

	if (len < Common.EPSILON) {
		return null
	}

	x /= len
	y /= len
	z /= len

	const s = Math.sin(rad)
	const c = Math.cos(rad)
	const t = 1 - c

	// prettier-ignore
	return [
		x * x * t + c,
		y * x * t + z * s,
		z * x * t - y * s,
		0,
		x * y * t - z * s,
		y * y * t + c,
		z * y * t + x * s,
		0,
		x * z * t + y * s,
		y * z * t - x * s,
		z * z * t + c,
		0,
		0, 0, 0, 1,
	]
}

/**
 * Creates a matrix from the given angle around the X axis
 * @category Generators
 */
export function fromXRotation(rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		1,  0,  0,  0,
		0,  c,  s,  0,
		0, -s,  c,  0,
		0,  0,  0,  1
	]
}

/**
 * Creates a matrix from the given angle around the Y axis
 * @category Generators
 */
export function fromYRotation(rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		c,  0, -s,  0,
		0,  1,  0,  0,
		s,  0,  c,  0,
		0,  0,  0,  1
	]
}

/**
 * Creates a matrix from the given angle around the Z axis
 * @category Generators
 */
export function fromZRotation(rad: number): Mat4 {
	const s = Math.sin(rad)
	const c = Math.cos(rad)

	// prettier-ignore
	return [
		 c,  s,  0,  0,
		-s,  c,  0,  0,
		 0,  0,  1,  0,
		 0,  0,  0,  1
	]
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * @category Generators
 */
export function fromRotationTranslation(q: Quat, v: Vec3): Mat4 {
	// Quaternion math
	const [x, y, z, w] = q
	const x2 = x + x
	const y2 = y + y
	const z2 = z + z

	const xx = x * x2
	const xy = x * y2
	const xz = x * z2
	const yy = y * y2
	const yz = y * z2
	const zz = z * z2
	const wx = w * x2
	const wy = w * y2
	const wz = w * z2

	return [
		1 - (yy + zz),
		xy + wz,
		xz - wy,
		0,
		xy - wz,
		1 - (xx + zz),
		yz + wx,
		0,
		xz + wy,
		yz - wx,
		1 - (xx + yy),
		0,
		v[0],
		v[1],
		v[2],
		1,
	]
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 */
export function getTranslation(mat: Mat4): Vec3 {
	return [mat[12], mat[13], mat[14]]
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 */
export function getScaling(mat: Mat4): Vec3 {
	// prettier-ignore
	const [m11, m12, m13, ,
	       m21, m22, m23, ,
	       m31, m32, m33, ]= mat

	return [
		Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
		Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
		Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33),
	]
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 */
export function getRotation(mat: Mat4): Quat {
	const scaling = getScaling(mat)

	const is1 = 1 / scaling[0]
	const is2 = 1 / scaling[1]
	const is3 = 1 / scaling[2]

	const sm11 = mat[0] * is1
	const sm12 = mat[1] * is2
	const sm13 = mat[2] * is3
	const sm21 = mat[4] * is1
	const sm22 = mat[5] * is2
	const sm23 = mat[6] * is3
	const sm31 = mat[8] * is1
	const sm32 = mat[9] * is2
	const sm33 = mat[10] * is3

	const trace = sm11 + sm22 + sm33

	if (trace > 0) {
		const S = Math.sqrt(trace + 1) * 2
		return [(sm23 - sm32) / S, (sm31 - sm13) / S, (sm12 - sm21) / S, 0.25 * S]
	} else if (sm11 > sm22 && sm11 > sm33) {
		const S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2
		return [0.25 * S, (sm12 + sm21) / S, (sm31 + sm13) / S, (sm23 - sm32) / S]
	} else if (sm22 > sm33) {
		const S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2
		return [(sm12 + sm21) / S, 0.25 * S, (sm23 + sm32) / S, (sm31 - sm13) / S]
	} else {
		const S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2
		return [(sm31 + sm13) / S, (sm23 + sm32) / S, 0.25 * S, (sm12 - sm21) / S]
	}
}

interface DecomposedTRS {
	rot: Quat
	trans: Vec3
	scale: Vec3
}

/**
 * Decomposes a transformation matrix into its rotation, translation
 * and scale components. Returns only the rotation component
 *
 * @param  mat Matrix to be decomposed (input)
 */
export function decompose(mat: Mat4): DecomposedTRS {
	const trans: Vec3 = [mat[12], mat[13], mat[14]]

	// prettier-ignore
	const [m11, m12, m13, ,
	       m21, m22, m23, ,
	       m31, m32, m33, ] = mat

	const scale: Vec3 = [
		Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
		Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
		Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33),
	]

	const is1 = 1 / scale[0]
	const is2 = 1 / scale[1]
	const is3 = 1 / scale[2]

	const sm11 = m11 * is1
	const sm12 = m12 * is2
	const sm13 = m13 * is3
	const sm21 = m21 * is1
	const sm22 = m22 * is2
	const sm23 = m23 * is3
	const sm31 = m31 * is1
	const sm32 = m32 * is2
	const sm33 = m33 * is3

	const trace = sm11 + sm22 + sm33

	let rot: Quat

	if (trace > 0) {
		const S = Math.sqrt(trace + 1) * 2
		rot = [(sm23 - sm32) / S, (sm31 - sm13) / S, (sm12 - sm21) / S, 0.25 * S]
	} else if (sm11 > sm22 && sm11 > sm33) {
		const S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2
		rot = [0.25 * S, (sm12 + sm21) / S, (sm31 + sm13) / S, (sm23 - sm32) / S]
	} else if (sm22 > sm33) {
		const S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2
		rot = [(sm12 + sm21) / S, 0.25 * S, (sm23 + sm32) / S, (sm31 - sm13) / S]
	} else {
		const S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2
		rot = [(sm31 + sm13) / S, (sm23 + sm32) / S, 0.25 * S, (sm12 - sm21) / S]
	}

	return {
		trans,
		rot,
		scale,
	}
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     const quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @category Generators
 * @param rot Rotation quaternion
 * @param trans Translation vector
 * @param scale Scaling vector
 */
export function fromRotationTranslationScale(
	rot: Quat,
	trans: Vec3,
	scale: Vec3
): Mat4 {
	// Quaternion math
	const [x, y, z, w] = rot
	const x2 = x + x
	const y2 = y + y
	const z2 = z + z

	const xx = x * x2
	const xy = x * y2
	const xz = x * z2
	const yy = y * y2
	const yz = y * z2
	const zz = z * z2
	const wx = w * x2
	const wy = w * y2
	const wz = w * z2
	const sx = scale[0]
	const sy = scale[1]
	const sz = scale[2]

	return [
		(1 - (yy + zz)) * sx,
		(xy + wz) * sx,
		(xz - wy) * sx,
		0,
		(xy - wz) * sy,
		(1 - (xx + zz)) * sy,
		(yz + wx) * sy,
		0,
		(xz + wy) * sz,
		(yz - wx) * sz,
		(1 - (xx + yy)) * sz,
		0,
		trans[0],
		trans[1],
		trans[2],
		1,
	]
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     const quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @category Generators
 * @param rot Rotation quaternion
 * @param trans Translation vector
 * @param scale Scaling vector
 * @param origin The origin vector around which to scale and rotate
 */
export function fromRotationTranslationScaleOrigin(
	rot: Quat,
	trans: Vec3,
	scale: Vec3,
	origin: Vec3
) {
	// Quaternion math
	const [x, y, z, w] = rot
	const x2 = x + x
	const y2 = y + y
	const z2 = z + z

	const xx = x * x2
	const xy = x * y2
	const xz = x * z2
	const yy = y * y2
	const yz = y * z2
	const zz = z * z2
	const wx = w * x2
	const wy = w * y2
	const wz = w * z2

	const sx = scale[0]
	const sy = scale[1]
	const sz = scale[2]

	const ox = origin[0]
	const oy = origin[1]
	const oz = origin[2]

	const out0 = (1 - (yy + zz)) * sx
	const out1 = (xy + wz) * sx
	const out2 = (xz - wy) * sx
	const out4 = (xy - wz) * sy
	const out5 = (1 - (xx + zz)) * sy
	const out6 = (yz + wx) * sy
	const out8 = (xz + wy) * sz
	const out9 = (yz - wx) * sz
	const out10 = (1 - (xx + yy)) * sz

	// prettier-ignore
	return [
		out0, out1, out2, 0,
		out4, out5, out6, 0,
		out8, out9, out10, 0,
		trans[0] + ox - (out0 * ox + out4 * oy + out8 * oz),
		trans[1] + oy - (out1 * ox + out5 * oy + out9 * oz),
		trans[2] + oz - (out2 * ox + out6 * oy + out10 * oz),
		1,
	]
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param q Quaternion to create matrix from
 * @category Generators
 */
export function fromQuat(q: Quat): Mat4 {
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

	// prettier-ignore
	return [
		1 - yy - zz,
		yx + wz,
		zx - wy,
		0,

		yx - wz,
		1 - xx - zz,
		zy + wx,
		0,

		zx + wy,
		zy - wx,
		1 - xx - yy,
		0,

		0, 0, 0, 1,
	]
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 */
export function frustum(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number
) {
	const rl = 1 / (right - left)
	const tb = 1 / (top - bottom)
	const nf = 1 / (near - far)

	// prettier-ignore
	return [
		near * 2 * rl,       0,                0,                      0,
		0,                   near * 2 * tb,    0,                      0,
		(right + left) * rl, (top + bottom) * tb, (far + near) * nf,  -1,
		0,                   0,                   far * near * 2 * nf, 0,
	]
}

/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param fovy Vertical field of view in radians
 * @param aspect Aspect ratio. typically viewport width/height
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum, can be null or Infinity
 */
export function perspectiveNO(
	fovy: number,
	aspect: number,
	near: number,
	far: number
): Mat4 {
	const f = 1 / Math.tan(fovy / 2)

	let out10: number, out14: number

	if (far !== null && far !== Infinity) {
		const nf = 1 / (near - far)
		out10 = (far + near) * nf
		out14 = 2 * far * near * nf
	} else {
		out10 = -1
		out14 = -2 * near
	}

	// prettier-ignore
	return [
		f / aspect, 0, 0,      0,
		0,          f, 0,      0,
		0,          0, out10, -1,
		0,          0, out14,  0,
	]
}

/**
 * Alias for {@link mat4.perspectiveNO}
 * @function
 */
export const perspective = perspectiveNO

/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param fovy Vertical field of view in radians
 * @param aspect Aspect ratio. typically viewport width/height
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum, can be null or Infinity
 */
export function perspectiveZO(
	fovy: number,
	aspect: number,
	near: number,
	far: number | null
): Mat4 {
	const f = 1 / Math.tan(fovy / 2)

	let out10: number, out14: number

	if (far !== null && far !== Infinity) {
		const nf = 1 / (near - far)
		out10 = far * nf
		out14 = far * near * nf
	} else {
		out10 = -1
		out14 = -near
	}

	return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, out10, -1, 0, 0, out14, 0]
}

/**
 * Represents a field of view expressed in degrees.
 */
interface FovDegrees {
	upDegrees: number
	downDegrees: number
	leftDegrees: number
	rightDegrees: number
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 */
export function perspectiveFromFieldOfView(
	fov: FovDegrees,
	near: number,
	far: number
): Mat4 {
	const upTan = Math.tan((fov.upDegrees * Math.PI) / 180)
	const downTan = Math.tan((fov.downDegrees * Math.PI) / 180)
	const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180)
	const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180)
	const xScale = 2 / (leftTan + rightTan)
	const yScale = 2 / (upTan + downTan)

	// prettier-ignore
	return [
		xScale, 0, 0, 0,
		0, yScale, 0, 0,

		-((leftTan - rightTan) * xScale * 0.5),
		(upTan - downTan) * yScale * 0.5,
		far / (near - far),
		-1,

		0,
		0,
		(far * near) / (near - far),
		0,
	]
}

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 */
export function orthoNO(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number
): Mat4 {
	const lr = 1 / (left - right)
	const bt = 1 / (bottom - top)
	const nf = 1 / (near - far)

	// prettier-ignore
	return [
		-2 * lr,  0,      0,      0,
		 0,      -2 * bt, 0,      0,
		 0,       0,      2 * nf, 0,

		(left + right) * lr,
		(top + bottom) * bt,
		(far + near) * nf,
		1,
	]
}

/**
 * Alias for {@link mat4.orthoNO}
 * @function
 */
export const ortho = orthoNO

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param left Left bound of the frustum
 * @param right Right bound of the frustum
 * @param bottom Bottom bound of the frustum
 * @param top Top bound of the frustum
 * @param near Near bound of the frustum
 * @param far Far bound of the frustum
 */
export function orthoZO(
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number
): Mat4 {
	const lr = 1 / (left - right)
	const bt = 1 / (bottom - top)
	const nf = 1 / (near - far)

	// prettier-ignore
	return [
		-2 * lr,  0,      0,  0,
		 0,      -2 * bt, 0,  0,
		 0,       0,      nf, 0,

		(left + right) * lr,
		(top + bottom) * bt,
		near * nf,
		1,
	]
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param eye Position of the viewer
 * @param center Point the viewer is looking at
 * @param up vec3 pointing up
 */
export function lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4 {
	let x0, x1, x2, y0, y1, y2, z0, z1, z2, len
	const eyex = eye[0]
	const eyey = eye[1]
	const eyez = eye[2]
	const upx = up[0]
	const upy = up[1]
	const upz = up[2]
	const centerx = center[0]
	const centery = center[1]
	const centerz = center[2]

	if (
		Math.abs(eyex - centerx) < Common.EPSILON &&
		Math.abs(eyey - centery) < Common.EPSILON &&
		Math.abs(eyez - centerz) < Common.EPSILON
	) {
		return [...identity]
	}

	z0 = eyex - centerx
	z1 = eyey - centery
	z2 = eyez - centerz

	len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2)
	z0 *= len
	z1 *= len
	z2 *= len

	x0 = upy * z2 - upz * z1
	x1 = upz * z0 - upx * z2
	x2 = upx * z1 - upy * z0
	len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2)
	if (!len) {
		x0 = 0
		x1 = 0
		x2 = 0
	} else {
		len = 1 / len
		x0 *= len
		x1 *= len
		x2 *= len
	}

	y0 = z1 * x2 - z2 * x1
	y1 = z2 * x0 - z0 * x2
	y2 = z0 * x1 - z1 * x0

	len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2)
	if (!len) {
		y0 = 0
		y1 = 0
		y2 = 0
	} else {
		len = 1 / len
		y0 *= len
		y1 *= len
		y2 *= len
	}

	// prettier-ignore
	return [
		x0, y0, z0, 0,
		x1, y1, z1, 0,
		x2, y2, z2, 0,
		-(x0 * eyex + x1 * eyey + x2 * eyez),
		-(y0 * eyex + y1 * eyey + y2 * eyez),
		-(z0 * eyex + z1 * eyey + z2 * eyez),
		1,
	]
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param eye Position of the viewer
 * @param center Point the viewer is looking at
 * @param up vec3 pointing up
 */
export function targetTo(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
	const [eyex, eyey, eyez] = eye
	const [upx, upy, upz] = up

	let z0 = eyex - target[0],
		z1 = eyey - target[1],
		z2 = eyez - target[2]

	let len = z0 * z0 + z1 * z1 + z2 * z2

	if (len > 0) {
		len = 1 / Math.sqrt(len)
		z0 *= len
		z1 *= len
		z2 *= len
	}

	let x0 = upy * z2 - upz * z1,
		x1 = upz * z0 - upx * z2,
		x2 = upx * z1 - upy * z0

	len = x0 * x0 + x1 * x1 + x2 * x2

	if (len > 0) {
		len = 1 / Math.sqrt(len)
		x0 *= len
		x1 *= len
		x2 *= len
	}

	// prettier-ignore
	return [
		x0, x1, x2, 0,

		z1 * x2 - z2 * x1,
		z2 * x0 - z0 * x2,
		z0 * x1 - z1 * x0,
		0,

		z0, z1, z2, 0,
		eyex, eyey, eyez, 1,
	]
}

/**
 * Returns Frobenius norm of a mat4
 */
export function frob(a: Mat4) {
	return Math.sqrt(
		a[0] * a[0] +
			a[1] * a[1] +
			a[2] * a[2] +
			a[3] * a[3] +
			a[4] * a[4] +
			a[5] * a[5] +
			a[6] * a[6] +
			a[7] * a[7] +
			a[8] * a[8] +
			a[9] * a[9] +
			a[10] * a[10] +
			a[11] * a[11] +
			a[12] * a[12] +
			a[13] * a[13] +
			a[14] * a[14] +
			a[15] * a[15]
	)
}

/**
 * Adds given mat4's
 */
export function add(...ms: Mat4[]): Mat4 {
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
		a[6] + b[6],
		a[7] + b[7],
		a[8] + b[8],
		a[9] + b[9],
		a[10] + b[10],
		a[11] + b[11],
		a[12] + b[12],
		a[13] + b[13],
		a[14] + b[14],
		a[15] + b[15],
	]
}

/**
 * Subtracts matrix b from matrix a
 */
export function subtract(...ms: Mat4[]): Mat4 {
	if (ms.length === 0) {
		return zero
	} else if (ms.length === 1) {
		return [
			-ms[0],
			-ms[1],
			-ms[2],
			-ms[3],
			-ms[4],
			-ms[5],
			-ms[6],
			-ms[7],
			-ms[8],
			-ms[9],
			-ms[10],
			-ms[11],
			-ms[12],
			-ms[13],
			-ms[14],
			-ms[15],
		]
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
		a[6] - b[6],
		a[7] - b[7],
		a[8] - b[8],
		a[9] - b[9],
		a[10] - b[10],
		a[11] - b[11],
		a[12] - b[12],
		a[13] - b[13],
		a[14] - b[14],
		a[15] - b[15],
	]
}

/**
 * Multiply each element of the matrix by a scalar.
 */
export function multiplyScalar(a: Mat4, s: number): Mat4 {
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
		a[9] * s,
		a[10] * s,
		a[11] * s,
		a[12] * s,
		a[13] * s,
		a[14] * s,
		a[15] * s,
	]
}

/**
 Adds given mat4's after multiplying each element of the second operand by a scalar value.
 */
export function multiplyScalarAndAdd(a: Mat4, b: Mat4, scale: number): Mat4 {
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
		a[9] + b[9] * scale,
		a[10] + b[10] * scale,
		a[11] + b[11] * scale,
		a[12] + b[12] * scale,
		a[13] + b[13] * scale,
		a[14] + b[14] * scale,
		a[15] + b[15] * scale,
	]
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with `===`)
 */
export function exactEquals(a: Mat4, b: Mat4) {
	return (
		a[0] === b[0] &&
		a[1] === b[1] &&
		a[2] === b[2] &&
		a[3] === b[3] &&
		a[4] === b[4] &&
		a[5] === b[5] &&
		a[6] === b[6] &&
		a[7] === b[7] &&
		a[8] === b[8] &&
		a[9] === b[9] &&
		a[10] === b[10] &&
		a[11] === b[11] &&
		a[12] === b[12] &&
		a[13] === b[13] &&
		a[14] === b[14] &&
		a[15] === b[15]
	)
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 */
export function equals(a: Mat4, b: Mat4) {
	const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aA, aB, aC, aD, aE, aF] = a
	const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, bA, bB, bC, bD, bE, bF] = b

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
			Common.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
		Math.abs(a6 - b6) <=
			Common.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
		Math.abs(a7 - b7) <=
			Common.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
		Math.abs(a8 - b8) <=
			Common.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) &&
		Math.abs(a9 - b9) <=
			Common.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) &&
		Math.abs(aA - bA) <=
			Common.EPSILON * Math.max(1, Math.abs(aA), Math.abs(bA)) &&
		Math.abs(aB - bB) <=
			Common.EPSILON * Math.max(1, Math.abs(aB), Math.abs(bB)) &&
		Math.abs(aC - bC) <=
			Common.EPSILON * Math.max(1, Math.abs(aC), Math.abs(bC)) &&
		Math.abs(aD - bD) <=
			Common.EPSILON * Math.max(1, Math.abs(aD), Math.abs(bD)) &&
		Math.abs(aE - bE) <=
			Common.EPSILON * Math.max(1, Math.abs(aE), Math.abs(bE)) &&
		Math.abs(aF - bF) <=
			Common.EPSILON * Math.max(1, Math.abs(aF), Math.abs(bF))
	)
}

export const sub = subtract
export const mul = multiply
