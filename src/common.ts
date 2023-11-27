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

export function vecToString(v: readonly number[], fractionDigits = 2): string {
	const strs = v.map(a => toFixedSimple(a, fractionDigits))

	return '[' + strs.join(', ') + ']'
}

function toFixedSimple(a: number, fractionDigits = 2): string {
	return a
		.toFixed(fractionDigits)
		.replace(/\.([\d]*?)(0+)$/g, '.$1')
		.replace(/\.$/g, '')
}

export function createMatToStringFunction(col: number, row: number) {
	function padNumber(str: string, padWhile: number, padLength: number) {
		const [whole, decimal] = str.split('.')
		const paddedWhole = whole.padStart(padWhile, ' ')
		const paddedDecimal = (decimal !== undefined ? '.' + decimal : '').padEnd(
			padLength,
			' '
		)

		return paddedWhole + paddedDecimal
	}

	return function (m: readonly number[], fractionDigits = 2): string {
		const strs = m.map(a => toFixedSimple(a, fractionDigits))

		const maxDecimalLengthPerCol = []
		const maxWholeLengthPerCol = []

		for (let i = 0; i < col; i++) {
			const colStrs = []
			for (let j = 0; j < row; j++) {
				colStrs.push(strs[i + j * col])
			}
			maxWholeLengthPerCol.push(
				Math.max(...colStrs.map(a => a.split('.')[0].length))
			)
			maxDecimalLengthPerCol.push(
				Math.max(
					...colStrs.map(a => {
						const decimal = a.split('.')[1]
						return decimal !== undefined ? ('.' + decimal).length : 0
					})
				)
			)
		}

		const rows: string[] = []
		for (let j = 0; j < row; j++) {
			const rowStrs = []
			for (let i = 0; i < col; i++) {
				const str = strs[i + j * col]
				const wholeLength = maxWholeLengthPerCol[i]
				const decimalLength = maxDecimalLengthPerCol[i]
				rowStrs.push(padNumber(str, wholeLength, decimalLength))
			}
			rows.push(rowStrs.join(', '))
		}

		return '[' + rows.join(',\n ') + ']'
	}
}
