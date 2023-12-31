import * as Common from './common'
import {mat2} from './mat2'
import {mat2d} from './mat2d'
import {mat3} from './mat3'
import {scalar} from './scalar'
import {vec3} from './vec3'

/**
 * Represents 2D vector
 * @category Types
 */
export type vec2 = readonly [x: number, y: number]

/**
 * Functions for {@link vec2}, a 2D vector.
 */
export namespace vec2 {
	/**
	 * Mutable version of {@link vec2}
	 * @category Types
	 */
	export type Mutable = [x: number, y: number]

	/**
	 * Creates a new vector from given elements
	 * @category Generators
	 */
	export function of(x: number, y: number = x): vec2 {
		return [x, y]
	}

	/**
	 * Creates a mutable clone of given vec2
	 * @category Generators
	 */
	export function clone(a: vec2): Mutable {
		return [...a]
	}

	/**
	 * @category Constants
	 */
	export const zero: vec2 = Object.freeze([0, 0])

	/**
	 * @category Constants
	 */
	export const one: vec2 = Object.freeze([1, 1])

	/**
	 * An unit vector pointing toward positiove X. Same as `[1, 0]`
	 * @category Constants
	 */
	export const unitX: vec2 = Object.freeze([1, 0])

	/**
	 * An unit vector pointing toward positiove Y. Same as `[0, 1]`
	 * @category Constants
	 */
	export const unitY: vec2 = Object.freeze([0, 1])

	/**
	 * Add the given vectors
	 */
	export function add(...vs: vec2[]): vec2 {
		let x = 0,
			y = 0

		for (const v of vs) {
			x += v[0]
			y += v[1]
		}

		return [x, y]
	}

	/**
	 * Subtracts the given vec2's. When the argument is a single vector, it negates it. Otherwise, it subtracts from left to right.
	 */
	export function subtract(...vs: vec2[]): vec2 {
		if (vs.length === 0) {
			return zero
		}

		if (vs.length === 1) {
			return [-vs[0], -vs[1]]
		}

		const [first, ...rest] = vs

		const ret: Mutable = [...first]

		for (const v of rest) {
			ret[0] -= v[0]
			ret[1] -= v[1]
		}

		return ret
	}

	/**
	 * Subtracts b from a
	 */
	export function delta(a: vec2, b: vec2): vec2 {
		return [b[0] - a[0], b[1] - a[1]]
	}

	export function multiply(...vs: vec2[]): vec2 {
		let x = 1,
			y = 1

		for (const v of vs) {
			x *= v[0]
			y *= v[1]
		}

		return [x, y]
	}

	export function divide(...vs: vec2[]): vec2 {
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

	export function min(...vs: vec2[]): vec2 {
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

	export function max(...vs: vec2[]): vec2 {
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
	 * Constrain a value to lie between two further values
	 * @see https://thebookofshaders.com/glossary/?search=clamp
	 * @param v the value to constrain
	 * @param min the lower end of the range into which to constrain `v`
	 * @param max the upper end of the range into which to constrain `v`
	 */
	export function clamp(v: vec2, min: vec2 | number, max: vec2 | number): vec2 {
		if (typeof min === 'number') min = [min, min]
		if (typeof max === 'number') max = [max, max]

		return [
			Math.min(Math.max(v[0], min[0]), max[0]),
			Math.min(Math.max(v[1], min[1]), max[1]),
		]
	}

	/**
	 * symmetric round the components of a vec2
	 */
	export function round(a: vec2): vec2 {
		return [Common.round(a[0]), Common.round(a[1])]
	}

	export function ceil(a: vec2): vec2 {
		return [Math.ceil(a[0]), Math.ceil(a[1])]
	}

	export function floor(a: vec2): vec2 {
		return [Math.floor(a[0]), Math.floor(a[1])]
	}

	/**
	 * Removes the fractional part
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/trunc.html
	 */
	export function trunc(v: vec2): vec2 {
		return [
			v[0] < 0 ? Math.ceil(v[0]) : Math.floor(v[0]),
			v[1] < 0 ? Math.ceil(v[1]) : Math.floor(v[1]),
		]
	}

	/**
	 * Computes the fractional part of the argument
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
	 */
	export function fract(a: vec2): vec2 {
		return sub(a, floor(a))
	}

	/**
	 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
	 * @see https://thebookofshaders.com/glossary/?search=mod
	 */
	export function mod(a: vec2, b: vec2 | number): vec2 {
		if (typeof b === 'number') b = [b, b]

		return [
			a[0] - b[0] * Math.floor(a[0] / b[0]),
			a[1] - b[1] * Math.floor(a[1] / b[1]),
		]
	}

	export function quantize(
		v: vec2,
		step: vec2 | number,
		offset: vec2 | number = zero
	): vec2 {
		if (typeof step === 'number') step = [step, step]
		if (typeof offset === 'number') offset = [offset, offset]

		return [
			Math.round((v[0] - offset[0]) / step[0]) * step[0] + offset[0],
			Math.round((v[1] - offset[1]) / step[1]) * step[1] + offset[1],
		]
	}

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param a the vector to scale
	 * @param s amount to scale the vector by
	 */
	export function scale(a: vec2, s: number): vec2 {
		return [a[0] * s, a[1] * s]
	}

	/**
	 * Returns the average value of the input(s)
	 * @see  https://www.sidefx.com/docs/houdini/vex/functions/avg.html
	 */
	export function average(...vs: vec2[]): vec2 {
		let x = 0,
			y = 0
		const len = vs.length || 1
		for (const v of vs) {
			x += v[0]
			y += v[1]
		}
		return [x / len, y / len]
	}

	/**
 Adds given vec2's after scaling the second operand by a scalar value
 */
	export function scaleAndAdd(a: vec2, b: vec2, scale: number): vec2 {
		return [a[0] + b[0] * scale, a[1] + b[1] * scale]
	}

	/**
	 * Calculates the euclidian distance between two vec2's
	 */
	export function distance(a: vec2, b: vec2) {
		const x = b[0] - a[0],
			y = b[1] - a[1]
		return Math.sqrt(x * x + y * y)
	}

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 */
	export function squaredDistance(a: vec2, b: vec2) {
		const x = b[0] - a[0],
			y = b[1] - a[1]
		return x * x + y * y
	}

	/**
	 * Calculates the length of a vec2
	 */
	export function length(v: vec2) {
		return Math.sqrt(v[0] ** 2 + v[1] ** 2)
	}

	/**
	 * Calculates the squared length of a vec2
	 */
	export function squaredLength(v: vec2) {
		return v[0] ** 2 + v[1] ** 2
	}

	/**
	 * Negates the components of a vec2
	 */
	export function negate(v: vec2): vec2 {
		return [-v[0], -v[1]]
	}

	/**
	 * Returns the inverse of the components of a vec2
	 */
	export function inverse(v: vec2): vec2 {
		return [1 / v[0], 1 / v[1]]
	}

	/**
	 * Returns the result of `v` subtracted from {@link vec2.one}.
	 */
	export function oneMinus(v: vec2): vec2 {
		return subtract(one, v)
	}

	export function normalize(v: vec2): vec2 {
		const hyp = v[0] ** 2 + v[1] ** 2
		const len = hyp === 0 ? 0 : 1 / Math.sqrt(hyp)
		return [v[0] * len, v[1] * len]
	}

	export function dot(a: vec2, b: vec2) {
		return a[0] * b[0] + a[1] * b[1]
	}

	export function cross(a: vec2, b: vec2): vec3 {
		const z = a[0] * b[1] - a[1] * b[0]
		return [0, 0, z]
	}

	/**
	 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 */
	export function lerp(a: vec2, b: vec2, t: vec2 | number): vec2 {
		if (typeof t === 'number') t = [t, t]

		return [a[0] + t[0] * (b[0] - a[0]), a[1] + t[1] * (b[1] - a[1])]
	}

	/**
	 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
	 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
	 */
	export function inverseLerp(a: vec2, b: vec2, t: vec2): vec2 {
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
		value: vec2,
		omin: vec2,
		omax: vec2,
		nmin: vec2,
		nmax: vec2
	): vec2 {
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
		value: vec2,
		omin: vec2,
		omax: vec2,
		nmin: vec2,
		nmax: vec2
	): vec2 {
		const t: vec2 = [
			(value[0] - omin[0]) / (omax[0] - omin[0]),
			(value[0] - omin[0]) / (omax[0] - omin[0]),
		]
		return lerp(nmin, nmax, t)
	}

	export function transformMat2(a: vec2, m: mat2): vec2 {
		const [x, y] = a
		return [m[0] * x + m[2] * y, m[1] * x + m[3] * y]
	}

	export function transformMat2d(a: vec2, m: mat2d): vec2 {
		const [x, y] = a
		return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]
	}

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 */
	export function transformMat3(a: vec2, m: mat3): vec2 {
		const [x, y] = a
		return [m[0] * x + m[3] * y + m[6], m[1] * x + m[4] * y + m[7]]
	}

	/**
	 * Rotate a 2D vector
	 */
	export function rotate(a: vec2, rad: number, origin: vec2 = zero): vec2 {
		// Translate point to the origin
		const p0 = a[0] - origin[0],
			p1 = a[1] - origin[1],
			sinC = Math.sin(rad),
			cosC = Math.cos(rad)

		// Perform rotation and translate to correct position
		return [
			p0 * cosC - p1 * sinC + origin[0],
			p0 * sinC + p1 * cosC + origin[1],
		]
	}

	/**
	 * Get the angle between two 2D vectors. If the second argument is omitted, it returns a signed angle relative to x axis.
	 */
	export function angle(a: vec2, b?: vec2) {
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
	export function direction(rad: number, length = 1): vec2 {
		return [Math.cos(rad) * length, Math.sin(rad) * length]
	}

	/**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with `===`)
	 */
	export function exactEquals(a: vec2, b: vec2) {
		return a[0] === b[0] && a[1] === b[1]
	}

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 */
	export function equals(a: vec2, b: vec2) {
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
	export function step(edge: vec2 | number, v: vec2): vec2 {
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
	export function smoothstep(edge0: vec2, edge1: vec2, x: vec2) {
		const t0 = scalar.clamp((x[0] - edge0[0]) / (edge1[0] - edge0[0]), 0, 1)
		const t1 = scalar.clamp((x[1] - edge1[1]) / (edge1[1] - edge1[1]), 0, 1)

		return [t0 * t0 * (3 - 2 * t0), t1 * t1 * (3 - 2 * t1)]
	}

	export function degrees(rad: vec2): vec2 {
		return [(rad[0] * 180) / Math.PI, (rad[1] * 180) / Math.PI]
	}

	export function radians(deg: vec2): vec2 {
		return [(deg[0] * Math.PI) / 180, (deg[1] * Math.PI) / 180]
	}

	export function sin(v: vec2): vec2 {
		return [Math.sin(v[0]), Math.sin(v[1])]
	}

	export function cos(v: vec2): vec2 {
		return [Math.cos(v[0]), Math.cos(v[1])]
	}

	export function tan(v: vec2): vec2 {
		return [Math.tan(v[0]), Math.tan(v[1])]
	}

	export function asin(v: vec2): vec2 {
		return [Math.asin(v[0]), Math.asin(v[1])]
	}

	export function acos(v: vec2): vec2 {
		return [Math.acos(v[0]), Math.acos(v[1])]
	}

	/**
	 * Returns the arc-tangent of the parameters.
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 */
	export function atan(yOverX: vec2): vec2
	export function atan(y: vec2, x?: vec2): vec2 {
		if (x === undefined) {
			return [Math.atan(y[0]), Math.atan(y[1])]
		} else {
			return [Math.atan2(y[0], x[0]), Math.atan2(y[1], x[1])]
		}
	}

	export function pow(a: vec2, b: vec2): vec2 {
		return [Math.pow(a[0], b[0]), Math.pow(a[1], b[1])]
	}

	export function exp(v: vec2): vec2 {
		return [Math.exp(v[0]), Math.exp(v[1])]
	}

	export function log(v: vec2): vec2 {
		return [Math.log(v[0]), Math.log(v[1])]
	}

	/**
	 * Returns 2 raised to the power of the parameter
	 * @param v the value of the powe to which 2 will be raised
	 */
	export function exp2(v: vec2): vec2 {
		return [2 ** v[0], 2 ** v[1]]
	}

	export function log2(v: vec2): vec2 {
		return [Math.log2(v[0]), Math.log2(v[1])]
	}

	export function sqrt(v: vec2): vec2 {
		return [Math.sqrt(v[0]), Math.sqrt(v[1])]
	}

	/**
	 * Returns the inverse of the square root of the parameter
	 * @param v the value of which to take the inverse of the square root
	 * @see https://thebookofshaders.com/glossary/?search=inversesqrt
	 */
	export function inverseSqrt(v: vec2): vec2 {
		return [1 / Math.sqrt(v[0]), 1 / Math.sqrt(v[1])]
	}

	/**
	 * Returns the string representation of a vec2
	 * @param v vector to represent as a string
	 * @param fractionDigits number of digits to appear after the decimal point
	 */
	export const toString = Common.vecToString as (
		v: vec2,
		fractionDigits?: number
	) => string

	/**
	 * Alias for {@link vec2.subtract}
	 * @category Aliases
	 */
	export const sub = subtract

	/**
	 * Alias for {@link vec2.multiply}
	 * @category Aliases
	 */
	export const mul = multiply

	/**
	 * Alias for {@link vec2.divide}
	 * @category Aliases
	 */
	export const div = divide

	/**
	 * Alias for {@link vec2.average}
	 * @category Aliases
	 */
	export const avg = average

	/**
	 * Alias for {@link vec2.distance}
	 * @category Aliases
	 */
	export const dist = distance

	/**
	 * Alias for {@link vec2.length}
	 * @category Aliases
	 */
	export const len = length

	/**
	 * Alias for {@link vec2.squaredEquals}
	 * @category Aliases
	 */
	export const sqrDist = squaredDistance

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @category Aliases
	 */
	export const sqrLen = squaredLength

	/**
	 * Alias for {@link vec2.negate}
	 */
	export const neg = negate

	/**
	 * Alias for {@link vec2.lerp}
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 * @category Aliases
	 */
	export const mix = lerp

	/**
	 * Alias for {@link vec2.inverseLerp}
	 * @category Aliases
	 */
	export const invlerp = inverseLerp

	/**
	 * Alias for {@link vec2.radians}
	 * @category Aliases
	 */
	export const rad = radians

	/**
	 * Alias for {@link vec2.degrees}
	 * @category Aliases
	 */
	export const deg = degrees

	/**
	 * Alias for {@link vec2.inverseSqrt}
	 * @category Aliases
	 */
	export const invsqrt = inverseSqrt
}
