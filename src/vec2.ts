import * as Common from './common'
import {Mat2} from './mat2'
import {Mat2d} from './mat2d'
import {Mat3} from './mat3'
import {Vec3} from './vec3'

export type Vec2 = Readonly<MutableVec2>
export type MutableVec2 = [number, number]

export function of(x: number, y: number = x): Vec2 {
	return [x, y]
}

/**
 * Creates a mutable clone of given vec2
 */
export function clone(a: Vec2): MutableVec2 {
	return [...a]
}

export const zero: Vec2 = Object.freeze([0, 0])

export const one: Vec2 = Object.freeze([1, 1])

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

export function ceil(a: Vec2): Vec2 {
	return [Math.ceil(a[0]), Math.ceil(a[1])]
}

export function floor(a: Vec2): Vec2 {
	return [Math.floor(a[0]), Math.floor(a[1])]
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
 */
export function clamp(a: Vec2, min: Vec2, max: Vec2): Vec2 {
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

export function scale(a: Vec2, s: number): Vec2 {
	return [a[0] * s, a[1] * s]
}

/**
 * Adds two vec2's after scaling the second operand by a scalar value
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
 * Performs a linear interpolation between two Vec2's
 */
export function lerp(a: Vec2, b: Vec2, t: number): Vec2 {
	const [ax, ay] = a
	return [ax + t * (b[0] - ax), ay + t * (b[1] - ay)]
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
export function rotate(a: Vec2, origin: Vec2, rad: number): Vec2 {
	// Translate point to the origin
	const p0 = a[0] - origin[0],
		p1 = a[1] - origin[1],
		sinC = Math.sin(rad),
		cosC = Math.cos(rad)

	// Perform rotation and translate to correct position
	return [p0 * cosC - p1 * sinC + origin[0], p0 * sinC + p1 * cosC + origin[1]]
}

/**
 * Get the angle between two 2D vectors
 */
export function angle(a: Vec2, b: Vec2) {
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
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
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

export const sub = subtract
export const mul = multiply
export const div = divide
export const dist = distance
export const len = length
export const sqrDist = squaredDistance
export const sqrLen = squaredLength
