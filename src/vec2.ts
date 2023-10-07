import * as Common from './common'
import {Mat2} from './mat2'
import {Mat2d} from './mat2d'
import {Mat3} from './mat3'
import * as scalar from './scalar'
import {Vec3} from './vec3'

/**
 * Represents 2D vector
 */
export type Vec2 = Readonly<MutableVec2>

/**
 * Mutable version of {@link Vec2}
 */
export type MutableVec2 = [number, number]

/**
 * Creates a new vector from given elements
 * @category Generators
 */
export function of(x: number, y: number = x): Vec2 {
	return [x, y]
}

/**
 * Creates a mutable clone of given vec2
 * @category Generators
 */
export function clone(a: Vec2): MutableVec2 {
	return [...a]
}

/**
 * @category Constants
 */
export const zero: Vec2 = Object.freeze([0, 0])

/**
 * @category Constants
 */
export const one: Vec2 = Object.freeze([1, 1])

/**
 * @category Constants
 */
export const xAxis: Vec2 = Object.freeze([1, 0])

/**
 * @category Constants
 */
export const yAxis: Vec2 = Object.freeze([0, 1])

/**
 */
export function add(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return zero
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return add(add(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] + b[0], a[1] + b[1]]
}

/**
 */
export function subtract(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return zero
	} else if (vs.length === 1) {
		return [-vs[0], -vs[1]]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return subtract(subtract(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] - b[0], a[1] - b[1]]
}

/**
 * Subtracts b from a
 */
export function delta(a: Vec2, b: Vec2): Vec2 {
	return [b[0] - a[0], b[1] - a[1]]
}

export function multiply(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return one
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return multiply(multiply(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] * b[0], a[1] * b[1]]
}

export function divide(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return one
	} else if (vs.length === 1) {
		return divide(one, vs[0])
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return divide(divide(a, b), ...rest)
	}

	const [a, b] = vs

	return [a[0] / b[0], a[1] / b[1]]
}

export function min(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return [Infinity, Infinity]
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return min(min(a, b), ...rest)
	}

	const [a, b] = vs

	return [Math.min(a[0], b[0]), Math.min(a[1], b[1])]
}

export function max(...vs: Vec2[]): Vec2 {
	if (vs.length === 0) {
		return [-Infinity, -Infinity]
	} else if (vs.length === 1) {
		return vs[0]
	} else if (vs.length > 2) {
		const [a, b, ...rest] = vs
		return max(max(a, b), ...rest)
	}

	const [a, b] = vs

	return [Math.max(a[0], b[0]), Math.max(a[1], b[1])]
}

/**
 *  Constrain a value to lie between two further values
 * @param a Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 */
export function clamp(a: Vec2, min: Vec2 | number, max: Vec2 | number): Vec2 {
	if (typeof min === 'number') min = [min, min]
	if (typeof max === 'number') max = [max, max]

	return [
		Math.min(Math.max(a[0], min[0]), max[0]),
		Math.min(Math.max(a[1], min[1]), max[1]),
	]
}

/**
 * symmetric round the components of a vec2
 */
export function round(a: Vec2): Vec2 {
	return [Common.round(a[0]), Common.round(a[1])]
}

export function ceil(a: Vec2): Vec2 {
	return [Math.ceil(a[0]), Math.ceil(a[1])]
}

export function floor(a: Vec2): Vec2 {
	return [Math.floor(a[0]), Math.floor(a[1])]
}

/**
 * Computes the fractional part of the argument
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
 */
export function fract(a: Vec2): Vec2 {
	return sub(a, floor(a))
}

/**
 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
 * @see https://thebookofshaders.com/glossary/?search=mod
 */
export function mod(a: Vec2, b: Vec2 | number): Vec2 {
	if (typeof b === 'number') b = [b, b]

	return [
		a[0] - b[0] * Math.floor(a[0] / b[0]),
		a[1] - b[1] * Math.floor(a[1] / b[1]),
	]
}

export function quantize(
	v: Vec2,
	step: Vec2 | number,
	offset: Vec2 | number = zero
): Vec2 {
	if (typeof step === 'number') step = [step, step]
	if (typeof offset === 'number') offset = [offset, offset]

	return [
		Math.round((v[0] - offset[0]) / step[0]) * step[0] + offset[0],
		Math.round((v[1] - offset[1]) / step[1]) * step[1] + offset[1],
	]
}

export function scale(a: Vec2, s: number): Vec2 {
	return [a[0] * s, a[1] * s]
}

/**
 Adds given vec2's after scaling the second operand by a scalar value
 */
export function scaleAndAdd(a: Vec2, b: Vec2, scale: number): Vec2 {
	return [a[0] + b[0] * scale, a[1] + b[1] * scale]
}

export function distance(a: Vec2, b: Vec2) {
	const x = b[0] - a[0],
		y = b[1] - a[1]
	return Math.sqrt(x * x + y * y)
}

export function squaredDistance(a: Vec2, b: Vec2) {
	const x = b[0] - a[0],
		y = b[1] - a[1]
	return x * x + y * y
}

export function length(v: Vec2) {
	return Math.sqrt(v[0] ** 2 + v[1] ** 2)
}

export function squaredLength(v: Vec2) {
	return v[0] ** 2 + v[1] ** 2
}

export function negate(v: Vec2): Vec2 {
	return [-v[0], -v[1]]
}

export function inverse(v: Vec2): Vec2 {
	return [1 / v[0], 1 / v[1]]
}

export function normalize(v: Vec2): Vec2 {
	const hyp = v[0] ** 2 + v[1] ** 2
	const len = hyp === 0 ? 0 : 1 / Math.sqrt(hyp)
	return [v[0] * len, v[1] * len]
}

export function dot(a: Vec2, b: Vec2) {
	return a[0] * b[0] + a[1] * b[1]
}

export function cross(a: Vec2, b: Vec2): Vec3 {
	const z = a[0] * b[1] - a[1] * b[0]
	return [0, 0, z]
}

/**
 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 */
export function lerp(a: Vec2, b: Vec2, t: Vec2 | number): Vec2 {
	if (typeof t === 'number') t = [t, t]

	return [a[0] + t[0] * (b[0] - a[0]), a[1] + t[1] * (b[1] - a[1])]
}

/**
 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
 */
export function inverseLerp(a: Vec2, b: Vec2, t: Vec2): Vec2 {
	return [
		a[0] === b[0] ? 0.5 : (t[0] - a[0]) / (b[0] - a[0]),
		a[1] === b[1] ? 0.5 : (t[1] - a[1]) / (b[1] - a[1]),
	]
}

/**
 * Takes the value in the range `(omin, omax)` and shifts it to the corresponding value in the new range `(nmin, nmax)`. The function clamps the given value the range `(omin, omax)` before fitting, so the resulting value will be guaranteed to be in the range `(nmin, nmax)`. To avoid clamping use efit instead.
 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit.html
 * @param value
 * @param omin
 * @param omax
 * @param nmin
 * @param nmax
 * @returns
 */
export function fit(
	value: Vec2,
	omin: Vec2,
	omax: Vec2,
	nmin: Vec2,
	nmax: Vec2
): Vec2 {
	const t = clamp(
		[
			(value[0] - omin[0]) / (omax[0] - omin[0]),
			(value[0] - omin[0]) / (omax[0] - omin[0]),
		],
		0,
		1
	)

	return lerp(nmin, nmax, t)
}

/**
 * Takes the value in the range `(omin, omax)` and shifts it to the corresponding value in the new range `(nmin, nmax)`. Unlike `fit`, this function does not clamp values to the given range.
 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit.html
 * @param value
 * @param omin
 * @param omax
 * @param nmin
 * @param nmax
 * @returns
 */
export function efit(
	value: Vec2,
	omin: Vec2,
	omax: Vec2,
	nmin: Vec2,
	nmax: Vec2
): Vec2 {
	const t: Vec2 = [
		(value[0] - omin[0]) / (omax[0] - omin[0]),
		(value[0] - omin[0]) / (omax[0] - omin[0]),
	]
	return lerp(nmin, nmax, t)
}

export function transformMat2(a: Vec2, m: Mat2): Vec2 {
	const [x, y] = a
	return [m[0] * x + m[2] * y, m[1] * x + m[3] * y]
}

export function transformMat2d(a: Vec2, m: Mat2d): Vec2 {
	const [x, y] = a
	return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 */
export function transformMat3(a: Vec2, m: Mat3): Vec2 {
	const [x, y] = a
	return [m[0] * x + m[3] * y + m[6], m[1] * x + m[4] * y + m[7]]
}

/**
 * Rotate a 2D vector
 */
export function rotate(a: Vec2, rad: number, origin: Vec2 = zero): Vec2 {
	// Translate point to the origin
	const p0 = a[0] - origin[0],
		p1 = a[1] - origin[1],
		sinC = Math.sin(rad),
		cosC = Math.cos(rad)

	// Perform rotation and translate to correct position
	return [p0 * cosC - p1 * sinC + origin[0], p0 * sinC + p1 * cosC + origin[1]]
}

/**
 * Get the angle between two 2D vectors. If the second argument is omitted, it returns a signed angle relative to x axis.
 */
export function angle(a: Vec2, b?: Vec2) {
	if (!b) return Math.atan2(a[1], a[0])

	const [x1, y1] = a
	const [x2, y2] = b
	// mag is the product of the magnitudes of a and b
	const mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
	// mag &&.. short circuits if mag == 0
	const cosine = mag && (x1 * x2 + y1 * y2) / mag
	// Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
	return Math.acos(Math.min(Math.max(cosine, -1), 1))
}

/**
 * Creates a vector by given direction and length
 */
export function direction(rad: number, length = 1): Vec2 {
	return [Math.cos(rad) * length, Math.sin(rad) * length]
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with `===`)
 */
export function exactEquals(a: Vec2, b: Vec2) {
	return a[0] === b[0] && a[1] === b[1]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 */
export function equals(a: Vec2, b: Vec2) {
	const [a0, a1] = a
	const [b0, b1] = b
	return (
		Math.abs(a0 - b0) <=
			Common.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <=
			Common.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1))
	)
}

/**
 * Apply a step function by comparing two values
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
 * @param edge The location of the edge of the step function.
 * @param v The value to be used to generate the step function.
 * @returns
 */
export function step(edge: Vec2 | number, v: Vec2): Vec2 {
	if (typeof edge === 'number') edge = [edge, edge]

	return [v[0] < edge[0] ? 0 : 1, v[1] < edge[1] ? 0 : 1]
}

/**
 * Perform Hermite interpolation between two values.
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/smoothstep.xhtml
 * @param edge0 Lower edge of the Hermite function.
 * @param edge1 Upper edge of the Hermite function.
 * @param x  Source value for interpolation.
 * @returns
 */
export function smoothstep(edge0: Vec2, edge1: Vec2, x: Vec2) {
	const t0 = scalar.clamp((x[0] - edge0[0]) / (edge1[0] - edge0[0]), 0, 1)
	const t1 = scalar.clamp((x[1] - edge1[1]) / (edge1[1] - edge1[1]), 0, 1)

	return [t0 * t0 * (3 - 2 * t0), t1 * t1 * (3 - 2 * t1)]
}

export function degrees(rad: Vec2): Vec2 {
	return [(rad[0] * 180) / Math.PI, (rad[1] * 180) / Math.PI]
}

export function radians(deg: Vec2): Vec2 {
	return [(deg[0] * Math.PI) / 180, (deg[1] * Math.PI) / 180]
}

export const sub = subtract
export const mul = multiply
export const div = divide
export const dist = distance
export const len = length
export const sqrDist = squaredDistance
export const sqrLen = squaredLength
export const mix = lerp
export const invlerp = inverseLerp
export const rad = radians
export const deg = degrees
