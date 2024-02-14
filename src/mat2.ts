import * as Common from './common'
import {vec2} from './vec2'

/**
 * Represents 2D transformation exclude translation.
 * The format is column-major as in WebGL, so the matrix looks like this:
 * ```
 * [xx, xy,
 *  yx, yy]
 * ```
 * @category Types
 */
export type mat2 = readonly [m00: number, m01: number, m10: number, m11: number]

/**
 * Functions for {@link mat2}, 2D transformation matrix exclude translation.
 */
export namespace mat2 {
	/**
	 * Mutable version of {@link mat2}
	 * @category Types
	 */
	export type Mutable = [m00: number, m01: number, m10: number, m11: number]

	/**
	 * Creates a new matrix from given elements
	 * @category Generators
	 */
	export function of(m00: number, m01: number, m10: number, m11: number): mat2 {
		return [m00, m01, m10, m11]
	}

	/**
	 * Creates a mutable clone of given mat2
	 * @category Generators
	 */
	export function clone(a: mat2): Mutable {
		return [...a]
	}

	/**
	 * The identity matrix of mat2.
	 * ```
	 * [1, 0,
	 *  0, 1]
	 * ```
	 * @category Constants
	 */
	export const identity: mat2 = Object.freeze([1, 0, 0, 1])

	/**
	 * The mat2d filled with zeros.
	 * @category Constants
	 */
	export const zero: mat2 = Object.freeze([0, 0, 0, 0])

	/**
	 * Transpose the values of a mat2
	 */
	export function transpose(a: mat2): mat2 {
		// prettier-ignore
		return [
			a[0], a[2],
			a[1], a[3],
		]
	}

	/**
	 * Inverts a mat2
	 */
	export function invert(a: mat2): mat2 | null {
		const [a0, a1, a2, a3] = a

		// Calculate the determinant
		const det = a0 * a3 - a2 * a1

		if (!det) {
			return null
		}
		const detinv = 1 / det

		// prettier-ignore
		return [
			a3 * detinv, -a1 * detinv,
			-a2 * detinv,  a0 * detinv
		]
	}

	/**
	 * Calculates the adjugate of a mat2
	 */
	export function adjoint(a: mat2): mat2 {
		// Caching this value is necessary if out == a
		const a0 = a[0]
		return [a[3], -a[1], -a[2], a0]
	}

	/**
	 * Calculates the determinant of a mat2
	 * @returns determinant of a
	 */
	export function determinant(a: mat2) {
		return a[0] * a[3] - a[2] * a[1]
	}

	/**
	 * Multiplies given mat2's
	 */
	export function multiply(...ms: mat2[]): mat2 {
		if (ms.length === 0) {
			return identity
		} else if (ms.length === 1) {
			return ms[0]
		} else if (ms.length > 2) {
			const [a, b, ...rest] = ms
			return multiply(multiply(a, b), ...rest)
		}

		const [a0, a1, a2, a3] = ms[0]
		const [b0, b1, b2, b3] = ms[1]

		return [
			a0 * b0 + a2 * b1,
			a1 * b0 + a3 * b1,
			a0 * b2 + a2 * b3,
			a1 * b2 + a3 * b3,
		]
	}

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 */
	export function rotate(a: mat2, rad: number): mat2 {
		const [a0, a1, a2, a3] = a
		const s = Math.sin(rad)
		const c = Math.cos(rad)

		return [
			a0 * c + a2 * s,
			a1 * c + a3 * s,
			a0 * -s + a2 * c,
			a1 * -s + a3 * c,
		]
	}

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 **/
	export function scale(a: mat2, b: vec2 | number): mat2 {
		const [a0, a1, a2, a3] = a
		const [v0, v1] = typeof b === 'number' ? [b, b] : b

		return [a0 * v0, a1 * v0, a2 * v1, a3 * v1]
	}

	/**
	 * Apply skew to the mat2d by the given angles
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
	 */
	export function skew(m: mat2, rad: vec2): mat2 {
		return multiply(m, fromSkew(rad))
	}

	/**
	 * Creates a matrix from a given angle
	 * @category Generators
	 */
	export function fromRotation(rad: number): mat2 {
		const s = Math.sin(rad)
		const c = Math.cos(rad)
		return [c, s, -s, c]
	}

	/**
	 * Creates a matrix from a vector scaling
	 * @category Generators
	 */
	export function fromScaling(v: vec2): mat2 {
		return [v[0], 0, 0, v[1]]
	}

	/**
	 * Creates a matrix from a vector skew
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
	 * @category Generators
	 */
	export function fromSkew(rad: vec2): mat2 {
		const x = Math.tan(rad[0])
		const y = Math.tan(rad[1])

		// prettier-ignore
		return [
			1, y,
			x, 1,
		]
	}

	/**
	 * Returns Frobenius norm of a mat2
	 */
	export function frob(a: mat2) {
		return Math.hypot(a[0], a[1], a[2], a[3])
	}

	/**
	 * Adds given mat2's
	 */
	export function add(...ms: mat2[]): mat2 {
		if (ms.length === 0) {
			return zero
		} else if (ms.length === 1) {
			return ms[0]
		} else if (ms.length > 2) {
			const [a, b, ...rest] = ms
			return add(add(a, b), ...rest)
		}

		const [a, b] = ms

		return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]
	}

	/**
	 * Subtracts matrix b from matrix a
	 */
	export function subtract(...ms: mat2[]): mat2 {
		if (ms.length === 0) {
			return zero
		} else if (ms.length === 1) {
			return [-ms[0], -ms[1], -ms[2], -ms[3]]
		} else if (ms.length > 2) {
			const [a, b, ...rest] = ms
			return subtract(subtract(a, b), ...rest)
		}

		const [a, b] = ms

		return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]
	}

	/**
	 * Subtracts b from a
	 */
	export function delta(a: mat2, b: mat2): mat2 {
		return [b[0] - a[0], b[1] - a[1], b[2] - a[2], b[3] - a[3]]
	}

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with `===`)
	 */
	export function exactEquals(a: mat2, b: mat2) {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
	}

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 */
	export function equals(a: mat2, b: mat2) {
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
	 * Alias for {@link identity}
	 * @category Aliases
	 */
	export const ident = identity

	/**
	 * Alias for {@link subtract}
	 * @category Aliases
	 */
	export const sub = subtract

	/**
	 * Alias for {@link mat2.multiply}
	 * @category Aliases
	 */
	export const mul = multiply

	/**
	 * Alias for {@link mat2.determinant}
	 * @category Aliases
	 */
	export const det = determinant

	/**
	 * Alias for {@link mat2.invert}
	 * @category Aliases
	 */
	export const inv = invert

	/**
	 * Alias for {@link mat2.fromRotation}
	 * @category Aliases
	 */
	export const rotation = fromRotation

	/**
	 * Alias for {@link mat2.fromScaling}
	 * @category Aliases
	 */
	export const scaling = fromScaling

	/**
	 * Alias for {@link mat2.fromSkew}
	 * @category Aliases
	 */
	export const skewing = fromSkew
}
