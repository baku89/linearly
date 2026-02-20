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
			return [-vs[0][0], -vs[0][1]]
		}

		const [first, ...rest] = vs

		let [x, y]: Mutable =
			typeof first === 'number' ? [first, first] : [...first]

		for (const v of rest) {
			x -= v[0]
			y -= v[1]
		}

		return [x, y]
	}

	/**
	 * Alias for {@link vec2.subtract}
	 * @category Shorthands
	 *
	 * @shorthands
	 * - {@link vec2.sub}
	 */
	export const sub = subtract

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

	/**
	 * Alias for {@link vec2.multiply}
	 * @category Shorthands
	 *
	 * @shorthands
	 * - {@link vec2.mul}
	 */
	export const mul = multiply

	export function divide(...vs: vec2[]): vec2 {
		if (vs.length === 0) {
			return one
		}

		if (vs.length === 1) {
			return [1 / vs[0][0], 1 / vs[0][1]]
		}

		const [first, ...rest] = vs

		let [x, y] = first

		for (const v of rest) {
			x /= v[0]
			y /= v[1]
		}

		return [x, y]
	}

	/**
	 * Alias for {@link vec2.divide}
	 * @category Shorthands
	 *
	 * @shorthands
	 * - {@link vec2.div}
	 */
	export const div = divide

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

	export function abs(v: vec2): vec2 {
		return [Math.abs(v[0]), Math.abs(v[1])]
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
	 * Math.sign the components of a vec2
	 */
	export function sign(v: vec2): vec2 {
		return [Math.sign(v[0]), Math.sign(v[1])]
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

	/**
	 * Quantize a vec2 to a given step and offset. If the step is 0, the value is returned unchanged.
	 * @param v The value to quantize
	 * @param step The step size
	 * @param offset The offset
	 * @returns The quantized value
	 */
	export function quantize(
		v: vec2,
		step: vec2 | number,
		offset: vec2 | number = zero
	): vec2 {
		if (typeof step === 'number') step = [step, step]
		if (typeof offset === 'number') offset = [offset, offset]

		return [
			scalar.quantize(v[0], step[0], offset[0]),
			scalar.quantize(v[1], step[1], offset[1]),
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
	 *
	 * @shorthands
	 * - {@link avg}
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
	 * Alias for {@link vec2.average}
	 * @category Shorthands
	 */
	export const avg = average

	/**
 Adds given vec2's after scaling the second operand by a scalar value
 */
	export function scaleAndAdd(a: vec2, b: vec2, scale: number): vec2 {
		return [a[0] + b[0] * scale, a[1] + b[1] * scale]
	}

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @shorthands
	 * - {@link dist}
	 */
	export function distance(a: vec2, b: vec2) {
		const x = b[0] - a[0],
			y = b[1] - a[1]
		return Math.hypot(x, y)
	}

	/**
	 * Alias for {@link vec2.distance}
	 * @category Shorthands
	 */
	export const dist = distance

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @shorthands
	 * - {@link sqrDist}
	 */
	export function squaredDistance(a: vec2, b: vec2) {
		const x = b[0] - a[0],
			y = b[1] - a[1]
		return x * x + y * y
	}

	/**
	 * Alias for {@link vec2.squaredEquals}
	 * @category Shorthands
	 */
	export const sqrDist = squaredDistance

	/**
	 * Returns the absolute difference between corresponding components of two vec2's
	 *
	 * @shorthands
	 * - {@link diff}
	 */
	export function difference(a: vec2, b: vec2): vec2 {
		return [Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])]
	}

	/**
	 * Alias for {@link vec2.difference}
	 * @category Shorthands
	 */
	export const diff = difference

	/**
	 * Calculates the length of a vec2
	 *
	 * @shorthands
	 * - {@link len}
	 */
	export function length(v: vec2) {
		return Math.hypot(v[0], v[1])
	}

	/**
	 * Alias for {@link vec2.length}
	 * @category Shorthands
	 */
	export const len = length

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @shorthands
	 * - {@link sqrLen}
	 */
	export function squaredLength(v: vec2) {
		return v[0] ** 2 + v[1] ** 2
	}

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @category Shorthands
	 */
	export const sqrLen = squaredLength

	/**
	 * Negates the components of a vec2
	 *
	 * @shorthands
	 * - {@link neg}
	 */
	export function negate(v: vec2): vec2 {
		return [-v[0], -v[1]]
	}

	/**
	 * Alias for {@link vec2.negate}
	 * @category Shorthands
	 */
	export const neg = negate

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @shorthands
	 * - {@link inv}
	 */
	export function invert(v: vec2): vec2 {
		return [1 / v[0], 1 / v[1]]
	}

	/**
	 * Alias for {@link vec2.invert}
	 * @category Shorthands
	 */
	export const inv = invert

	/**
	 * Returns the result of `v` subtracted from {@link vec2.one}.
	 */
	export function oneMinus(v: vec2): vec2 {
		return subtract(one, v)
	}

	export function normalize(v: vec2): vec2 {
		const isZeroLength = v[0] === 0 && v[1] === 0
		const len = isZeroLength ? 0 : 1 / Math.hypot(v[0], v[1])
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
	 * Reflects incident vector `I` about normal `N`. The normal `N` should be normalized.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/reflect.xhtml
	 * @param I Incident vector
	 * @param N Normal vector (should be normalized)
	 */
	export function reflect(I: vec2, N: vec2): vec2 {
		const d = 2 * dot(N, I)
		return [I[0] - d * N[0], I[1] - d * N[1]]
	}

	/**
	 * Projects vector `a` onto vector `b`.
	 * @param a The vector to project
	 * @param b The vector to project onto
	 */
	export function project(a: vec2, b: vec2): vec2 {
		const s = dot(a, b) / dot(b, b)
		return [b[0] * s, b[1] * s]
	}

	/**
	 * Computes the rejection of vector `a` from vector `b` (the component of `a` perpendicular to `b`).
	 * @param a The vector to reject
	 * @param b The vector to reject from
	 */
	export function reject(a: vec2, b: vec2): vec2 {
		const p = project(a, b)
		return [a[0] - p[0], a[1] - p[1]]
	}

	/**
	 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 *
	 * @shorthands
	 * - {@link mix}
	 */
	export function lerp(a: vec2, b: vec2, t: vec2 | number): vec2 {
		if (typeof t === 'number') t = [t, t]

		return [a[0] + t[0] * (b[0] - a[0]), a[1] + t[1] * (b[1] - a[1])]
	}

	/**
	 * Alias for {@link vec2.lerp}
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 * @category Shorthands
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
	export function inverseLerp(a: vec2, b: vec2, t: vec2): vec2 {
		return [
			a[0] === b[0] ? 0.5 : (t[0] - a[0]) / (b[0] - a[0]),
			a[1] === b[1] ? 0.5 : (t[1] - a[1]) / (b[1] - a[1]),
		]
	}

	/**
	 * Alias for {@link vec2.inverseLerp}
	 * @category Shorthands
	 */
	export const invlerp = inverseLerp

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
		return [
			scalar.fit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.fit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
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
		value: vec2,
		omin: vec2,
		omax: vec2,
		nmin: vec2,
		nmax: vec2
	): vec2 {
		return [
			scalar.efit(value[0], omin[0], omax[0], nmin[0], nmax[0]),
			scalar.efit(value[1], omin[1], omax[1], nmin[1], nmax[1]),
		]
	}

	export function transformMat2(a: vec2, m: mat2): vec2 {
		const [x, y] = a
		return [
			m[0] * x + m[2] * y, //
			m[1] * x + m[3] * y,
		]
	}

	export function transformMat2d(a: vec2, m: mat2d): vec2 {
		const [x, y] = a
		return [
			m[0] * x + m[2] * y + m[4], //
			m[1] * x + m[3] * y + m[5],
		]
	}

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 */
	export function transformMat3(a: vec2, m: mat3): vec2 {
		const [x, y] = a
		return [
			m[0] * x + m[3] * y + m[6], //
			m[1] * x + m[4] * y + m[7],
		]
	}

	/**
	 * Transforms a vec2 with a matrix, automatically choosing the appropriate transformation function based on matrix size
	 * @param p The vector to transform
	 * @param m The transformation matrix (mat2, mat2d, or mat3)
	 * @returns The transformed vector
	 *
	 * @shorthands
	 * - {@link xform}
	 */
	export function transform(p: vec2, m: mat2 | mat2d | mat3): vec2 {
		const matrixArray = m as readonly number[]
		switch (matrixArray.length) {
			case 4: // mat2
				return transformMat2(p, m as mat2)
			case 6: // mat2d
				return transformMat2d(p, m as mat2d)
			case 9: // mat3
				return transformMat3(p, m as mat3)
			default:
				throw new Error(`Unsupported matrix size: ${matrixArray.length}`)
		}
	}

	/**
	 * Alias for {@link vec2.transform}
	 * @category Shorthands
	 */
	export const xform = transform

	/**
	 * Rotate a 2D vector
	 */
	export function rotate(a: vec2, deg: number, origin: vec2 = zero): vec2 {
		// Translate point to the origin
		const p0 = a[0] - origin[0]
		const p1 = a[1] - origin[1]
		const s = Math.sin(deg * Common.DEG2RAD)
		const c = Math.cos(deg * Common.DEG2RAD)

		// Perform rotation and translate to correct position
		return [
			p0 * c - p1 * s + origin[0], //
			p0 * s + p1 * c + origin[1], //
		]
	}

	/**
	 * Rotates a vector by 90 degrees
	 * @param a the vector to rotate
	 * @param sweep If true, the rotation is in positive direction. For example, it means clockwise rotation in a Y-down coordinate system.
	 * @param origin The origin of the rotation
	 * @returns The rotated vector
	 
	 */
	export function rotate90(a: vec2, sweep = true, origin?: vec2): vec2 {
		if (!origin) {
			return sweep ? [-a[1], a[0]] : [a[1], -a[0]]
		} else {
			const [x, y] = subtract(a, origin)
			return sweep ? add(origin, [-y, x]) : add(origin, [y, -x])
		}
	}

	/**
	 * Get the angle between two 2D vectors. If the second argument is omitted, it returns a signed angle relative to x axis.
	 * @param a The first vector
	 * @param b The second vector
	 * @returns The angle in degrees. If the angle from a to b is clockwise, the return value is positive. Otherwise, it is negative. The range is (-180, 180].
	 */
	export function angle(a: vec2, b?: vec2) {
		if (!b) return Math.atan2(a[1], a[0]) * Common.RAD2DEG

		if (eq(a, b)) {
			// Exactly the same vectors
			return 0
		}

		const [x1, y1] = a
		const [x2, y2] = b

		// mag is the product of the magnitudes of a and b
		const mag = Math.hypot(x1, y1) * Math.hypot(x2, y2)

		if (mag === 0) {
			// One of the vectors is zero
			return 0
		}

		const sign = x1 * y2 - y1 * x2 >= 0 ? 1 : -1

		const acos = Math.acos(scalar.clamp(dot(a, b) / mag, -1, 1))
		const angle = sign * acos * Common.RAD2DEG

		return angle <= -180 ? angle + 360 : angle
	}

	/**
	 * Creates a vector by given direction, length, and origin
	 * @param deg The direction in degrees
	 * @param length The length of the vector to create. Default is 1
	 * @param origin The origin of the vector. Default is [0, 0]
	 *
	 * @shorthands
	 * - {@link dir}
	 */
	export function direction(deg: number, length = 1, origin = vec2.zero): vec2 {
		return [
			Math.cos(deg * Common.DEG2RAD) * length + origin[0],
			Math.sin(deg * Common.DEG2RAD) * length + origin[1],
		]
	}

	/**
	 * Alias for {@link vec2.direction}
	 * @category Shorthands
	 */
	export const dir = direction

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
		const t1 = scalar.clamp((x[1] - edge0[1]) / (edge1[1] - edge0[1]), 0, 1)

		return [
			t0 * t0 * (3 - 2 * t0), //
			t1 * t1 * (3 - 2 * t1),
		]
	}

	/**
	 * Converts the components of a vec2 from radians to degrees
	 * @param rad The input vec2 in radians
	 * @returns The degrees equivalent of the input
	 *
	 * @shorthands
	 * - {@link deg}
	 */
	export function degrees(rad: vec2): vec2 {
		return [
			rad[0] * Common.RAD2DEG, //
			rad[1] * Common.RAD2DEG,
		]
	}

	/**
	 * Alias for {@link vec2.degrees}
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
	export function radians(deg: vec2): vec2 {
		return [
			deg[0] * Common.DEG2RAD, //
			deg[1] * Common.DEG2RAD,
		]
	}

	/**
	 * Alias for {@link vec2.radians}
	 * @category Shorthands
	 */
	export const rad = radians

	/**
	 * Returns the sine of a number.
	 * @param deg A angle in degrees
	 * 	 */
	export function sin(deg: vec2): vec2 {
		return [
			Math.sin(deg[0] * Common.DEG2RAD), //
			Math.sin(deg[1] * Common.DEG2RAD),
		]
	}

	/**
	 * Returns the cosine of a number.
	 * @param deg A angle in degrees
	 * 	 */
	export function cos(deg: vec2): vec2 {
		return [
			Math.cos(deg[0] * Common.DEG2RAD), //
			Math.cos(deg[1] * Common.DEG2RAD),
		]
	}

	/**
	 * Returns the tangent of a number.
	 * @param deg A angle in degrees
	 * 	 */
	export function tan(deg: vec2): vec2 {
		return [
			Math.tan(deg[0] * Common.DEG2RAD), //
			Math.tan(deg[1] * Common.DEG2RAD),
		]
	}

	/**
	 * Returns the arcsine of a number.
	 * @param v A numeric expression.
	 * @returns The arcsine in degrees
	 * 	 */
	export function asin(v: vec2): vec2 {
		return [
			Math.asin(v[0]) * Common.RAD2DEG, //
			Math.asin(v[1]) * Common.RAD2DEG,
		]
	}

	/**
	 * Returns the arc cosine (or inverse cosine) of a number.
	 * @param v A numeric expression.
	 * @returns The arc cosine in degrees
	 * 	 */
	export function acos(v: vec2): vec2 {
		return [
			Math.acos(v[0]) * Common.RAD2DEG, //
			Math.acos(v[1]) * Common.RAD2DEG,
		]
	}

	/**
	 * Returns the arc-tangent of the parameters.  If `x` is not provided, `y` is regarded as a value of `y/x`.
	 * @param y the values of the y-coordinate
	 * @param x the values of the x-coordinate
	 * @returns the angle in degrees
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 * 	 */
	export function atan(y: vec2, x?: vec2): vec2 {
		if (x === undefined) {
			return [
				Math.atan(y[0]) * Common.RAD2DEG, //
				Math.atan(y[1]) * Common.RAD2DEG,
			]
		} else {
			return [
				Math.atan2(y[0], x[0]) * Common.RAD2DEG, //
				Math.atan2(y[1], x[1]) * Common.RAD2DEG,
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
	export function atan2(y: vec2, x: vec2): vec2 {
		return [
			Math.atan2(y[0], x[0]) * Common.RAD2DEG, //
			Math.atan2(y[1], x[1]) * Common.RAD2DEG,
		]
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
	 *
	 * @shorthands
	 * - {@link invsqrt}
	 */
	export function inverseSqrt(v: vec2): vec2 {
		return [1 / Math.sqrt(v[0]), 1 / Math.sqrt(v[1])]
	}

	/**
	 * Alias for {@link vec2.inverseSqrt}
	 * @category Shorthands
	 */
	export const invsqrt = inverseSqrt

	/**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with `===`)
	 *
	 * @shorthands
	 * - {@link eq}
	 */
	export function exactEquals(a: vec2, b: vec2) {
		return a[0] === b[0] && a[1] === b[1]
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
	export function approxEquals(a: vec2, b: vec2) {
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
	 * Returns the string representation of a vec2
	 * @param v vector to represent as a string
	 * @param fractionDigits number of digits to appear after the decimal point
	 */
	export const toString = Common.vecToString as (
		v: vec2,
		fractionDigits?: number
	) => string
}
