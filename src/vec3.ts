import * as Common from './common'
import {mat3} from './mat3'
import {mat4} from './mat4'
import {quat} from './quat'
import {scalar} from './scalar'

/**
 * Represents 3D vector
 * @category Types
 */
export type vec3 = readonly [x: number, y: number, z: number]

/**
 * Functions for {@link vec3}, a 3D vector.
 */
export namespace vec3 {
	/**
	 * Mutable version of {@link vec3}
	 * @category Types
	 */
	export type Mutable = [x: number, y: number, z: number]

	/**
	 * Creates a new vector from given elements
	 * @category Generators
	 */
	export function of(x: number, y?: number, z?: number): vec3 {
		if (y === undefined && z === undefined) {
			y = z = x
		}
		if (y === undefined) y = 0
		if (z === undefined) z = 0

		return [x, y, z]
	}

	/**
	 * Creates a mutable clone of given vec3
	 * @category Generators
	 */
	export function clone(a: vec3): Mutable {
		return [...a]
	}

	/**
	 * @category Constants
	 */
	export const zero: vec3 = Object.freeze([0, 0, 0])

	/**
	 * @category Constants
	 */
	export const one: vec3 = Object.freeze([1, 1, 1])

	/**
	 * An unit vector pointing towards positive X. Same as `[1, 0, 0]`
	 * @category Constants
	 */
	export const unitX: vec3 = Object.freeze([1, 0, 0])

	/**
	 * An unit vector pointing towards positive Y. Same as `[0, 1, 0]`
	 * @category Constants
	 */
	export const unitY: vec3 = Object.freeze([0, 1, 0])

	/**
	 * An unit vector pointing towards positive Z. Same as `[0, 0, 1]`
	 * @category Constants
	 */
	export const unitZ: vec3 = Object.freeze([0, 0, 1])

	/**
	 * Adds given vec3's
	 */
	export function add(...vs: vec3[]): vec3 {
		let x = 0,
			y = 0,
			z = 0

		for (const v of vs) {
			x += v[0]
			y += v[1]
			z += v[2]
		}

		return [x, y, z]
	}

	/**
	 * Subtracts given vec3's. When the argument is a single vector, it negates it. Otherwise, it subtracts from left to right.
	 */
	export function subtract(...vs: vec3[]): vec3 {
		if (vs.length === 0) {
			return zero
		}

		if (vs.length === 1) {
			return [-vs[0], -vs[1], -vs[2]]
		}

		const [first, ...rest] = vs

		const ret: Mutable = [...first]

		for (const v of rest) {
			ret[0] -= v[0]
			ret[1] -= v[1]
			ret[2] -= v[2]
		}

		return ret
	}

	/**
	 * Subtracts b from a
	 */
	export function delta(a: vec3, b: vec3): vec3 {
		return [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
	}

	/**
	 * Multiplies given vec3's
	 */
	export function multiply(...vs: vec3[]): vec3 {
		let x = 1,
			y = 1,
			z = 1

		for (const v of vs) {
			x *= v[0]
			y *= v[1]
			z *= v[2]
		}

		return [x, y, z]
	}

	/**
	 * Divides given vec3's
	 */
	export function divide(...vs: vec3[]): vec3 {
		if (vs.length === 0) {
			return one
		} else if (vs.length === 1) {
			return divide(one, vs[0])
		} else if (vs.length > 2) {
			const [a, b, ...rest] = vs
			return divide(divide(a, b), ...rest)
		}

		const [a, b] = vs

		return [a[0] / b[0], a[1] / b[1], a[2] / b[2]]
	}

	/**
	 * Math.ceil the components of a vec3
	 */
	export function ceil(a: vec3): vec3 {
		return [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2])]
	}

	/**
	 * Math.floor the components of a vec3
	 */
	export function floor(a: vec3): vec3 {
		return [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2])]
	}

	/**
	 * Removes the fractional part
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/trunc.html
	 */
	export function trunc(v: vec3): vec3 {
		return [
			v[0] < 0 ? Math.ceil(v[0]) : Math.floor(v[0]),
			v[1] < 0 ? Math.ceil(v[1]) : Math.floor(v[1]),
			v[2] < 0 ? Math.ceil(v[2]) : Math.floor(v[2]),
		]
	}

	/**
	 * Computes the fractional part of the argument
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
	 */
	export function fract(a: vec3): vec3 {
		return sub(a, floor(a))
	}

	/**
	 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
	 * @see https://thebookofshaders.com/glossary/?search=mod
	 */
	export function mod(a: vec3, b: vec3 | number): vec3 {
		if (typeof b === 'number') b = [b, b, b]

		return [
			a[0] - b[0] * Math.floor(a[0] / b[0]),
			a[1] - b[1] * Math.floor(a[1] / b[1]),
			a[2] - b[2] * Math.floor(a[2] / b[2]),
		]
	}

	export function quantize(
		v: vec3,
		step: vec3 | number,
		offset: vec3 | number = zero
	): vec3 {
		if (typeof step === 'number') step = [step, step, step]
		if (typeof offset === 'number') offset = [offset, offset, offset]

		return [
			Math.round((v[0] - offset[0]) / step[0]) * step[0] + offset[0],
			Math.round((v[1] - offset[1]) / step[1]) * step[1] + offset[1],
			Math.round((v[2] - offset[2]) / step[2]) * step[2] + offset[2],
		]
	}

	/**
	 * Returns the minimum of givenvec3's
	 */
	export function min(...vs: vec3[]): vec3 {
		if (vs.length === 0) {
			return [Infinity, Infinity, Infinity]
		} else if (vs.length === 1) {
			return vs[0]
		} else if (vs.length > 2) {
			const [a, b, ...rest] = vs
			return min(min(a, b), ...rest)
		}

		const [a, b] = vs

		return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])]
	}

	/**
	 * Returns the maximum of givenvec3's
	 */
	export function max(...vs: vec3[]): vec3 {
		if (vs.length === 0) {
			return [-Infinity, -Infinity, -Infinity]
		} else if (vs.length === 1) {
			return vs[0]
		} else if (vs.length > 2) {
			const [a, b, ...rest] = vs
			return max(max(a, b), ...rest)
		}

		const [a, b] = vs

		return [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])]
	}

	/**
	 * Constrain a value to lie between two further values
	 * @see https://thebookofshaders.com/glossary/?search=clamp
	 * @param v the value to constrain
	 * @param min the lower end of the range into which to constrain `v`
	 * @param max the upper end of the range into which to constrain `v`
	 */
	export function clamp(v: vec3, min: vec3 | number, max: vec3 | number): vec3 {
		if (typeof min === 'number') min = [min, min, min]
		if (typeof max === 'number') max = [max, max, max]

		return [
			Math.min(Math.max(v[0], min[0]), max[0]),
			Math.min(Math.max(v[1], min[1]), max[1]),
			Math.min(Math.max(v[2], min[2]), max[2]),
		]
	}

	/**
	 * symmetric round the components of a vec3
	 */
	export function round(a: vec3): vec3 {
		return [Common.round(a[0]), Common.round(a[1]), Common.round(a[2])]
	}
	/**
	 * Scales a vec3 by a scalar number
	 */
	export function scale(a: vec3, s: number): vec3 {
		return [a[0] * s, a[1] * s, a[2] * s]
	}

	/**
	 * Returns the average value of the input(s)
	 * @see  https://www.sidefx.com/docs/houdini/vex/functions/avg.html
	 */
	export function average(...vs: vec3[]): vec3 {
		let x = 0,
			y = 0,
			z = 0
		const len = vs.length || 1
		for (const v of vs) {
			x += v[0]
			y += v[1]
			z += v[2]
		}
		return [x / len, y / len, z / len]
	}

	/**
 Adds given vec3's after scaling the second operand by a scalar value
 */
	export function scaleAndAdd(a: vec3, b: vec3, scale: number): vec3 {
		return [a[0] + b[0] * scale, a[1] + b[1] * scale, a[2] + b[2] * scale]
	}

	/**
	 * Calculates the euclidian distance between two vec3's
	 */
	export function distance(a: vec3, b: vec3) {
		const x = b[0] - a[0]
		const y = b[1] - a[1]
		const z = b[2] - a[2]
		return Math.hypot(x, y, z)
	}

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 */
	export function squaredDistance(a: vec3, b: vec3) {
		const x = b[0] - a[0]
		const y = b[1] - a[1]
		const z = b[2] - a[2]
		return x * x + y * y + z * z
	}

	/**
	 * Calculates the length of a vec3
	 */
	export function length(a: vec3) {
		const [x, y, z] = a
		return Math.hypot(x, y, z)
	}

	/**
	 * Calculates the squared length of a vec3
	 */
	export function squaredLength(a: vec3) {
		const x = a[0]
		const y = a[1]
		const z = a[2]
		return x * x + y * y + z * z
	}

	/**
	 * Negates the components of a vec3
	 */
	export function negate(a: vec3): vec3 {
		return [-a[0], -a[1], -a[2]]
	}

	/**
	 * Returns the inverse of the components of a vec3
	 */
	export function invert(a: vec3): vec3 {
		return [1 / a[0], 1 / a[1], 1 / a[2]]
	}

	/**
	 * Returns the result of `v` subtracted from {@link vec3.one}.
	 */
	export function oneMinus(v: vec3): vec3 {
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
		value: vec3,
		omin: vec3,
		omax: vec3,
		nmin: vec3,
		nmax: vec3
	): vec3 {
		return [
			scalar.fit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.fit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
			scalar.fit(value[2], omin[2], omax[2], nmin[2], nmax[2]),
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
		value: vec3,
		omin: vec3,
		omax: vec3,
		nmin: vec3,
		nmax: vec3
	): vec3 {
		return [
			scalar.efit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.efit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
			scalar.efit(value[2], omin[2], omax[2], nmin[2], nmax[2]),
		]
	}

	/**
	 * Normalize a vec3
	 */
	export function normalize(a: vec3): vec3 {
		const [x, y, z] = a
		const isZeroLength = x === 0 && y === 0 && z === 0
		const len = isZeroLength ? 0 : 1 / Math.hypot(x, y, z)
		return [a[0] * len, a[1] * len, a[2] * len]
	}

	/**
	 * Calculates the dot product of two vec3's
	 */
	export function dot(a: vec3, b: vec3) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
	}

	/**
	 * Computes the cross product of two vec3's
	 */
	export function cross(a: vec3, b: vec3): vec3 {
		const [ax, ay, az] = a
		const [bx, by, bz] = b

		return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]
	}

	/**
	 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 */
	export function lerp(a: vec3, b: vec3, t: vec3 | number): vec3 {
		if (typeof t === 'number') t = [t, t, t]

		return [
			a[0] + t[0] * (b[0] - a[0]),
			a[1] + t[1] * (b[1] - a[1]),
			a[2] + t[2] * (b[2] - a[2]),
		]
	}

	/**
	 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
	 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
	 */
	export function inverseLerp(a: vec3, b: vec3, t: vec3): vec3 {
		return [
			a[0] === b[0] ? 0.5 : (t[0] - a[0]) / (b[0] - a[0]),
			a[1] === b[1] ? 0.5 : (t[1] - a[1]) / (b[1] - a[1]),
			a[2] === b[2] ? 0.5 : (t[2] - a[2]) / (b[2] - a[2]),
		]
	}

	/**
	 * Performs a spherical linear interpolation between two vec3's
	 */
	export function slerp(a: vec3, b: vec3, t: number): vec3 {
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
	export function hermite(a: vec3, b: vec3, c: vec3, d: vec3, t: number): vec3 {
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
	export function bezier(a: vec3, b: vec3, c: vec3, d: vec3, t: number): vec3 {
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
	export function transformMat4(a: vec3, m: mat4): vec3 {
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
	export function transformMat3(a: vec3, m: mat3): vec3 {
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
	export function transformQuat(a: vec3, q: quat): vec3 {
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
	 * @param v The vec3 point to rotate
	 * @param origin The origin of the rotation
	 * @param deg The angle of rotation in degrees
	 */
	export function rotateX(v: vec3, origin: vec3, deg: number): vec3 {
		//Translate point to the origin
		const py = v[1] - origin[1]
		const pz = v[2] - origin[2]
		const rad = deg * Common.DEG2RAD
		const s = Math.sin(rad)
		const c = Math.cos(rad)

		//translate to correct position
		return [
			v[0], //
			origin[1] + py * c - pz * s,
			origin[2] + py * s + pz * c,
		]
	}

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param v The vec3 point to rotate
	 * @param origin The origin of the rotation
	 * @param deg The angle of rotation in degrees
	 */
	export function rotateY(v: vec3, origin: vec3, deg: number): vec3 {
		//Translate point to the origin
		const px = v[0] - origin[0]
		const pz = v[2] - origin[2]
		const rad = deg * Common.DEG2RAD
		const s = Math.sin(rad)
		const c = Math.cos(rad)

		// Perform rotation then translate to correct position
		return [
			origin[0] + pz * s + px * c, //
			v[1], //
			origin[2] + pz * c - px * s,
		]
	}

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param v The vec3 point to rotate
	 * @param origin The origin of the rotation
	 * @param deg The angle of rotation in degrees
	 */
	export function rotateZ(v: vec3, origin: vec3, deg: number): vec3 {
		//Translate point to the origin
		const px = v[0] - origin[0]
		const py = v[1] - origin[1]
		const rad = deg * Common.DEG2RAD
		const s = Math.sin(rad)
		const c = Math.cos(rad)

		//translate to correct position
		return [
			origin[0] + px * c - py * s, //
			origin[1] + px * s + py * c,
			v[2],
		]
	}

	/**
	 * Get the angle between two 3D vectors
	 * @param a The first operand
	 * @param b The second operand
	 * @returns The angle in degrees
	 */
	export function angle(a: vec3, b: vec3) {
		const [ax, ay, az] = a
		const [bx, by, bz] = b
		const mag = Math.hypot(ax, ay, az) * Math.hypot(bx, by, bz)
		const cosine = mag && dot(a, b) / mag

		return Math.acos(Math.min(Math.max(cosine, -1), 1)) * Common.RAD2DEG
	}

	/**
	 * Apply a step function by comparing two values
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
	 * @param edge The location of the edge of the step function.
	 * @param x The value to be used to generate the step function.
	 * @returns
	 */
	export function step(edge: vec3 | number, v: vec3): vec3 {
		if (typeof edge === 'number') edge = [edge, edge, edge]

		return [
			v[0] < edge[0] ? 0 : 1,
			v[1] < edge[1] ? 0 : 1,
			v[2] < edge[2] ? 0 : 1,
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
	export function smoothstep(edge0: vec3, edge1: vec3, x: vec3): vec3 {
		const t0 = scalar.clamp((x[0] - edge0[0]) / (edge1[0] - edge0[0]), 0, 1)
		const t1 = scalar.clamp((x[1] - edge1[1]) / (edge1[1] - edge1[1]), 0, 1)
		const t2 = scalar.clamp((x[2] - edge1[2]) / (edge1[2] - edge1[2]), 0, 1)

		return [
			t0 * t0 * (3 - 2 * t0),
			t1 * t1 * (3 - 2 * t1),
			t2 * t2 * (3 - 2 * t2),
		]
	}

	export function degrees(rad: vec3): vec3 {
		return [
			rad[0] * Common.RAD2DEG,
			rad[1] * Common.RAD2DEG,
			rad[2] * Common.RAD2DEG,
		]
	}

	export function radians(deg: vec3): vec3 {
		return [
			deg[0] * Common.RAD2DEG,
			deg[1] * Common.RAD2DEG,
			deg[2] * Common.RAD2DEG,
		]
	}

	export function sin(deg: vec3): vec3 {
		return [
			Math.sin(deg[0] * Common.DEG2RAD),
			Math.sin(deg[1] * Common.DEG2RAD),
			Math.sin(deg[2] * Common.DEG2RAD),
		]
	}

	export function cos(deg: vec3): vec3 {
		return [
			Math.cos(deg[0] * Common.DEG2RAD),
			Math.cos(deg[1] * Common.DEG2RAD),
			Math.cos(deg[2] * Common.DEG2RAD),
		]
	}

	export function tan(deg: vec3): vec3 {
		return [
			Math.tan(deg[0] * Common.DEG2RAD),
			Math.tan(deg[1] * Common.DEG2RAD),
			Math.tan(deg[2] * Common.DEG2RAD),
		]
	}

	export function asin(v: vec3): vec3 {
		return [
			Math.asin(v[0]) * Common.RAD2DEG,
			Math.asin(v[1]) * Common.RAD2DEG,
			Math.asin(v[2]) * Common.RAD2DEG,
		]
	}

	export function acos(v: vec3): vec3 {
		return [
			Math.acos(v[0]) * Common.RAD2DEG,
			Math.acos(v[1]) * Common.RAD2DEG,
			Math.acos(v[2]) * Common.RAD2DEG,
		]
	}

	/**
	 * Returns the arc-tangent of the parameters.  If `x` is not provided, `y` is regarded as a value of `y/x`.
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 */
	export function atan(y: vec3, x?: vec3): vec3 {
		if (x === undefined) {
			return [
				Math.atan(y[0]) * Common.RAD2DEG,
				Math.atan(y[1]) * Common.RAD2DEG,
				Math.atan(y[2]) * Common.RAD2DEG,
			]
		} else {
			return [
				Math.atan2(y[0], x[0]) * Common.RAD2DEG,
				Math.atan2(y[1], x[1]) * Common.RAD2DEG,
				Math.atan2(y[2], x[2]) * Common.RAD2DEG,
			]
		}
	}

	export function pow(a: vec3, b: vec3): vec3 {
		return [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2])]
	}

	export function exp(v: vec3): vec3 {
		return [Math.exp(v[0]), Math.exp(v[1]), Math.exp(v[2])]
	}

	export function log(v: vec3): vec3 {
		return [Math.log(v[0]), Math.log(v[1]), Math.log(v[2])]
	}

	/**
	 * Returns 2 raised to the power of the parameter
	 * @param v the value of the powe to which 2 will be raised
	 */
	export function exp2(v: vec3): vec3 {
		return [2 ** v[0], 2 ** v[1], 2 ** v[2]]
	}

	export function log2(v: vec3): vec3 {
		return [Math.log2(v[0]), Math.log2(v[1]), Math.log2(v[2])]
	}

	export function sqrt(v: vec3): vec3 {
		return [Math.sqrt(v[0]), Math.sqrt(v[1]), Math.sqrt(v[2])]
	}

	/**
	 * Returns the inverse of the square root of the parameter
	 * @param v the value of which to take the inverse of the square root
	 * @see https://thebookofshaders.com/glossary/?search=inversesqrt
	 */
	export function inverseSqrt(v: vec3): vec3 {
		return [1 / Math.sqrt(v[0]), 1 / Math.sqrt(v[1]), 1 / Math.sqrt(v[2])]
	}

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with `===`)
	 */
	export function exactEquals(a: vec3, b: vec3) {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
	}

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 */
	export function equals(a: vec3, b: vec3) {
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

	/**
	 * Returns the string representation of a vec3
	 * @param v vector to represent as a string
	 * @param fractionDigits number of digits to appear after the decimal point
	 */
	export const toString = Common.vecToString as (
		v: vec3,
		fractionDigits?: number
	) => string

	/**
	 * Alias for {@link vec3.subtract}
	 * @category Shorthands
	 */
	export const sub = subtract

	/**
	 * Alias for {@link vec3.multiply}
	 * @category Shorthands
	 */
	export const mul = multiply

	/**
	 * Alias for {@link vec3.divide}
	 * @category Shorthands
	 */
	export const div = divide

	/**
	 * Alias for {@link vec3.average}
	 * @category Shorthands
	 */
	export const avg = average

	/**
	 * Alias for {@link vec3.distance}
	 * @category Shorthands
	 */
	export const dist = distance

	/**
	 * Alias for {@link vec3.length}
	 * @category Shorthands
	 */
	export const len = length

	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @category Shorthands
	 */
	export const sqrDist = squaredDistance

	/**
	 * Alias for {@link vec3.squaredLength}
	 * @category Shorthands
	 */
	export const sqrLen = squaredLength

	/**
	 * Alias for {@link vec3.negate}
	 */
	export const neg = negate

	/**
	 * Alias for {@link vec3.invert}
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 * @category Shorthands
	 */
	export const mix = lerp

	/**
	 * Alias for {@link vec3.transformMat4}
	 * @category Shorthands
	 */
	export const invlerp = inverseLerp

	/**
	 * Alias for {@link vec3.radians}
	 * @category Shorthands
	 */
	export const rad = radians

	/**
	 * Alias for {@link vec3.degrees}
	 * @category Shorthands
	 */
	export const deg = degrees

	/**
	 * Alias for {@link vec3.inverseSqrt}
	 * @category Shorthands
	 */
	export const invsqrt = inverseSqrt

	/**
	 * Alias for {@link vec3.invert}
	 * @category Shorthands
	 */
	export const inv = invert

	/**
	 * Alias for {@link vec3.transformQuat}
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/qrotate.html
	 * @category Shorthands
	 */
	export const qrotate = transformQuat
}
