/**
 * Common utilities
 */

// Configuration Constants
export const EPSILON = 0.000001

/**
 * Symmetric round
 * see https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 */
export function round(a: number) {
	if (a >= 0) return Math.round(a)
	return a % 0.5 === 0 ? Math.floor(a) : Math.round(a)
}

export type AngleOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx'

export const DEFAULT_ANGLE_ORDER: AngleOrder = 'zyx'
