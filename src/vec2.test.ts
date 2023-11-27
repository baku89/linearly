import '../jest.setup'

import {EPSILON} from './common'
import {vec2} from './vec2'

// https://github.com/stackgl/gl-vec2/blob/master/test/index.js
test('of', () => {
	expect(vec2.of(2, 3)).toStrictEqual([2, 3])
	expect(vec2.of(2)).toStrictEqual([2, 2])
})

test('add', () => {
	expect(vec2.add()).toStrictEqual([0, 0])
	expect(vec2.add([0, 1])).toStrictEqual([0, 1])
	expect(vec2.add([0, 1], [2, 3])).toStrictEqual([2, 4])
	expect(vec2.add([0, 1], [2, 3], [4, 5])).toStrictEqual([6, 9])
})

test('ceil', () => {
	expect(vec2.ceil([5.2, 6.5])).toStrictEqual([6, 7])
})

test('cross', () => {
	expect(vec2.cross([3, 4], [5, 6])).toStrictEqual([0, 0, -2])
})

test('distance', () => {
	expect(vec2.distance([1, 2], [4, 6])).toEqual(5)
})

test('divide', () => {
	expect(vec2.divide([8, 4], [2, 1])).toEqual([4, 4])
})

test('dot', () => {
	expect(vec2.dot([3, 4], [5, 6])).toEqual(39)
})

test('equals', () => {
	expect(vec2.equals([3 + EPSILON, 5 - EPSILON], [3, 5])).toBe(true)
	expect(vec2.equals([3 + EPSILON * 10, 5 - EPSILON], [3, 5])).toBe(false)
	expect(vec2.equals([3 + EPSILON, 5 - EPSILON * 10], [3, 5])).toBe(false)
})

test('exactEquals', () => {
	expect(vec2.exactEquals([3, 5], [3, 5])).toBe(true)
	expect(vec2.exactEquals([3 + EPSILON, 5], [3, 5])).toBe(false)
	expect(vec2.exactEquals([3, 5 - EPSILON], [3, 5])).toBe(false)
})

test('floor', () => {
	expect(vec2.floor([5.2, 6.6])).toEqual([5, 6])
})

test('inverse', () => {
	expect(vec2.inverse([2, 4])).toEqual([0.5, 0.25])
})

test('length', () => {
	expect(vec2.length([3, 4])).toEqual(5)
})

test('lerp', () => {
	expect(vec2.lerp([3, 4], [5, 6], 0.25)).toEqual([3.5, 4.5])
})

test('max', () => {
	expect(vec2.max([3, 7], [5, 6])).toEqual([5, 7])
})

test('min', () => {
	expect(vec2.min([3, 7], [5, 6])).toEqual([3, 6])
})

test('clamp', () => {
	expect(vec2.clamp([3, 7], [4, 4], [5, 6])).toEqual([4, 6])
})

test('multiply', () => {
	expect(vec2.multiply([3, 4], [5, 6])).toEqual([15, 24])
})

test('negate', () => {
	expect(vec2.negate([3, 4])).toEqual([-3, -4])
})

test('normalize', () => {
	expect(vec2.normalize([3, 4])).toEqual([3 / 5, 4 / 5])
	expect(vec2.normalize([0, 0])).toEqual([0, 0])
})

test('rotate', () => {
	expect(vec2.rotate([1, 2], Math.PI, [0, 0])).toEqual([-1, -2])
})

test('round', () => {
	expect(vec2.round([5.2, 6.6])).toEqual([5, 7])
})

test('scale', () => {
	expect(vec2.scale([3, 4], 2)).toEqual([6, 8])
})

test('scaleAndAdd', () => {
	expect(vec2.scaleAndAdd([3, 4], [5, 6], 2)).toEqual([13, 16])
})

test('squaredDistance', () => {
	expect(vec2.squaredDistance([3, 4], [5, 6])).toEqual(8)
})

test('squaredLength', () => {
	expect(vec2.squaredLength([3, 4])).toEqual(25)
})

test('subtract', () => {
	expect(vec2.subtract([3, 4], [5, 6])).toEqual([-2, -2])
})

test('transformMat2', () => {
	expect(vec2.transformMat2([3, 4], [5, 6, 7, 8])).toEqual([43, 50])
})

test('transformMat2d', () => {
	expect(vec2.transformMat2d([3, 4], [5, 6, 7, 8, 9, 10])).toEqual([52, 60])
})

test('transformMat3', () => {
	expect(
		vec2.transformMat3([3, 4], [5, 6, 0, 8, 9, 0, 11, 12, 0])
	).toStrictEqual([58, 66])
})
