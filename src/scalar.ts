import * as Common from './common'

/**
 * Functions for working with scalar values
 */
export namespace scalar {
	/**
	 * Adds the given values
	 */
	export function add(...vs: number[]): number {
		return vs.reduce((a, b) => a + b, 0)
	}

	/**
	 * Subtracts the given values. When the argument is a single value, it negates it. Otherwise, it subtracts from left to right.
	 *
	 * @shorthands
	 * - {@link sub}
	 */
	export function subtract(...vs: number[]): number {
		if (vs.length === 0) {
			return 0
		} else if (vs.length === 1) {
			return -vs[0]
		}
		return vs.reduce((a, b) => a - b)
	}

	/**
	 * Alias for {@link subtract}
	 * @category Shorthands
	 */
	export const sub = subtract

	/**
	 * Subtracts a from b
	 */
	export function delta(a: number, b: number): number {
		return b - a
	}

	/**
	 * Multiplies the given values
	 *
	 * @shorthands
	 * - {@link mul}
	 */
	export function multiply(...vs: number[]): number {
		return vs.reduce((a, b) => a * b, 1)
	}

	/**
	 * Alias for {@link multiply}
	 * @category Shorthands
	 */
	export const mul = multiply

	/**
	 * Divides the given values. When the argument is a single value, it returns its reciprocal. Otherwise, it divides from left to right.
	 *
	 * @shorthands
	 * - {@link div}
	 */
	export function divide(...vs: number[]): number {
		if (vs.length === 0) {
			return 1
		} else if (vs.length === 1) {
			return 1 / vs[0]
		}
		return vs.reduce((a, b) => a / b)
	}

	/**
	 * Alias for {@link divide}
	 * @category Shorthands
	 */
	export const div = divide

	/**
	 * Symmetric round the given number
	 */
	export const round = Common.round

	/**
	 * Returns the smallest integer greater than or equal to the input
	 */
	export const ceil = Math.ceil

	/**
	 * Returns the largest integer less than or equal to the input
	 */
	export const floor = Math.floor

	/**
	 * Returns the sign of the input (-1, 0, or 1)
	 */
	export const sign = Math.sign

	/**
	 * Returns the absolute value of the input
	 */
	export const abs = Math.abs

	/**
	 * Removes the fractional part
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/trunc.html
	 */
	export function trunc(v: number): number {
		return v < 0 ? Math.ceil(v) : Math.floor(v)
	}

	/**
	 * Computes the fractional part of the argument
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
	 */
	export function fract(v: number): number {
		return v - floor(v)
	}

	/**
	 * Computes the value of one parameter modulo another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
	 * @see https://thebookofshaders.com/glossary/?search=mod
	 */
	export function mod(a: number, b: number): number {
		return a - b * floor(a / b)
	}

	/**
	 * Quantize a value to a given step and offset. If the step is 0, the value is returned unchanged.
	 * @param v The value to quantize
	 * @param step The step size
	 * @param offset The offset
	 * @returns The quantized value
	 */
	export function quantize(v: number, step: number, offset = 0): number {
		if (step === 0) return v
		return Math.round((v - offset) / step) * step + offset
	}

	/**
	 * Returns the minimum of the given values
	 */
	export const min = Math.min

	/**
	 * Returns the maximum of the given values
	 */
	export const max = Math.max

	/**
	 * Constrain a value to lie between two further values
	 * @see https://thebookofshaders.com/glossary/?search=clamp
	 * @param v the value to constrain
	 * @param min the lower end of the range into which to constrain `s`
	 * @param max the upper end of the range into which to constrain `s`
	 */
	export function clamp(v: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, v))
	}

	/**
	 * Multiplies two values
	 */
	export function scale(a: number, b: number): number {
		return a * b
	}

	/**
	 * Returns the average value of the input(s)
	 * @see  https://www.sidefx.com/docs/houdini/vex/functions/avg.html
	 *
	 * @shorthands
	 * - {@link avg}
	 */
	export function average(...vs: number[]): number {
		let x = 0
		const scale = 1 / (vs.length || 1)
		for (const v of vs) {
			x += v
		}
		return x / scale
	}

	/**
	 * Alias for {@link average}
	 * @category Shorthands
	 */
	export const avg = average

	/**
	 * Adds two values after scaling the second operand by a scalar value
	 */
	export function scaleAndAdd(a: number, b: number, s: number): number {
		return a + b * s
	}

	/**
	 * Calculates the distance between two values
	 *
	 * @shorthands
	 * - {@link dist}
	 */
	export function distance(a: number, b: number): number {
		return Math.abs(a - b)
	}

	/**
	 * Alias for {@link distance}
	 * @category Shorthands
	 */
	export const dist = distance

	/**
	 * Returns the absolute difference between two numbers
	 *
	 * @shorthands
	 * - {@link diff}
	 */
	export function difference(a: number, b: number): number {
		return Math.abs(b - a)
	}

	/**
	 * Alias for {@link difference}
	 * @category Shorthands
	 */
	export const diff = difference

	/**
	 * Returns the squared difference between two numbers
	 *
	 * @shorthands
	 * - {@link sqrDist}
	 */
	export function squaredDistance(a: number, b: number): number {
		return (a - b) ** 2
	}

	/**
	 * Alias for {@link squaredDistance}
	 * @category Shorthands
	 */
	export const sqrDist = squaredDistance

	/**
	 * Returns the absolute difference between two numbers
	 *
	 * @shorthands
	 * - {@link len}
	 */
	export const length = Math.abs

	/**
	 * Alias for {@link length}
	 * @category Shorthands
	 */
	export const len = length

	/**
	 * Returns the squared value of the input
	 *
	 * @shorthands
	 * - {@link sqrLen}
	 */
	export function squaredLength(a: number): number {
		return a ** 2
	}

	/**
	 * Alias for {@link squaredLength}
	 * @category Shorthands
	 */
	export const sqrLen = squaredLength

	/**
	 * Negates a value
	 */
	export function negate(a: number): number {
		return -a
	}

	/**
	 * Returns the reciprocal of a value (1/a)
	 */
	export function invert(a: number): number {
		return 1 / a
	}

	/**
	 * Returns the result of `1 - a`.
	 */
	export function oneMinus(a: number): number {
		return 1 - a
	}

	/**
	 * Normalizes a value to -1, 0, or 1. Equivalent to `Math.sign`.
	 */
	export const normalize = Math.sign

	/**
	 * Linearly interpolates between two values. Same as GLSL's built-in `mix` function.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
	 *
	 * @shorthands
	 * - {@link mix}
	 */
	export function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t
	}

	/**
	 * Alias for {@link lerp}
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
	export function inverseLerp(a: number, b: number, t: number): number {
		if (a === b) return 0.5
		return (t - a) / (b - a)
	}

	/**
	 * Alias for {@link inverseLerp}
	 * @category Shorthands
	 */
	export const invlerp = inverseLerp

	/**
	 * Takes the value in the range `(omin, omax)` and shifts it to the corresponding value in the new range `(nmin, nmax)`. The function clamps the given value the range `(omin, omax)` before fitting, so the resulting value will be guaranteed to be in the range `(nmin, nmax)`. To avoid clamping use {@link efit} instead. If `omin` and `omax` are the same, the function returns the average of `nmin` and `nmax`.
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit.html
	 * @param value
	 * @param omin
	 * @param omax
	 * @param nmin
	 * @param nmax
	 * @returns
	 */
	export function fit(
		value: number,
		omin: number,
		omax: number,
		nmin: number,
		nmax: number
	) {
		if (omax === omin) {
			return lerp(nmin, nmax, 0.5)
		}

		const t = clamp((value - omin) / (omax - omin), 0, 1)
		return lerp(nmin, nmax, t)
	}

	/**
	 * Takes the value in the range `(omin, omax)` and shifts it to the corresponding value in the new range `(nmin, nmax)`. Unlike `fit`, this function does not clamp values to the given range.  If `omin` and `omax` are the same, the function returns the average of `nmin` and `nmax`.
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit.html
	 * @param value
	 * @param omin
	 * @param omax
	 * @param nmin
	 * @param nmax
	 * @returns
	 */
	export function efit(
		value: number,
		omin: number,
		omax: number,
		nmin: number,
		nmax: number
	) {
		if (omax === omin) {
			return lerp(nmin, nmax, 0.5)
		}

		const t = (value - omin) / (omax - omin)
		return lerp(nmin, nmax, t)
	}

	/**
	 * Takes the value in the range `(0, 1)` and shifts it to the corresponding value in the new range `(nmin, nmax)`.
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit01.html
	 */
	export function fit01(value: number, nmin: number, nmax: number) {
		return fit(value, 0, 1, nmin, nmax)
	}

	/**
	 * Takes the value in the range `(-1, 1)` and shifts it to the corresponding value in the new range `(nmin, nmax)`.
	 * @see https://www.sidefx.com/docs/houdini/vex/functions/fit11.html
	 */
	export function fit11(value: number, nmin: number, nmax: number) {
		return fit(value, -1, 1, nmin, nmax)
	}

	/**
	 * Apply a step function by comparing two values
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
	 * @param edge The location of the edge of the step function.
	 * @param x The value to be used to generate the step function.
	 * @returns
	 */
	export function step(edge: number, x: number) {
		return x < edge ? 0 : 1
	}

	/**
	 * Perform Hermite interpolation between two values.
	 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/smoothstep.xhtml
	 * @param edge0 Lower edge of the Hermite function.
	 * @param edge1 Upper edge of the Hermite function.
	 * @param x  Source value for interpolation.
	 * @returns
	 */
	export function smoothstep(edge0: number, edge1: number, x: number) {
		const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
		return t * t * (3 - 2 * t)
	}

	/**
	 * Converts a number from radians to degrees
	 * @param rad A number in radians
	 * @returns The degrees equivalent of the input
	 *
	 * @shorthands
	 * - {@link deg}
	 */
	export function degrees(rad: number): number {
		return (rad * 180) / Math.PI
	}

	/**
	 * Alias for {@link degrees}
	 * @category Shorthands
	 */
	export const deg = degrees

	/**
	 * Converts a number from degrees to radians
	 * @param deg A number in degrees
	 * @returns The radians equivalent of the input
	 *
	 * @shorthands
	 * - {@link rad}
	 */
	export function radians(deg: number): number {
		return (deg * Math.PI) / 180
	}

	/**
	 * Alias for {@link radians}
	 * @category Shorthands
	 */
	export const rad = radians

	/**
	 * Returns the sine of an angle in degrees
	 * @param deg An angle in degrees
	 */
	export function sin(deg: number): number {
		return Math.sin(deg * Common.DEG2RAD)
	}

	/**
	 * Returns the cosine of an angle in degrees
	 * @param deg An angle in degrees
	 */
	export function cos(deg: number): number {
		return Math.cos(deg * Common.DEG2RAD)
	}

	/**
	 * Returns the tangent of an angle in degrees
	 * @param deg An angle in degrees
	 */
	export function tan(deg: number): number {
		return Math.tan(deg * Common.DEG2RAD)
	}

	/**
	 * Returns the arcsine of a value, in degrees
	 * @param x A numeric expression
	 * @returns The angle in degrees
	 */
	export function asin(x: number): number {
		return Math.asin(x) * Common.RAD2DEG
	}

	/**
	 * Returns the arc cosine of a value, in degrees
	 * @param x A numeric expression
	 * @returns The angle in degrees
	 */
	export function acos(x: number): number {
		return Math.acos(x) * Common.RAD2DEG
	}

	/**
	 * Returns the arc-tangent of the parameters.  If `x` is not provided, `y` is regarded as a value of `y/x`.
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 * @param y the value of the y-coordinate
	 * @param x the value of the x-coordinate
	 * @returns the angle in degrees
	 */
	export function atan(y: number, x?: number): number {
		if (x === undefined) {
			return Math.atan(y) * Common.RAD2DEG
		} else {
			return Math.atan2(y, x) * Common.RAD2DEG
		}
	}

	/**
	 * Returns the arc-tangent of the parameters.
	 * @see https://thebookofshaders.com/glossary/?search=atan
	 * @param y the value of the y-coordinate
	 * @param x the value of the x-coordinate
	 * @returns the angle in degrees
	 */
	export function atan2(y: number, x: number): number {
		return Math.atan2(y, x) * Common.RAD2DEG
	}

	/**
	 * Returns the base to the exponent power
	 */
	export const pow = Math.pow

	/**
	 * Returns e raised to the power of the input
	 */
	export const exp = Math.exp

	/**
	 * Returns the natural logarithm of the input
	 */
	export const log = Math.log

	/**
	 * Returns 2 raised to the power of the parameter
	 * @param v the value of the power to which 2 will be raised
	 */
	export function exp2(v: number): number {
		return 2 ** v
	}

	/**
	 * Returns the base-2 logarithm of the input
	 */
	export const log2 = Math.log2

	/**
	 * Returns the square root of the input
	 */
	export const sqrt = Math.sqrt

	/**
	 * Returns the inverse of the square root of the parameter
	 * @param v the value of which to take the inverse of the square root
	 * @see https://thebookofshaders.com/glossary/?search=inversesqrt
	 */
	export function inverseSqrt(v: number) {
		return 1 / Math.sqrt(v)
	}

	/**
	 * Alias for {@link inverseSqrt}
	 * @category Shorthands
	 */
	export const invsqrt = inverseSqrt

	/**
	 * Returns the hyperbolic sine of the input
	 */
	export const sinh = Math.sinh

	/**
	 * Returns the hyperbolic cosine of the input
	 */
	export const cosh = Math.cosh

	/**
	 * Returns the hyperbolic tangent of the input
	 */
	export const tanh = Math.tanh

	/**
	 * Returns the inverse hyperbolic sine of the input
	 */
	export const asinh = Math.asinh

	/**
	 * Returns the inverse hyperbolic cosine of the input
	 */
	export const acosh = Math.acosh

	/**
	 * Returns the inverse hyperbolic tangent of the input
	 */
	export const atanh = Math.atanh

	/**
	 * Clamps the value to [0, 1]. Equivalent to HLSL's `saturate`.
	 */
	export function saturate(v: number): number {
		return Math.max(0, Math.min(1, v))
	}

	/**
	 * Returns a sawtooth wave with the given period. Basically, the output will be the input value modulo `period`, but returns 1 when the phase is 1. The shape of the wave will be continuous for the negative ranges, so when phase is negative integer, the output will be 0, else if phase is negative float, the output will be 1 - fractional part of phase.
	 * @see https://www.geogebra.org/calculator/d3grfqqe
	 *
	 * @param x the input value
	 * @param period the period of the wave
	 * @category Periodic Functions
	 *
	 * @shorthands
	 * - {@link ramp}
	 *
	 */
	export function sawtooth(x: number, period = 1): number {
		x /= period

		if (x === 1) return 1
		if (x < 0) return (1 + (x % 1)) % 1
		return x % 1
	}

	/**
	 * Alias for {@link sawtooth}
	 * @category Shorthands
	 */
	export const ramp = sawtooth

	/**
	 * Returns a triangle wave with the given period. The output ranges from 0 to 1.
	 * @see https://www.geogebra.org/calculator/d3grfqqe
	 *
	 * @param x The input value
	 * @param period The period of the wave
	 * @category Periodic Functions
	 */
	export function triangle(x: number, period = 1): number {
		x /= period

		return 1 - Math.abs(1 - 2 * (Math.abs(x) % 1))
	}

	/**
	 * Returns a cosine wave with the given period. The output ranges from 0 to 1, and y = 0 when x = 0.
	 *
	 * @see https://www.geogebra.org/calculator/d3grfqqe
	 * @param v the input value
	 * @param period the period of the wave
	 * @category Periodic Functions
	 */
	export function coswave(v: number, period = 1): number {
		v = (v * Math.PI * 2) / period
		return (-Math.cos(v) + 1) / 2
	}

	/**
	 * Returns a sine wave with the given period. The output ranges from 0 to 1, and y = 0 when x = 0.
	 *
	 * @see https://www.geogebra.org/calculator/d3grfqqe
	 * @param v the input value
	 * @param period the period of the wave
	 * @category Periodic Functions
	 */
	export function sinwave(v: number, period = 1): number {
		v = (v * Math.PI * 2) / period
		return (-Math.sin(v) + 1) / 2
	}

	/**
	 * Returns a square wave with the given period. The output is 0 for the first half and 1 for the second half of each period.
	 * @see https://www.geogebra.org/calculator/d3grfqqe
	 *
	 * @param x the input value
	 * @param period the period of the wave
	 * @category Periodic Functions
	 */
	export function square(x: number, period = 1): number {
		x /= period
		const phase = ((x % 1) + 1) % 1
		return phase < 0.5 ? 0 : 1
	}

	/**
	 * Returns whether or not two numbers are approximately equal.
	 *
	 * @shorthands
	 * - {@link approx}
	 * - {@link equals}
	 */
	export function approxEquals(a: number, b: number): boolean {
		return (
			Math.abs(a - b) <=
			Common.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b))
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
}
