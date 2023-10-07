import * as Common from './common'

export function add(...vs: number[]): number {
	return vs.reduce((a, b) => a + b, 0)
}

export function subtract(...vs: number[]): number {
	if (vs.length === 0) {
		return 0
	} else if (vs.length === 1) {
		return -vs[0]
	}
	return vs.reduce((a, b) => a - b)
}

export function multiply(...vs: number[]): number {
	return vs.reduce((a, b) => a * b, 1)
}

export function divide(...vs: number[]): number {
	if (vs.length === 0) {
		return 1
	} else if (vs.length === 1) {
		return 1 / vs[0]
	}
	return vs.reduce((a, b) => a / b)
}

/**
 * Symmetric round the given number
 */
export const round = Common.round

export const ceil = Math.ceil

export const floor = Math.floor

/**
 * Computes the fractional part of the argument
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/fract.xhtml
 */
export function fract(a: number): number {
	return a - floor(a)
}

/**
 * Compute value of one parameter module another. This is computed as x - y * floor(x/y). Unlike JavaScript's `%` operator, the sign of result always matches to `b`.
 * @see https://thebookofshaders.com/glossary/?search=mod
 */
export function mod(a: number, b: number): number {
	return a - b * floor(a / b)
}

export function quantize(v: number, step: number, offset = 0): number {
	return Math.round((v - offset) / step) * step + offset
}

export const min = Math.min

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

export function scale(a: number, b: number): number {
	return a * b
}

export function scaleAndAdd(a: number, b: number, s: number): number {
	return a + b * s
}

export function distance(a: number, b: number): number {
	return Math.abs(a - b)
}

export function squaredDistance(a: number, b: number): number {
	return (a - b) ** 2
}

export const length = Math.abs

export function squaredLength(a: number): number {
	return a ** 2
}

export function negate(a: number): number {
	return -a
}

export function inverse(a: number): number {
	return 1 / a
}

export const normalize = Math.sign

/**
 * Linearly interpolate between two numbers. Same as GLSL's bulit-in `mix` function.
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 */
export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t
}

/**
 * Returns the amount to mix `min` and `max` to generate the input value `t`. This is the inverse of the `lerp` function. If `min` and `max` are equal, the mixing value is `0.5`.
 * @see https://docs.unity3d.com/Packages/com.unity.shadergraph@6.9/manual/Inverse-Lerp-Node.html
 * @see https://www.sidefx.com/docs/houdini/vex/functions/invlerp.html
 */
export function inverseLerp(a: number, b: number, t: number): number {
	if (a === b) return 0.5
	return (t - a) / (b - a)
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
	value: number,
	omin: number,
	omax: number,
	nmin: number,
	nmax: number
) {
	const t = clamp((value - omin) / (omax - omin), 0, 1)
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
	value: number,
	omin: number,
	omax: number,
	nmin: number,
	nmax: number
) {
	const t = (value - omin) / (omax - omin)
	return lerp(nmin, nmax, t)
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

export function degrees(rad: number): number {
	return (rad * 180) / Math.PI
}

export function radians(deg: number): number {
	return (deg * Math.PI) / 180
}

export const sin = Math.sin

export const cos = Math.cos

export const tan = Math.tan

export const asin = Math.asin

export const acos = Math.acos

/**
 * Returns the arc-tangent of the parameters.
 * @see https://thebookofshaders.com/glossary/?search=atan
 */
export function atan(yOverX: number): number
export function atan(y: number, x?: number): number {
	if (x === undefined) {
		return Math.atan(y)
	} else {
		return Math.atan2(y, x)
	}
}

export const pow = Math.exp

export const exp = Math.exp

export const log = Math.log

/**
 * Returns 2 raised to the power of the parameter
 * @param v the value of the powe to which 2 will be raised
 */
export function exp2(v: number): number {
	return 2 ** v
}

export const log2 = Math.log2

export const sqrt = Math.sqrt

/**
 * Returns the inverse of the square root of the parameter
 * @param v the value of which to take the inverse of the square root
 * @see https://thebookofshaders.com/glossary/?search=inversesqrt
 */
export function inverseSqrt(v: number) {
	return 1 / Math.sqrt(v)
}

export function exactEquals(a: number, b: number): boolean {
	return a === b
}

export function equals(a: number, b: number): boolean {
	return (
		Math.abs(a - b) <= Common.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b))
	)
}

/**
 * Alias for {@link scalar.subtract}
 * @category Aliases
 */
export const sub = subtract

/**
 * Alias for {@link scalar.multiply}
 * @category Aliases
 */
export const mul = multiply

/**
 * Alias for {@link scalar.divide}
 * @category Aliases
 */
export const div = divide

/**
 * Alias for {@link scalar.distance}
 * @category Aliases
 */
export const dist = distance

/**
 * Alias for {@link scalar.length}
 * @category Aliases
 */
export const len = length

/**
 * Alias for {@link scalar.squaredDistance}
 * @category Aliases
 */
export const sqrDist = squaredDistance

/**
 * Alias for {@link scalar.squaredLength}
 * @category Aliases
 */
export const sqrLen = squaredLength

/**
 * Alias for {@link scalar.inverse}
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 * @category Aliases
 */
export const mix = lerp

/**
 * Alias for {@link scalar.inverseLerp}
 * @category Aliases
 */
export const invlerp = inverseLerp
export const rad = radians
export const deg = degrees
export const invsqrt = inverseSqrt
