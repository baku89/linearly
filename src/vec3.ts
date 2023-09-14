import * as Common from './common'
import {Mat3} from './mat3'
import {Mat4} from './mat4'
import {Quat} from './quat'

export type Vec3 = Readonly<MutableVec3>
export type MutableVec3 = [number, number, number]

export function of(x: number, y?: number, z?: number): Vec3 {
	if (y === undefined && z === undefined) {
		y = z = x
	}
	if (y === undefined) y = 0
	if (z === undefined) z = 0

	return [x, y, z]
}

/**
 * Creates a mutable clone of given vec3
 */
export function clone(a: Vec3): MutableVec3 {
	return [...a]
}

export const zero: Vec3 = Object.freeze([0, 0, 0])

export const one: Vec3 = Object.freeze([1, 1, 1])

/**
 * Adds two vec3's
 */
export function add(a: Vec3, b: Vec3): Vec3 {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

/**
 * Subtracts vector b from vector a
 */
export function subtract(a: Vec3, b: Vec3): Vec3 {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

/**
 * Multiplies two vec3's
 */
export function multiply(a: Vec3, b: Vec3): Vec3 {
	return [a[0] * b[0], a[1] * b[1], a[2] * b[2]]
}

/**
 * Divides two vec3's
 */
export function divide(a: Vec3, b: Vec3): Vec3 {
	return [a[0] / b[0], a[1] / b[1], a[2] / b[2]]
}

/**
 * Math.ceil the components of a vec3
 */
export function ceil(a: Vec3): Vec3 {
	return [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2])]
}

/**
 * Math.floor the components of a vec3
 */
export function floor(a: Vec3): Vec3 {
	return [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2])]
}

/**
 * Returns the minimum of two vec3's
 */
export function min(a: Vec3, b: Vec3): Vec3 {
	return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])]
}

/**
 * Returns the maximum of two vec3's
 */
export function max(a: Vec3, b: Vec3): Vec3 {
	return [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])]
}

/**
 *  Constrain a value to lie between two further values
 */
export function clamp(a: Vec3, min: Vec3, max: Vec3): Vec3 {
	return [
		Math.min(Math.max(a[0], min[0]), max[0]),
		Math.min(Math.max(a[1], min[1]), max[1]),
		Math.min(Math.max(a[2], min[2]), max[2]),
	]
}

/**
 * symmetric round the components of a vec3
 */
export function round(a: Vec3): Vec3 {
	return [Common.round(a[0]), Common.round(a[1]), Common.round(a[2])]
}
/**
 * Scales a vec3 by a scalar number
 */
export function scale(a: Vec3, s: number): Vec3 {
	return [a[0] * s, a[1] * s, a[2] * s]
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 */
export function scaleAndAdd(a: Vec3, b: Vec3, scale: number): Vec3 {
	return [a[0] + b[0] * scale, a[1] + b[1] * scale, a[2] + b[2] * scale]
}

/**
 * Calculates the euclidian distance between two vec3's
 */
export function distance(a: Vec3, b: Vec3) {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	return Math.sqrt(x * x + y * y + z * z)
}

/**
 * Calculates the squared euclidian distance between two vec3's
 */
export function squaredDistance(a: Vec3, b: Vec3) {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	return x * x + y * y + z * z
}

/**
 * Calculates the length of a vec3
 */
export function length(a: Vec3) {
	const [x, y, z] = a
	return Math.sqrt(x * x + y * y + z * z)
}

/**
 * Calculates the squared length of a vec3
 */
export function squaredLength(a: Vec3) {
	const x = a[0]
	const y = a[1]
	const z = a[2]
	return x * x + y * y + z * z
}

/**
 * Negates the components of a vec3
 */
export function negate(a: Vec3): Vec3 {
	return [-a[0], -a[1], -a[2]]
}

/**
 * Returns the inverse of the components of a vec3
 */
export function inverse(a: Vec3): Vec3 {
	return [1 / a[0], 1 / a[1], 1 / a[2]]
}

/**
 * Normalize a vec3
 */
export function normalize(a: Vec3): Vec3 {
	const [x, y, z] = a
	const hyp = x * x + y * y + z * z
	const len = hyp === 0 ? 0 : 1 / Math.sqrt(hyp)
	return [a[0] * len, a[1] * len, a[2] * len]
}

/**
 * Calculates the dot product of two vec3's
 */
export function dot(a: Vec3, b: Vec3) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

/**
 * Computes the cross product of two vec3's
 */
export function cross(a: Vec3, b: Vec3): Vec3 {
	const [ax, ay, az] = a
	const [bx, by, bz] = b

	return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]
}

/**
 * Performs a linear interpolation between two vec3's
 */
export function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
	const [ax, ay, az] = a

	return [ax + t * (b[0] - ax), ay + t * (b[1] - ay), az + t * (b[2] - az)]
}

/**
 * Performs a spherical linear interpolation between two vec3's
 */
export function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
	const angle = Math.acos(Math.min(Math.max(dot(a, b), -1), 1))
	const sinTotal = Math.sin(angle)

	const ratioA = Math.sin((1 - t) * angle) / sinTotal
	const ratioB = Math.sin(t * angle) / sinTotal

	return [
		ratioA * a[0] + ratioB * b[0],
		ratioA * a[1] + ratioB * b[1],
		ratioA * a[2] + ratioB * b[2],
	]
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param a the first operand
 * @param b the second operand
 * @param c the third operand
 * @param d the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 */
export function hermite(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3 {
	const factorTimes2 = t * t
	const factor1 = factorTimes2 * (2 * t - 3) + 1
	const factor2 = factorTimes2 * (t - 2) + t
	const factor3 = factorTimes2 * (t - 1)
	const factor4 = factorTimes2 * (3 - 2 * t)

	return [
		a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4,
		a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4,
		a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4,
	]
}

/**
 * Performs a bezier interpolation with two control points
 */
export function bezier(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3 {
	const inverseFactor = 1 - t
	const inverseFactorTimesTwo = inverseFactor * inverseFactor
	const factorTimes2 = t * t
	const factor1 = inverseFactorTimesTwo * inverseFactor
	const factor2 = 3 * t * inverseFactorTimesTwo
	const factor3 = 3 * factorTimes2 * inverseFactor
	const factor4 = factorTimes2 * t

	return [
		a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4,
		a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4,
		a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4,
	]
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 */
export function transformMat4(a: Vec3, m: Mat4): Vec3 {
	const [x, y, z] = a
	const w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1

	return [
		(m[0] * x + m[4] * y + m[8] * z + m[12]) / w,
		(m[1] * x + m[5] * y + m[9] * z + m[13]) / w,
		(m[2] * x + m[6] * y + m[10] * z + m[14]) / w,
	]
}

/**
 * Transforms the vec3 with a mat3.
 */
export function transformMat3(a: Vec3, m: Mat3): Vec3 {
	const x = a[0],
		y = a[1],
		z = a[2]
	return [
		x * m[0] + y * m[3] + z * m[6],
		x * m[1] + y * m[4] + z * m[7],
		x * m[2] + y * m[5] + z * m[8],
	]
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param a the vector to transform
 * @param q quaternion to transform with
 */
// https://github.com/stackgl/gl-vec3/blob/master/transformQuat.js
export function transformQuat(a: Vec3, q: Quat): Vec3 {
	// benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

	const x = a[0],
		y = a[1],
		z = a[2],
		qx = q[0],
		qy = q[1],
		qz = q[2],
		qw = q[3],
		// calculate quat * vec
		ix = qw * x + qy * z - qz * y,
		iy = qw * y + qz * x - qx * z,
		iz = qw * z + qx * y - qy * x,
		iw = -qx * x - qy * y - qz * z

	// calculate result * inverse quat
	return [
		ix * qw + iw * -qx + iy * -qz - iz * -qy,
		iy * qw + iw * -qy + iz * -qx - ix * -qz,
		iz * qw + iw * -qz + ix * -qy - iy * -qx,
	]
}

/**
 * Rotate a 3D vector around the x-axis
 * @param a The vec3 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 */
export function rotateX(a: Vec3, b: Vec3, rad: number): Vec3 {
	//Translate point to the origin
	const p = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]

	//perform rotation
	const r = [
		p[0],
		p[1] * Math.cos(rad) - p[2] * Math.sin(rad),
		p[1] * Math.sin(rad) + p[2] * Math.cos(rad),
	]

	//translate to correct position
	return [r[0] + b[0], r[1] + b[1], r[2] + b[2]]
}

/**
 * Rotate a 3D vector around the y-axis
 * @param a The vec3 point to rotate
 * @param origin The origin of the rotation
 * @param rad The angle of rotation in radians
 */
export function rotateY(a: Vec3, origin: Vec3, rad: number): Vec3 {
	//Translate point to the origin
	const p = [a[0] - origin[0], a[1] - origin[1], a[2] - origin[2]]

	//perform rotation
	const r = [
		p[2] * Math.sin(rad) + p[0] * Math.cos(rad),
		p[1],
		p[2] * Math.cos(rad) - p[0] * Math.sin(rad),
	]

	//translate to correct position
	return [r[0] + origin[0], r[1] + origin[1], r[2] + origin[2]]
}

/**
 * Rotate a 3D vector around the z-axis
 * @param a The vec3 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 */
export function rotateZ(a: Vec3, b: Vec3, rad: number): Vec3 {
	//Translate point to the origin
	const p = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]

	//perform rotation
	const r = [
		p[0] * Math.cos(rad) - p[1] * Math.sin(rad),
		p[0] * Math.sin(rad) + p[1] * Math.cos(rad),
		p[2],
	]

	//translate to correct position
	return [r[0] + b[0], r[1] + b[1], r[2] + b[2]]
}

/**
 * Get the angle between two 3D vectors
 * @param a The first operand
 * @param b The second operand
 * @returns The angle in radians
 */
export function angle(a: Vec3, b: Vec3) {
	const [ax, ay, az] = a
	const [bx, by, bz] = b
	const mag = Math.sqrt(
		(ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)
	)
	const cosine = mag && dot(a, b) / mag

	return Math.acos(Math.min(Math.max(cosine, -1), 1))
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 */
export function exactEquals(a: Vec3, b: Vec3) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 */
export function equals(a: Vec3, b: Vec3) {
	const [a0, a1, a2] = a
	const [b0, b1, b2] = b

	return (
		Math.abs(a0 - b0) <=
			Common.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2))
	)
}
