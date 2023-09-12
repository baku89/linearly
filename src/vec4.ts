import * as Common from './common.js'
import {Mat4} from './mat4.js'
import {Quat} from './quat.js'

export type Vec4 = readonly [number, number, number, number]

/**
 * Adds two vec4's
 */
export function add(a: Vec4, b: Vec4): Vec4 {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
}

/**
 * Subtracts vector b from vector a
 */
export function subtract(a: Vec4, b: Vec4): Vec4 {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]
}

/**
 * Multiplies two vec4's
 */
export function multiply(a: Vec4, b: Vec4): Vec4 {
	return [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]]
}

/**
 * Divides two vec4's
 */
export function divide(a: Vec4, b: Vec4): Vec4 {
	return [a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3]]
}

/**
 * Math.ceil the components of a vec4
 */
export function ceil(a: Vec4): Vec4 {
	return [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3])]
}

/**
 * Math.floor the components of a vec4
 */
export function floor(a: Vec4): Vec4 {
	return [
		Math.floor(a[0]),
		Math.floor(a[1]),
		Math.floor(a[2]),
		Math.floor(a[3]),
	]
}

/**
 * Returns the minimum of two vec4's
 */
export function min(a: Vec4, b: Vec4): Vec4 {
	return [
		Math.min(a[0], b[0]),
		Math.min(a[1], b[1]),
		Math.min(a[2], b[2]),
		Math.min(a[3], b[3]),
	]
}

/**
 * Returns the maximum of two vec4's
 */
export function max(a: Vec4, b: Vec4): Vec4 {
	return [
		Math.max(a[0], b[0]),
		Math.max(a[1], b[1]),
		Math.max(a[2], b[2]),
		Math.max(a[3], b[3]),
	]
}

/**
 * symmetric round the components of a vec4
 */
export function round(a: Vec4): Vec4 {
	return [
		Common.round(a[0]),
		Common.round(a[1]),
		Common.round(a[2]),
		Common.round(a[3]),
	]
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param a the vector to scale
 * @param s amount to scale the vector by
 */
export function scale(a: Vec4, s: number): Vec4 {
	return [a[0] * s, a[1] * s, a[2] * s, a[3] * s]
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 * @param scale the amount to scale b by before adding
 */
export function scaleAndAdd(a: Vec4, b: Vec4, scale: number): Vec4 {
	return [
		a[0] + b[0] * scale,
		a[1] + b[1] * scale,
		a[2] + b[2] * scale,
		a[3] + b[3] * scale,
	]
}

/**
 * Calculates the euclidian distance between two vec4's
 */
export function distance(a: Vec4, b: Vec4) {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	const w = b[3] - a[3]
	return Math.sqrt(x * x + y * y + z * z + w * w)
}

/**
 * Calculates the squared euclidian distance between two vec4's
 */
export function squaredDistance(a: Vec4, b: Vec4) {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	const w = b[3] - a[3]

	return x * x + y * y + z * z + w * w
}

/**
 * Calculates the length of a vec4
 */
export function length(a: Vec4) {
	const [x, y, z, w] = a
	return Math.sqrt(x * x + y * y + z * z + w * w)
}

/**
 * Calculates the squared length of a vec4
 */
export function squaredLength(a: Vec4) {
	const [x, y, z, w] = a
	return x * x + y * y + z * z + w * w
}

/**
 * Negates the components of a vec4
 */
export function negate(a: Vec4): Vec4 {
	return [-a[0], -a[1], -a[2], -a[3]]
}

/**
 * Returns the inverse of the components of a vec4
 */
export function inverse(a: Vec4): Vec4 {
	return [1.0 / a[0], 1.0 / a[1], 1.0 / a[2], 1.0 / a[3]]
}

/**
 * Normalize a vec4
 */
export function normalize(a: Vec4): Vec4 {
	const [x, y, z, w] = a
	const hyp = x * x + y * y + z * z + w * w
	const len = hyp === 0 ? 0 : 1 / Math.sqrt(hyp)
	return [x * len, y * len, z * len, w * len]
}

/**
 * Calculates the dot product of two vec4's
 */
export function dot(a: Vec4, b: Vec4) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}

/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 */
export function cross(u: Vec4, v: Vec4, w: Vec4): Vec4 {
	const A = v[0] * w[1] - v[1] * w[0]
	const B = v[0] * w[2] - v[2] * w[0]
	const C = v[0] * w[3] - v[3] * w[0]
	const D = v[1] * w[2] - v[2] * w[1]
	const E = v[1] * w[3] - v[3] * w[1]
	const F = v[2] * w[3] - v[3] * w[2]
	const [G, H, I, J] = u

	return [
		H * F - I * E + J * D,
		-(G * F) + I * C - J * B,
		G * E - H * C + J * A,
		-(G * D) + H * B - I * A,
	]
}

/**
 * Performs a linear interpolation between two vec4's
 * @param t interpolation amount, in the range [0-1], between the two inputs
 */
export function lerp(a: Vec4, b: Vec4, t: number): Vec4 {
	const [ax, ay, az, aw] = a

	return [
		ax + t * (b[0] - ax),
		ay + t * (b[1] - ay),
		az + t * (b[2] - az),
		aw + t * (b[3] - aw),
	]
}

/**
 * Transforms the vec4 with a mat4.
 */
export function transformMat4(a: Vec4, m: Mat4): Vec4 {
	const [x, y, z, w] = a
	return [
		m[0] * x + m[4] * y + m[8] * z + m[12] * w,
		m[1] * x + m[5] * y + m[9] * z + m[13] * w,
		m[2] * x + m[6] * y + m[10] * z + m[14] * w,
		m[3] * x + m[7] * y + m[11] * z + m[15] * w,
	]
}

/**
 * Transforms the vec4 with a quat
 */
export function transformQuat(a: Vec4, q: Quat): Vec4 {
	const [x, y, z] = a
	const [qx, qy, qz, qw] = q

	// calculate quat * vec
	const ix = qw * x + qy * z - qz * y
	const iy = qw * y + qz * x - qx * z
	const iz = qw * z + qx * y - qy * x
	const iw = -qx * x - qy * y - qz * z

	// calculate result * inverse quat
	return [
		ix * qw + iw * -qx + iy * -qz - iz * -qy,
		iy * qw + iw * -qy + iz * -qx - ix * -qz,
		iz * qw + iw * -qz + ix * -qy - iy * -qx,
		a[3],
	]
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 */
export function exactEquals(a: Vec4, b: Vec4) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 */
export function equals(a: Vec4, b: Vec4) {
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
