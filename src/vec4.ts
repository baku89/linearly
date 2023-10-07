import * as Common from './common'
import {Mat4} from './mat4'
import {Quat} from './quat'
import * as scalar from './scalar'

/**
 * Represents 4D vector
 * @category Types
 */
export type Vec4 = readonly [x: number, y: number, z: number, w: number]

/**
 * Mutable version of {@link Vec4}
 * @category Types
 */
export type MutableVec4 = [x: number, y: number, z: number, w: number]

/**
 * Creates a new vector from given elements
 * @category Generators
 */
export function of(x: number, y?: number, z?: number, w?: number): Vec4 {
	if (y === undefined && z === undefined && w === undefined) {
		y = z = w = x
	}
	if (y === undefined) y = 0
	if (z === undefined) z = 0
	if (w === undefined) w = 0

	return [x, y, z, w]
}

/**
 * Creates a mutable clone of given vec4
 * @category Generators
 */
export function clone(a: Vec4): MutableVec4 {
	return [...a]
}

/**
 * @category Constants
 */
export const zero: Vec4 = Object.freeze([0, 0, 0, 0])

/**
 * @category Constants
 */
export const one: Vec4 = Object.freeze([1, 1, 1, 1])

/**
 * An unit vector pointing towards positive Y. Same as `[1, 0, 0, 0]`
 * @category Constants
 */
export const unitX: Vec4 = Object.freeze([1, 0, 0, 0])

/**
 * An unit vector pointing towards positive Y. Same as `[0, 1, 0, 0]`
 * @category Constants
 */
export const unitY: Vec4 = Object.freeze([0, 1, 0, 0])

/**
 * An unit vector pointing towards positive Z. Same as `[0, 0, 1, 0]`
 * @category Constants
 */
export const unitZ: Vec4 = Object.freeze([0, 0, 1, 0])

/**
 * An unit vector pointing towards positive W. Same as `[0, 0, 0, 1]`
 * @category Constants
 */
export const unitW: Vec4 = Object.freeze([0, 0, 0, 1])

/**
 * Adds given vec4's
 */
export function add(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return zero
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return subtract(subtract(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
}

/**
 * Subtracts vector b from vector a
 */
export function subtract(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return zero
	} else if (vs.length === 1) {
		return [-vs[0], -vs[1], -vs[2], -vs[3]]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return subtract(subtract(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]
}

/**
 * Subtracts b from a
 */
export function delta(a: Vec4, b: Vec4): Vec4 {
	return [b[0] - a[0], b[1] - a[1], b[2] - a[2], b[3] - a[3]]
}

/**
 * Multiplies given vec4's
 */
export function multiply(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return one
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return multiply(multiply(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]]
}

/**
 * Divides given vec4's
 */
export function divide(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return one
	} else if (vs.length === 1) {
		return divide(one, vs[0])
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return divide(divide(a, b), ...rest)
	}

	const [a, b] = vs

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
 * Computes the fractional part of the argument
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
 */
export function fract(a: Vec4): Vec4 {
	return sub(a, floor(a))
}

/**
 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
 * @see https://thebookofshaders.com/glossary/?search=mod
 */
export function mod(a: Vec4, b: Vec4 | number): Vec4 {
	if (typeof b === 'number') b = [b, b, b, b]

	return [
		a[0] - b[0] * Math.floor(a[0] / b[0]),
		a[1] - b[1] * Math.floor(a[1] / b[1]),
		a[2] - b[2] * Math.floor(a[2] / b[2]),
		a[3] - b[3] * Math.floor(a[3] / b[3]),
	]
}

export function quantize(
	v: Vec4,
	step: Vec4 | number,
	offset: Vec4 | number = zero
): Vec4 {
	if (typeof step === 'number') step = [step, step, step, step]
	if (typeof offset === 'number') offset = [offset, offset, offset, offset]

	return [
		Math.round((v[0] - offset[0]) / step[0]) * step[0] + offset[0],
		Math.round((v[1] - offset[1]) / step[1]) * step[1] + offset[1],
		Math.round((v[2] - offset[2]) / step[2]) * step[2] + offset[2],
		Math.round((v[3] - offset[3]) / step[3]) * step[3] + offset[3],
	]
}

/**
 * Returns the minimum of givenvec4's
 */
export function min(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return [Infinity, Infinity, Infinity, Infinity]
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return min(min(a, b), ...rest)
	}

	const [a, b] = vs
	return [
		Math.min(a[0], b[0]),
		Math.min(a[1], b[1]),
		Math.min(a[2], b[2]),
		Math.min(a[3], b[3]),
	]
}

/**
 * Returns the maximum of givenvec4's
 */
export function max(...vs: Vec4[]): Vec4 {
	if (vs.length === 0) {
		return [-Infinity, -Infinity, -Infinity, -Infinity]
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return max(max(a, b), ...rest)
	}

	const [a, b] = vs

	return [
		Math.max(a[0], b[0]),
		Math.max(a[1], b[1]),
		Math.max(a[2], b[2]),
		Math.max(a[3], b[3]),
	]
}

/**
 *  Constrain a value to lie between two further values
 */
export function clamp(a: Vec4, min: Vec4 | number, max: Vec4 | number): Vec4 {
	if (typeof min === 'number') min = [min, min, min, min]
	if (typeof max === 'number') max = [max, max, max, max]

	return [
		Math.min(Math.max(a[0], min[0]), max[0]),
		Math.min(Math.max(a[1], min[1]), max[1]),
		Math.min(Math.max(a[2], min[2]), max[2]),
		Math.min(Math.max(a[3], min[3]), max[3]),
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
 Adds given vec4's after scaling the second operand by a scalar value
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
	return [1 / a[0], 1 / a[1], 1 / a[2], 1 / a[3]]
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
 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 */
export function lerp(a: Vec4, b: Vec4, t: Vec4 | number): Vec4 {
	if (typeof t === 'number') t = [t, t, t, t]

	return [
		a[0] + t[0] * (b[0] - a[0]),
		a[1] + t[1] * (b[1] - a[1]),
		a[2] + t[2] * (b[2] - a[2]),
		a[3] + t[3] * (b[3] - a[3]),
	]
}

/**
 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
 */
export function inverseLerp(a: Vec4, b: Vec4, t: Vec4): Vec4 {
	return [
		a[0] === b[0] ? 0.5 : (t[0] - a[0]) / (b[0] - a[0]),
		a[1] === b[1] ? 0.5 : (t[1] - a[1]) / (b[1] - a[1]),
		a[2] === b[2] ? 0.5 : (t[2] - a[2]) / (b[2] - a[2]),
		a[3] === b[3] ? 0.5 : (t[3] - a[3]) / (b[3] - a[3]),
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
 * Apply a step function by comparing two values
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
 * @param edge The location of the edge of the step function.
 * @param x The value to be used to generate the step function.
 * @returns
 */
export function step(edge: Vec4 | number, v: Vec4): Vec4 {
	if (typeof edge === 'number') edge = [edge, edge, edge, edge]

	return [
		v[0] < edge[0] ? 0 : 1,
		v[1] < edge[1] ? 0 : 1,
		v[2] < edge[2] ? 0 : 1,
		v[3] < edge[3] ? 0 : 1,
	]
}

/**
 * Perform Hermite interpolation between two values.
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/smoothstep.xhtml
 * @param edge0 Lower edge of the Hermite function.
 * @param edge1 Upper edge of the Hermite function.
 * @param x  Source value for interpolation.
 * @returns
 */
export function smoothstep(edge0: Vec4, edge1: Vec4, x: Vec4): Vec4 {
	const t0 = scalar.clamp((x[0] - edge0[0]) / (edge1[0] - edge0[0]), 0, 1)
	const t1 = scalar.clamp((x[1] - edge1[1]) / (edge1[1] - edge1[1]), 0, 1)
	const t2 = scalar.clamp((x[2] - edge1[2]) / (edge1[2] - edge1[2]), 0, 1)
	const t3 = scalar.clamp((x[3] - edge1[3]) / (edge1[3] - edge1[3]), 0, 1)

	return [
		t0 * t0 * (3 - 2 * t0),
		t1 * t1 * (3 - 2 * t1),
		t2 * t2 * (3 - 2 * t2),
		t3 * t3 * (3 - 2 * t3),
	]
}

export function degrees(rad: Vec4): Vec4 {
	return [
		(rad[0] * 180) / Math.PI,
		(rad[1] * 180) / Math.PI,
		(rad[2] * 180) / Math.PI,
		(rad[3] * 180) / Math.PI,
	]
}

export function radians(deg: Vec4): Vec4 {
	return [
		(deg[0] * Math.PI) / 180,
		(deg[1] * Math.PI) / 180,
		(deg[2] * Math.PI) / 180,
		(deg[3] * Math.PI) / 180,
	]
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with `===`)
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
			Common.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
		Math.abs(a2 - b2) <=
			Common.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
		Math.abs(a3 - b3) <=
			Common.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3))
	)
}

/**
 * Alias for {@link vec4.subtract}
 */
export const sub = subtract

/**
 * Alias for {@link vec4.multiply}
 */
export const mul = multiply

/**
 * Alias for {@link vec4.divide}
 */
export const div = divide

/**
 * Alias for {@link vec4.distance}
 */
export const dist = distance

/**
 * Alias for {@link vec4.length}
 */
export const len = length

/**
 * Alias for {@link vec4.squaredDistance}
 */
export const sqrDist = squaredDistance

/**
 * Alias for {@link vec4.squaredLength}
 */
export const sqrLen = squaredLength

/**
 * Alias for {@link vec4.mix}
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 */
export const mix = lerp

/**
 * Alias for {@link vec4.inverseLerp}
 */
export const invlerp = inverseLerp
export const rad = radians
export const deg = degrees
