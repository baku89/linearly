import {expect, test} from 'vitest'

import {quat} from './quat'

test('clamp', () => {
	expect(quat.clamp([-2, 0.5, 1.5, -0.5], 0, 1)).toEqual([0, 0.5, 1, 0])
})

test('clamp01', () => {
	expect(quat.clamp01([-1, 0, 0.5, 2])).toEqual([0, 0, 0.5, 1])
})

test('clamp11', () => {
	expect(quat.clamp11([-3, -1, 0.5, 2])).toEqual([-1, -1, 0.5, 1])
})
