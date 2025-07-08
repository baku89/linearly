import {expect, test} from 'vitest'

import {EPSILON} from './common'
import {scalar} from './scalar'
import {vec3} from './vec3'
import {quat} from './quat'
import {mat3} from './mat3'
import {mat4} from './mat4'

// https://github.com/stackgl/gl-vec3/blob/master/test/index.js

test('of', () => {
	expect(vec3.of(2, 3, 4)).toStrictEqual([2, 3, 4])
	expect(vec3.of(2)).toStrictEqual([2, 2, 2])
	expect(vec3.of(2, 3)).toStrictEqual([2, 3, 0])
	expect(vec3.of(2, undefined, 4)).toStrictEqual([2, 0, 4])
})

test('add', () => {
	expect(vec3.add([0, 1, 2], [3, 4, 5])).toEqual([3, 5, 7])
})

test('angle', () => {
	expect(vec3.angle([3, 4, 5], [6, 7, 8])).toEqual(
		scalar.deg(0.0852402656588635)
	)
})

test('ceil', () => {
	expect(vec3.ceil([5.2, 6.5, 7.9])).toEqual([6, 7, 8])
})

test('cross', () => {
	expect(vec3.cross([3, 4, 5], [6, 7, 8])).toEqual([-3, 6, -3])
})

test('distance', () => {
	expect(vec3.distance([1, 2, 3], [4, 6, 7])).toEqual(6.4031242374328485)
})

test('difference', () => {
	expect(vec3.difference([1, 2, 3], [4, 6, 7])).toEqual([3, 4, 4])
	expect(vec3.difference([4, 6, 7], [1, 2, 3])).toEqual([3, 4, 4])
	expect(vec3.difference([-1, -2, -3], [2, 3, 4])).toEqual([3, 5, 7])
	expect(vec3.difference([2, 3, 4], [-1, -2, -3])).toEqual([3, 5, 7])
	expect(vec3.difference([0, 0, 0], [0, 0, 0])).toEqual([0, 0, 0])
})

test('divide', () => {
	expect(vec3.divide([8, 4, 2], [2, 1, 0.5])).toEqual([4, 4, 4])
})

test('dot', () => {
	expect(vec3.dot([3, 4, 5], [6, 7, 8])).toEqual(86)
})

test('equals', () => {
	expect(vec3.equals([3 + EPSILON, 5 - EPSILON, 4 + EPSILON], [3, 5, 4])).toBe(
		true
	)
	expect(vec3.equals([3 + EPSILON * 10, 5, 4], [3, 5, 4])).toBe(false)
	expect(vec3.equals([3, 5 - EPSILON * 10, 4], [3, 5, 4])).toBe(false)
	expect(vec3.equals([3, 5, 4 + EPSILON * 10], [3, 5, 4])).toBe(false)
})

test('exactEquals', () => {
	expect(vec3.exactEquals([3, 5, 4], [3, 5, 4])).toBe(true)
	expect(vec3.exactEquals([3 + EPSILON, 5, 4], [3, 5, 4])).toBe(false)
	expect(vec3.exactEquals([3, 5 + EPSILON, 4], [3, 5, 4])).toBe(false)
	expect(vec3.exactEquals([3, 5, 4 + EPSILON], [3, 5, 4])).toBe(false)
})

test('floor', () => {
	expect(vec3.floor([5.2, 6.6, 7.9])).toEqual([5, 6, 7])
})

test('inverse', () => {
	expect(vec3.invert([2, 4, 8])).toEqual([0.5, 0.25, 0.125])
})

test('length', () => {
	expect(vec3.length([3, 4, 5])).toEqual(7.0710678118654755)
})

test('lerp', () => {
	expect(vec3.lerp([3, 4, 5], [6, 7, 8], 0.25)).toEqual([3.75, 4.75, 5.75])
})

test('max', () => {
	expect(vec3.max([3, 7, 2], [5, 6, 4])).toEqual([5, 7, 4])
})

test('min', () => {
	expect(vec3.min([3, 7, 8], [5, 6, 2])).toEqual([3, 6, 2])
})

test('clamp', () => {
	expect(vec3.clamp([3, 7, 8], [4, 4, 4], [5, 6, 7])).toEqual([4, 6, 7])
})

test('multiply', () => {
	expect(vec3.multiply([3, 4, 5], [6, 7, 8])).toEqual([18, 28, 40])
})

test('negate', () => {
	expect(vec3.negate([3, 4, 5])).toEqual([-3, -4, -5])
})

test('normalize', () => {
	expect(vec3.normalize([3, 4, 5])).toEqual([
		0.4242640687119285, 0.565685424949238, 0.7071067811865475,
	])
})

test('rotateX', () => {
	expect(vec3.rotateX([3, 4, 5], [6, 7, 8], 90)).toEqual([3, 10, 5])
})

test('rotateY', () => {
	expect(vec3.rotateY([3, 4, 5], [6, 7, 8], 90)).toEqual([3, 4, 11])
})

test('rotateZ', () => {
	expect(vec3.rotateZ([3, 4, 5], [6, 7, 8], 90)).toEqual([9, 4, 5])
})

test('scale', () => {
	expect(vec3.scale([3, 4, 5], 2)).toEqual([6, 8, 10])
})

test('scaleAndAdd', () => {
	expect(vec3.scaleAndAdd([3, 4, 5], [6, 7, 8], 2)).toEqual([15, 18, 21])
})

test('round', () => {
	expect(vec3.round([5.2, 6.6, 8.5])).toEqual([5, 7, 9])
})

test('squaredDistance', () => {
	expect(vec3.squaredDistance([3, 4, 5], [6, 7, 8])).toEqual(27)
})

test('squaredLength', () => {
	expect(vec3.squaredLength([3, 4, 5])).toEqual(50)
})

test('subtract', () => {
	expect(vec3.subtract([3, 4, 5], [6, 7, 8])).toEqual([-3, -3, -3])
})

test('sub', () => {
	expect(vec3.subtract([3, 4, 5], [6, 7, 8])).toEqual([-3, -3, -3])
})

test('transformMat3', () => {
	expect(
		vec3.transformMat3([3, 4, 5], [5, 6, 7, 8, 9, 10, 11, 12, 13])
	).toEqual([102, 114, 126])
})

test('transformMat4', () => {
	expect(
		vec3.transformMat4(
			[3, 4, 5],
			[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
		)
	).toEqual([0.7732558139534884, 0.8488372093023255, 0.9244186046511628])
})

test('transformQuat', () => {
	expect(vec3.transformQuat([3, 4, 5], [6, 7, 8, 9])).toEqual([882, 824, 1090])
})

test('transform', () => {
	// Test with mat3
	expect(vec3.transform([3, 4, 5], [5, 6, 7, 8, 9, 10, 11, 12, 13])).toEqual([
		102, 114, 126,
	])

	// Test with mat4
	expect(
		vec3.transform(
			[3, 4, 5],
			[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
		)
	).toEqual([0.7732558139534884, 0.8488372093023255, 0.9244186046511628])

	// Test with quat
	expect(vec3.transform([3, 4, 5], [6, 7, 8, 9])).toEqual([882, 824, 1090])

	// Test error case
	expect(() => vec3.transform([3, 4, 5], [1, 2, 3, 4, 5] as any)).toThrow(
		'Unsupported matrix size: 5'
	)
})
