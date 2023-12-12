import * as Common from './common'
import {mat4} from './mat4'
import {quat} from './quat'
import {scalar} from './scalar'

/**
 * Represents 4D vector
 * @category Types
 */
export type vec4 = readonly [x: number, y: number, z: number, w: number]

/**
 * Functions for {@link vec4}, a 4D vector.
 */
export namespace vec4 {
	/**
	 * Mutable version of {@link vec4}
	 * @category Types
	 */
	export type Mutable = [x: number, y: number, z: number, w: number]

	/**
	 * Creates a new vector from given elements
	 * @category Generators
	 */
	export function of(x: number, y?: number, z?: number, w?: number): vec4 {
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
	export function clone(a: vec4): Mutable {
		return [...a]
	}

	/**
	 * @category Constants
	 */
	export const zero: vec4 = Object.freeze([0, 0, 0, 0])

	/**
	 * @category Constants
	 */
	export const one: vec4 = Object.freeze([1, 1, 1, 1])

	/**
	 * An unit vector pointing towards positive Y. Same as `[1, 0, 0, 0]`
	 * @category Constants
	 */
	export const unitX: vec4 = Object.freeze([1, 0, 0, 0])

	/**
	 * An unit vector pointing towards positive Y. Same as `[0, 1, 0, 0]`
	 * @category Constants
	 */
	export const unitY: vec4 = Object.freeze([0, 1, 0, 0])

	/**
	 * An unit vector pointing towards positive Z. Same as `[0, 0, 1, 0]`
	 * @category Constants
	 */
	export const unitZ: vec4 = Object.freeze([0, 0, 1, 0])

	/**
	 * An unit vector pointing towards positive W. Same as `[0, 0, 0, 1]`
	 * @category Constants
	 */
	export const unitW: vec4 = Object.freeze([0, 0, 0, 1])

	/**
	 * Adds given vec4's
	 */
	export function add(...vs: vec4[]): vec4 {
		if (vs.length === 0) {
			return zero
		} else if (vs.length === 1) {
			return vs[0]
		} else if (vs.length > 2) {
			const [a, b, ...rest] = vs
			return add(add(a, b), ...rest)
		}

		const [a, b] = vs

		return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
	}

	/**
	 * Subtracts vector b from vector a
	 */
	export function subtract(...vs: vec4[]): vec4 {
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
	export function delta(a: vec4, b: vec4): vec4 {
		return [b[0] - a[0], b[1] - a[1], b[2] - a[2], b[3] - a[3]]
	}

	/**
	 * Multiplies given vec4's
	 */
	export function multiply(...vs: vec4[]): vec4 {
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
	export function divide(...vs: vec4[]): vec4 {
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
	 * symmetric round the components of a vec4
	 */
	export function round(a: vec4): vec4 {
		return [
			Common.round(a[0]),
			Common.round(a[1]),
			Common.round(a[2]),
			Common.round(a[3]),
		]
	}

	/**
	 * Math.ceil the components of a vec4
	 */
	export function ceil(a: vec4): vec4 {
		return [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3])]
	}

	/**
	 * Math.floor the components of a vec4
	 */
	export function floor(a: vec4): vec4 {
		return [
			Math.floor(a[0]),
			Math.floor(a[1]),
			Math.floor(a[2]),
			Math.floor(a[3]),
		]
	}

	/**
	 * Removes the fractional part
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/trunc.html
	 */
	export function trunc(v: vec4): vec4 {
		return [
			v[0] < 0 ? Math.ceil(v[0]) : Math.floor(v[0]),
			v[1] < 0 ? Math.ceil(v[1]) : Math.floor(v[1]),
			v[2] < 0 ? Math.ceil(v[2]) : Math.floor(v[2]),
			v[3] < 0 ? Math.ceil(v[3]) : Math.floor(v[3]),
		]
	}

	/**
	 * Computes the fractional part of the argument
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
	 */
	export function fract(a: vec4): vec4 {
		return sub(a, floor(a))
	}

	/**
	 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
	 * @see https://thebookofshaders.com/glossary/?search=mod
	 */
	export function mod(a: vec4, b: vec4 | number): vec4 {
		if (typeof b === 'number') b = [b, b, b, b]

		return [
			a[0] - b[0] * Math.floor(a[0] / b[0]),
			a[1] - b[1] * Math.floor(a[1] / b[1]),
			a[2] - b[2] * Math.floor(a[2] / b[2]),
			a[3] - b[3] * Math.floor(a[3] / b[3]),
		]
	}

	export function quantize(
		v: vec4,
		step: vec4 | number,
		offset: vec4 | number = zero
	): vec4 {
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
	export function min(...vs: vec4[]): vec4 {
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
	export function max(...vs: vec4[]): vec4 {
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
	 * Constrain a value to lie between two further values
	 * @see https://thebookofshaders.com/glossary/?search=clamp
	 * @param v the value to constrain
	 * @param min the lower end of the range into which to constrain `v`
	 * @param max the upper end of the range into which to constrain `v`
	 */
	export function clamp(a: vec4, min: vec4 | number, max: vec4 | number): vec4 {
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
	 * Scales a vec4 by a scalar number
	 *
	 * @param a the vector to scale
	 * @param s amount to scale the vector by
	 */
	export function scale(a: vec4, s: number): vec4 {
		return [a[0] * s, a[1] * s, a[2] * s, a[3] * s]
	}

	/**
	 * Returns the average value of the input(s)
	 * @see  https://www.sidefx.com/docs/houdini/vex/functions/avg.html
	 */
	export function average(...vs: vec4[]): vec4 {
		let x = 0,
			y = 0,
			z = 0,
			w = 0
		const len = vs.length || 1
		for (const v of vs) {
			x += v[0]
			y += v[1]
			z += v[2]
			w += v[3]
		}
		return [x / len, y / len, z / len, w / len]
	}

	/**
 Adds given vec4's after scaling the second operand by a scalar value
 * @param scale the amount to scale b by before adding
 */
	export function scaleAndAdd(a: vec4, b: vec4, scale: number): vec4 {
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
	export function distance(a: vec4, b: vec4) {
		const x = b[0] - a[0]
		const y = b[1] - a[1]
		const z = b[2] - a[2]
		const w = b[3] - a[3]
		return Math.sqrt(x * x + y * y + z * z + w * w)
	}

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 */
	export function squaredDistance(a: vec4, b: vec4) {
		const x = b[0] - a[0]
		const y = b[1] - a[1]
		const z = b[2] - a[2]
		const w = b[3] - a[3]

		return x * x + y * y + z * z + w * w
	}

	/**
	 * Calculates the length of a vec4
	 */
	export function length(a: vec4) {
		const [x, y, z, w] = a
		return Math.sqrt(x * x + y * y + z * z + w * w)
	}

	/**
	 * Calculates the squared length of a vec4
	 */
	export function squaredLength(a: vec4) {
		const [x, y, z, w] = a
		return x * x + y * y + z * z + w * w
	}

	/**
	 * Negates the components of a vec4
	 */
	export function negate(a: vec4): vec4 {
		return [-a[0], -a[1], -a[2], -a[3]]
	}

	/**
	 * Returns the inverse of the components of a vec4
	 */
	export function inverse(a: vec4): vec4 {
		return [1 / a[0], 1 / a[1], 1 / a[2], 1 / a[3]]
	}

	/**
	 * Returns the result of `v` subtracted from {@link vec4.one}.
	 */
	export function oneMinus(v: vec4): vec4 {
		return subtract(one, v)
	}

	/**
	 * Normalize a vec4
	 */
	export function normalize(a: vec4): vec4 {
		const [x, y, z, w] = a
		const hyp = x * x + y * y + z * z + w * w
		const len = hyp === 0 ? 0 : 1 / Math.sqrt(hyp)
		return [x * len, y * len, z * len, w * len]
	}

	/**
	 * Calculates the dot product of two vec4's
	 */
	export function dot(a: vec4, b: vec4) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
	}

	/**
	 * Returns the cross-product of three vectors in a 4-dimensional space
	 */
	export function cross(u: vec4, v: vec4, w: vec4): vec4 {
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
	export function lerp(a: vec4, b: vec4, t: vec4 | number): vec4 {
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
	export function inverseLerp(a: vec4, b: vec4, t: vec4): vec4 {
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
	export function transformMat4(a: vec4, m: mat4): vec4 {
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
	export function transformQuat(a: vec4, q: quat): vec4 {
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
	export function step(edge: vec4 | number, v: vec4): vec4 {
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
	export function smoothstep(edge0: vec4, edge1: vec4, x: vec4): vec4 {
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

	export function degrees(rad: vec4): vec4 {
		return [
			(rad[0] * 180) / Math.PI,
			(rad[1] * 180) / Math.PI,
			(rad[2] * 180) / Math.PI,
			(rad[3] * 180) / Math.PI,
		]
	}

	export function radians(deg: vec4): vec4 {
		return [
			(deg[0] * Math.PI) / 180,
			(deg[1] * Math.PI) / 180,
			(deg[2] * Math.PI) / 180,
			(deg[3] * Math.PI) / 180,
		]
	}

	export function sin(v: vec4): vec4 {
		return [Math.sin(v[0]), Math.sin(v[1]), Math.sin(v[2]), Math.sin(v[3])]
	}

	export function cos(v: vec4): vec4 {
		return [Math.cos(v[0]), Math.cos(v[1]), Math.cos(v[2]), Math.cos(v[3])]
	}

	export function tan(v: vec4): vec4 {
		return [Math.tan(v[0]), Math.tan(v[1]), Math.tan(v[2]), Math.tan(v[3])]
	}

	export function asin(v: vec4): vec4 {
		return [Math.asin(v[0]), Math.asin(v[1]), Math.asin(v[2]), Math.asin(v[3])]
	}

	export function acos(v: vec4): vec4 {
		return [Math.acos(v[0]), Math.acos(v[1]), Math.acos(v[2]), Math.acos(v[3])]
	}

	/**
	 * Returns the arc-tangent of the parameters.
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 */
	export function atan(yOverX: vec4): vec4
	export function atan(y: vec4, x?: vec4): vec4 {
		if (x === undefined) {
			return [
				Math.atan(y[0]),
				Math.atan(y[1]),
				Math.atan(y[2]),
				Math.atan(y[3]),
			]
		} else {
			return [
				Math.atan2(y[0], x[0]),
				Math.atan2(y[1], x[1]),
				Math.atan2(y[2], x[2]),
				Math.atan2(y[3], x[3]),
			]
		}
	}

	export function pow(a: vec4, b: vec4): vec4 {
		return [
			Math.pow(a[0], b[0]),
			Math.pow(a[1], b[1]),
			Math.pow(a[2], b[2]),
			Math.pow(a[3], b[3]),
		]
	}

	export function exp(v: vec4): vec4 {
		return [Math.exp(v[0]), Math.exp(v[1]), Math.exp(v[2]), Math.exp(v[3])]
	}

	export function log(v: vec4): vec4 {
		return [Math.log(v[0]), Math.log(v[1]), Math.log(v[2]), Math.log(v[3])]
	}

	/**
	 * Returns 2 raised to the power of the parameter
	 * @param v the value of the powe to which 2 will be raised
	 */
	export function exp2(v: vec4): vec4 {
		return [2 ** v[0], 2 ** v[1], 2 ** v[2], 2 ** v[3]]
	}

	export function log2(v: vec4): vec4 {
		return [Math.log2(v[0]), Math.log2(v[1]), Math.log2(v[2]), Math.log2(v[3])]
	}

	export function sqrt(v: vec4): vec4 {
		return [Math.sqrt(v[0]), Math.sqrt(v[1]), Math.sqrt(v[2]), Math.sqrt(v[3])]
	}

	/**
	 * Returns the inverse of the square root of the parameter
	 * @param v the value of which to take the inverse of the square root
	 * @see https://thebookofshaders.com/glossary/?search=inversesqrt
	 */
	export function inverseSqrt(v: vec4): vec4 {
		return [
			1 / Math.sqrt(v[0]),
			1 / Math.sqrt(v[1]),
			1 / Math.sqrt(v[2]),
			1 / Math.sqrt(v[3]),
		]
	}

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with `===`)
	 */
	export function exactEquals(a: vec4, b: vec4) {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
	}

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 */
	export function equals(a: vec4, b: vec4) {
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
	 * Returns the string representation of a vec4
	 * @param v vector to represent as a string
	 * @param fractionDigits number of digits to appear after the decimal point
	 */
	export const toString = Common.vecToString as (
		v: vec4,
		fractionDigits?: number
	) => string

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
	export const avg = average

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
	 * Alias for {@link vec4.negate}
	 */
	export const neg = negate

	/**
	 * Alias for {@link vec4.mix}
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 */
	export const mix = lerp

	/**
	 * Alias for {@link vec4.inverseLerp}
	 */
	export const invlerp = inverseLerp

	/**
	 * Alias for {@link vec4.radians}
	 * @category Aliases
	 */
	export const rad = radians

	/**
	 * Alias for {@link vec4.degrees}
	 * @category Aliases
	 */
	export const deg = degrees

	/**
	 * Alias for {@link vec4.inverseSqrt}
	 * @category Aliases
	 */
	export const invsqrt = inverseSqrt
}
