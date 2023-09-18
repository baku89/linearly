import * as Common from './common'

export function add(...ss: number[]): number {
	return ss.reduce((a, b) => a + b, 0)
}

export function subtract(...ss: number[]): number {
	if (ss.length === 0) {
		return 0
	} else if (ss.length === 1) {
		return -ss[0]
	}
	return ss.reduce((a, b) => a - b)
}

export function multiply(...ss: number[]): number {
	return ss.reduce((a, b) => a * b, 1)
}

export function divide(...ss: number[]): number {
	if (ss.length === 0) {
		return 1
	} else if (ss.length === 1) {
		return 1 / ss[0]
	}
	return ss.reduce((a, b) => a / b)
}

export const ceil = Math.ceil

export const floor = Math.floor

export const min = Math.min

export const max = Math.max

export function clamp(s: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, s))
}

/**
 * Symmetric round the given number
 */
export const round = Common.round

export function scale(a: number, s: number): number {
	return a * s
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

export function normalize(a: number): number {
	return a === 0 ? 0 : a / Math.abs(a)
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t
}

export function fit(
	value: number,
	omin: number,
	omax: number,
	nmin: number,
	nmax: number
) {
	const t = (value - omin) / (omax - omin)
	return lerp(t, nmin, nmax)
}

export function exactEquals(a: number, b: number): boolean {
	return a === b
}

export function equals(a: number, b: number): boolean {
	return (
		Math.abs(a - b) <= Common.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b))
	)
}

export const sub = subtract
export const mul = multiply
export const div = divide
export const dist = distance
export const len = length
export const sqrDist = squaredDistance
export const sqrLen = squaredLength
