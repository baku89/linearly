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
		let x = 0,
			y = 0,
			z = 0,
			w = 0

		for (const v of vs) {
			x += v[0]
			y += v[1]
			z += v[2]
			w += v[3]
		}

		return [x, y, z, w]
	}

	/**
	 * Subtracts given vec4's. When the argument is a single vector, it negates it. Otherwise, it subtracts from left to right.
	 *
	 * @shorthands
	 * - {@link sub}
	 */
	export function subtract(...vs: vec4[]): vec4 {
		if (vs.length === 0) {
			return zero
		}

		if (vs.length === 1) {
			return [-vs[0][0], -vs[0][1], -vs[0][2], -vs[0][3]]
		}

		const [first, ...rest] = vs

		const ret: Mutable = [...first]

		for (const v of rest) {
			ret[0] -= v[0]
			ret[1] -= v[1]
			ret[2] -= v[2]
			ret[3] -= v[3]
		}

		return ret
	}

	/**
	 * Alias for {@link subtract}
	 */
	export const sub = subtract

	/**
	 * Subtracts b from a
	 */
	export function delta(a: vec4, b: vec4): vec4 {
		return [b[0] - a[0], b[1] - a[1], b[2] - a[2], b[3] - a[3]]
	}

	/**
	 * Multiplies given vec4's
	 * @shorthands
	 * - {@link mul}
	 */
	export function multiply(...vs: vec4[]): vec4 {
		let x = 1,
			y = 1,
			z = 1,
			w = 1

		for (const v of vs) {
			x *= v[0]
			y *= v[1]
			z *= v[2]
			w *= v[3]
		}

		return [x, y, z, w]
	}

	/**
	 * Alias for {@link multiply}
	 */
	export const mul = multiply

	/**
	 * Divides given vec4's
	 *
	 * @shorthands
	 * - {@link div}
	 */
	export function divide(...vs: vec4[]): vec4 {
		if (vs.length === 0) {
			return one
		}

		if (vs.length === 1) {
			return [1 / vs[0][0], 1 / vs[0][1], 1 / vs[0][2], 1 / vs[0][3]]
		}

		const [first, ...rest] = vs

		let [x, y, z, w] = first

		for (const v of rest) {
			x /= v[0]
			y /= v[1]
			z /= v[2]
			w /= v[3]
		}

		return [x, y, z, w]
	}

	/**
	 * Alias for {@link divide}
	 */
	export const div = divide

	export function abs(v: vec4): vec4 {
		return [Math.abs(v[0]), Math.abs(v[1]), Math.abs(v[2]), Math.abs(v[3])]
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
	 * Math.sign the components of a vec4
	 */
	export function sign(v: vec4): vec4 {
		return [Math.sign(v[0]), Math.sign(v[1]), Math.sign(v[2]), Math.sign(v[3])]
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

	/**
	 * Quantize a vec4 to a given step and offset. If the step is 0, the value is returned unchanged.
	 * @param v The value to quantize
	 * @param step The step size
	 * @param offset The offset
	 * @returns The quantized value
	 */
	export function quantize(
		v: vec4,
		step: vec4 | number,
		offset: vec4 | number = zero
	): vec4 {
		if (typeof step === 'number') step = [step, step, step, step]
		if (typeof offset === 'number') offset = [offset, offset, offset, offset]

		return [
			scalar.quantize(v[0], step[0], offset[0]),
			scalar.quantize(v[1], step[1], offset[1]),
			scalar.quantize(v[2], step[2], offset[2]),
			scalar.quantize(v[3], step[3], offset[3]),
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
	 *
	 * @shorthands
	 * - {@link avg}
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
	 * Alias for {@link distance}
	 */
	export const avg = average

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
		return Math.hypot(x, y, z, w)
	}

	/**
	 * Alias for {@link distance}
	 */
	export const dist = distance

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @shortands
	 * - {@link sqrDist}
	 */
	export function squaredDistance(a: vec4, b: vec4) {
		const x = b[0] - a[0]
		const y = b[1] - a[1]
		const z = b[2] - a[2]
		const w = b[3] - a[3]

		return x * x + y * y + z * z + w * w
	}

	/**
	 * Alias for {@link squaredDistance}
	 */
	export const sqrDist = squaredDistance

	/**
	 * Returns the absolute difference between corresponding components of two vec4's
	 *
	 * @shorthands
	 * - {@link diff}
	 */
	export function difference(a: vec4, b: vec4): vec4 {
		return [
			Math.abs(b[0] - a[0]),
			Math.abs(b[1] - a[1]),
			Math.abs(b[2] - a[2]),
			Math.abs(b[3] - a[3]),
		]
	}

	/**
	 * Alias for {@link vec4.difference}
	 * @category Shorthands
	 */
	export const diff = difference

	/**
	 * Calculates the length of a vec4n
	 *
	 * @shorthands
	 * - {@link len}
	 */
	export function length(a: vec4) {
		const [x, y, z, w] = a
		return Math.hypot(x, y, z, w)
	}

	/**
	 * Alias for {@link length}
	 */
	export const len = length

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @shorthands
	 * - {@link sqrLen}
	 */
	export function squaredLength(a: vec4) {
		const [x, y, z, w] = a
		return x * x + y * y + z * z + w * w
	}

	/**
	 * Alias for {@link squaredLength}
	 */
	export const sqrLen = squaredLength

	/**
	 * Negates the components of a vec4
	 * @shorthands
	 * - {@link neg}
	 */
	export function negate(a: vec4): vec4 {
		return [-a[0], -a[1], -a[2], -a[3]]
	}

	/**
	 * Alias for {@link negate}
	 */
	export const neg = negate

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @shorthands
	 * - {@link inv}
	 */
	export function invert(a: vec4): vec4 {
		return [1 / a[0], 1 / a[1], 1 / a[2], 1 / a[3]]
	}

	/**
	 * Alias for {@link invert}
	 * @category Shorthands
	 */
	export const inv = invert

	/**
	 * Returns the result of `v` subtracted from {@link one}.
	 */
	export function oneMinus(v: vec4): vec4 {
		return subtract(one, v)
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
		value: vec4,
		omin: vec4,
		omax: vec4,
		nmin: vec4,
		nmax: vec4
	): vec4 {
		return [
			scalar.fit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.fit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
			scalar.fit(value[2], omin[2], omax[2], nmin[2], nmax[2]),
			scalar.fit(value[3], omin[3], omax[3], nmin[3], nmax[3]),
		]
	}

	/**
	 * Takes the value in the range `(omin, omax)` and shifts it to the corresponding value in the new range `(nmin, nmax)`. Unlike `fit`, this function does not clamp values to the given range. If `omin` and `omax` are the same, the function returns the average of `nmin` and `nmax`.
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit.html
	 * @param value
	 * @param omin
	 * @param omax
	 * @param nmin
	 * @param nmax
	 * @returns
	 */
	export function efit(
		value: vec4,
		omin: vec4,
		omax: vec4,
		nmin: vec4,
		nmax: vec4
	): vec4 {
		return [
			scalar.efit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.efit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
			scalar.efit(value[2], omin[2], omax[2], nmin[2], nmax[2]),
			scalar.efit(value[3], omin[3], omax[3], nmin[3], nmax[3]),
		]
	}

	/**
	 * Normalize a vec4
	 */
	export function normalize(a: vec4): vec4 {
		const [x, y, z, w] = a
		const isZeroLength = x === 0 && y === 0 && z === 0 && w === 0
		const len = isZeroLength ? 0 : 1 / Math.hypot(x, y, z, w)
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
	 *
	 * @shorthands
	 * - {@link mix}
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
	 * Alias for {@link mix}
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 */
	export const mix = lerp

	/**
	 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
	 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
	 *
	 * @shorthands
	 * - {@link invlerp}
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
	 * Alias for {@link inverseSqrt}
	 * @category Shorthands
	 */
	export const invsqrt = inverseSqrt

	/**
	 * Alias for {@link inverseLerp}
	 */
	export const invlerp = inverseLerp

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

	/**
	 * Converts the components of a vec4 from radians to degrees
	 * @param rad The input vec4 in radians
	 * @returns The degrees equivalent of the input
	 *
	 * @shorthands
	 * - {@link deg}
	 */
	export function degrees(rad: vec4): vec4 {
		return [
			(rad[0] * 180) / Math.PI,
			(rad[1] * 180) / Math.PI,
			(rad[2] * 180) / Math.PI,
			(rad[3] * 180) / Math.PI,
		]
	}

	/**
	 * Alias for {@link degrees}
	 * @category Shorthands
	 */
	export const deg = degrees

	/**
	 * Converts the components of a vec2 from degrees to radians
	 * @param deg The input vec2 in degrees
	 * @returns The radians equivalent of the input
	 *
	 * @shorthands
	 * - {@link rad}
	 */
	export function radians(deg: vec4): vec4 {
		return [
			(deg[0] * Math.PI) / 180,
			(deg[1] * Math.PI) / 180,
			(deg[2] * Math.PI) / 180,
			(deg[3] * Math.PI) / 180,
		]
	}

	/**
	 * Alias for {@link radians}
	 * @category Shorthands
	 */
	export const rad = radians

	export function sin(deg: vec4): vec4 {
		return [
			Math.sin(deg[0] * Common.DEG2RAD),
			Math.sin(deg[1] * Common.DEG2RAD),
			Math.sin(deg[2] * Common.DEG2RAD),
			Math.sin(deg[3] * Common.DEG2RAD),
		]
	}

	export function cos(deg: vec4): vec4 {
		return [
			Math.cos(deg[0] * Common.DEG2RAD),
			Math.cos(deg[1] * Common.DEG2RAD),
			Math.cos(deg[2] * Common.DEG2RAD),
			Math.cos(deg[3] * Common.DEG2RAD),
		]
	}

	export function tan(deg: vec4): vec4 {
		return [
			Math.tan(deg[0] * Common.DEG2RAD),
			Math.tan(deg[1] * Common.DEG2RAD),
			Math.tan(deg[2] * Common.DEG2RAD),
			Math.tan(deg[3] * Common.DEG2RAD),
		]
	}

	export function asin(v: vec4): vec4 {
		return [
			Math.asin(v[0]) * Common.RAD2DEG,
			Math.asin(v[1]) * Common.RAD2DEG,
			Math.asin(v[2]) * Common.RAD2DEG,
			Math.asin(v[3]) * Common.RAD2DEG,
		]
	}

	export function acos(v: vec4): vec4 {
		return [
			Math.acos(v[0]) * Common.RAD2DEG,
			Math.acos(v[1]) * Common.RAD2DEG,
			Math.acos(v[2]) * Common.RAD2DEG,
			Math.acos(v[3]) * Common.RAD2DEG,
		]
	}

	/**
	 * Returns the arc-tangent of the parameters.  If `x` is not provided, `y` is regarded as a value of `y/x`.
	 * @param y the values of the y-coordinate
	 * @param x the values of the x-coordinate
	 * @returns the angle in degrees
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 * 	 */
	export function atan(y: vec4, x?: vec4): vec4 {
		if (x === undefined) {
			return [
				Math.atan(y[0]) * Common.RAD2DEG,
				Math.atan(y[1]) * Common.RAD2DEG,
				Math.atan(y[2]) * Common.RAD2DEG,
				Math.atan(y[3]) * Common.RAD2DEG,
			]
		} else {
			return [
				Math.atan2(y[0], x[0]) * Common.RAD2DEG,
				Math.atan2(y[1], x[1]) * Common.RAD2DEG,
				Math.atan2(y[2], x[2]) * Common.RAD2DEG,
				Math.atan2(y[3], x[3]) * Common.RAD2DEG,
			]
		}
	}
	/**
	 * Returns the arc-tangent of the parameters.
	 * @param y the values of the y-coordinate
	 * @param x the values of the x-coordinate
	 * @returns the angle in degrees
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 * 	 */
	export function atan2(y: vec4, x: vec4): vec4 {
		return [
			Math.atan2(y[0], x[0]) * Common.RAD2DEG,
			Math.atan2(y[1], x[1]) * Common.RAD2DEG,
			Math.atan2(y[2], x[2]) * Common.RAD2DEG,
			Math.atan2(y[3], x[3]) * Common.RAD2DEG,
		]
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
	 *
	 * @shorthands
	 * - {@link eq}
	 */
	export function exactEquals(a: vec4, b: vec4) {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
	}

	/**
	 * Alias for {@link exactEquals}
	 * @category Shorthands
	 */
	export const eq = exactEquals

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @shorthands
	 * - {@link approx}
	 * - {@link equals}
	 */
	export function approxEquals(a: vec4, b: vec4) {
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
	 * Alias for {@link approxEquals}
	 * @category Shorthands
	 */
	export const approx = approxEquals

	/**
	 * Alias for {@link approxEquals}. This is provided for compatibility with gl-matrix.
	 * @category Shorthands
	 * @deprecated Use {@link approxEquals} instead
	 */
	export const equals = approxEquals

	/**
	 * Returns the string representation of a vec4
	 * @param v vector to represent as a string
	 * @param fractionDigits number of digits to appear after the decimal point
	 */
	export const toString = Common.vecToString as (
		v: vec4,
		fractionDigits?: number
	) => string
}
