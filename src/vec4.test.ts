import {expect, test} from 'vitest'

import {vec4} from './vec4'

// https://github.com/stackgl/gl-vec3/blob/master/test/index.js

test('of', () => {
	expect(vec4.of(1, 2, 3, 4)).toStrictEqual([1, 2, 3, 4])
	expect(vec4.of(1)).toStrictEqual([1, 1, 1, 1])
	expect(vec4.of(1, 2)).toStrictEqual([1, 2, 0, 0])
	expect(vec4.of(1, 2, 3)).toStrictEqual([1, 2, 3, 0])
	expect(vec4.of(1, undefined, 3, undefined)).toStrictEqual([1, 0, 3, 0])
})

test('difference', () => {
	expect(vec4.difference([1, 2, 3, 4], [5, 6, 7, 8])).toEqual([4, 4, 4, 4])
	expect(vec4.difference([5, 6, 7, 8], [1, 2, 3, 4])).toEqual([4, 4, 4, 4])
	expect(vec4.difference([-1, -2, -3, -4], [2, 3, 4, 5])).toEqual([3, 5, 7, 9])
	expect(vec4.difference([2, 3, 4, 5], [-1, -2, -3, -4])).toEqual([3, 5, 7, 9])
	expect(vec4.difference([0, 0, 0, 0], [0, 0, 0, 0])).toEqual([0, 0, 0, 0])
})
