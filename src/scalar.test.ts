import {describe, expect, it, test} from 'vitest'

import {EPSILON} from './common'
import {scalar} from './scalar'

test('add', () => {
	expect(scalar.add()).toStrictEqual(0)
	expect(scalar.add(2)).toStrictEqual(2)
	expect(scalar.add(2, 3)).toStrictEqual(5)
	expect(scalar.add(2, 3, 4)).toStrictEqual(9)
})

test('ceil', () => {
	expect(scalar.ceil(5.2)).toStrictEqual(6)
})

test('distance', () => {
	expect(scalar.distance(1, 4)).toEqual(3)
	expect(scalar.distance(4, 1)).toEqual(3)
	expect(scalar.distance(-1, -1)).toEqual(0)
})

test('difference', () => {
	expect(scalar.difference(1, 4)).toEqual(3)
	expect(scalar.difference(4, 1)).toEqual(3)
	expect(scalar.difference(-1, -1)).toEqual(0)
	expect(scalar.difference(-2, 3)).toEqual(5)
	expect(scalar.difference(3, -2)).toEqual(5)
})

test('divide', () => {
	expect(scalar.divide()).toEqual(1)
	expect(scalar.divide(5)).toEqual(1 / 5)
	expect(scalar.divide(8, 2)).toEqual(4)
	expect(scalar.divide(8, 2, 2)).toEqual(2)
})

test('equals', () => {
	expect(scalar.equals(3 + EPSILON, 3)).toBe(true)
	expect(scalar.equals(3 + EPSILON * 10, 3)).toBe(false)
})

test('floor', () => {
	expect(scalar.floor(5.2)).toEqual(5)
})

test('inverse', () => {
	expect(scalar.invert(2)).toEqual(0.5)
})

test('length', () => {
	expect(scalar.length(3)).toEqual(3)
	expect(scalar.length(0)).toEqual(0)
	expect(scalar.length(-2)).toEqual(2)
})

test('lerp', () => {
	expect(scalar.lerp(3, 5, 0.25)).toEqual(3.5)
})

test('inverseLerp', () => {
	expect(scalar.invlerp(0, 1, 0.2)).toEqual(0.2)
	expect(scalar.invlerp(0, 10, 0.2)).toEqual(0.02)
	expect(scalar.invlerp(-1, 1, 0.5)).toEqual(0.75)
	expect(scalar.invlerp(10, -10, 0)).toEqual(0.5)
})

describe('fit', () => {
	it('should fit the value to the target range', () => {
		expect(scalar.fit(4, 0, 10, 0, 100)).toEqual(40)
		expect(scalar.fit(0, 0, 10, 0, 100)).toEqual(0)
		expect(scalar.fit(10, 0, 10, 0, 100)).toEqual(100)
	})

	it('should clamp the value to the target range', () => {
		expect(scalar.fit(5, 0, 4, 0, 100)).toEqual(100)
		expect(scalar.fit(-1, 0, 10, 0, 100)).toEqual(0)
	})

	it('should return the average of `nmin` and `nmax` when the `omin` and `omax` are the same`', () => {
		expect(scalar.fit(5, 5, 5, 0, 7)).toEqual(3.5)
	})
})

describe('efit', () => {
	it('should fit the value to the target range', () => {
		expect(scalar.efit(4, 0, 10, 0, 100)).toEqual(40)
		expect(scalar.efit(0, 0, 10, 0, 100)).toEqual(0)
		expect(scalar.efit(10, 0, 10, 0, 100)).toEqual(100)
	})

	it('should not clamp the value to the target range', () => {
		expect(scalar.efit(5, 0, 4, 0, 100)).toEqual(125)
		expect(scalar.efit(-1, 0, 10, 0, 100)).toEqual(-10)
	})

	it('should return the average of `nmin` and `nmax` when the `omin` and `omax` are the same`', () => {
		expect(scalar.fit(5, 5, 5, 0, 7)).toEqual(3.5)
	})
})

test('max', () => {
	expect(scalar.max(3, 7)).toEqual(7)
})

test('min', () => {
	expect(scalar.min(3, 7)).toEqual(3)
})

test('clamp', () => {
	expect(scalar.clamp(3, 4, 5)).toEqual(4)
})

test('multiply', () => {
	expect(scalar.multiply()).toEqual(1)
	expect(scalar.multiply(3)).toEqual(3)
	expect(scalar.multiply(3, 4)).toEqual(12)
	expect(scalar.multiply(3, 4, 5)).toEqual(60)
})

test('negate', () => {
	expect(scalar.negate(0)).toEqual(-0)
	expect(scalar.negate(3)).toEqual(-3)
})

test('normalize', () => {
	expect(scalar.normalize(2)).toEqual(1)
	expect(scalar.normalize(-4)).toEqual(-1)
	expect(scalar.normalize(0)).toEqual(0)
})

test('round', () => {
	expect(scalar.round(5.2)).toEqual(5)
	expect(scalar.round(-20.6)).toEqual(-21)
	expect(scalar.round(-20.5)).toEqual(-21)
	expect(scalar.round(-20.4)).toEqual(-20)
})

test('scale', () => {
	expect(scalar.scale(3, 2)).toEqual(6)
})

test('scaleAndAdd', () => {
	expect(scalar.scaleAndAdd(3, 4, 2)).toEqual(11)
})

test('squaredDistance', () => {
	expect(scalar.squaredDistance(3, 5)).toEqual(4)
})

test('squaredLength', () => {
	expect(scalar.squaredLength(3)).toEqual(9)
})

test('subtract', () => {
	expect(scalar.subtract()).toEqual(0)
	expect(scalar.subtract(5)).toEqual(-5)
	expect(scalar.subtract(5, 2)).toEqual(3)
	expect(scalar.subtract(5, 2, 1)).toEqual(2)
})

test('ramp', () => {
	expect(scalar.ramp(0)).toEqual(0)
	expect(scalar.ramp(-0.1)).toEqual(0.9)
	expect(scalar.ramp(1)).toEqual(1)
	expect(scalar.ramp(-1)).toEqual(0)
	expect(scalar.ramp(-1.2)).toEqual(0.8)
	expect(scalar.ramp(-2)).toEqual(0)
	expect(scalar.ramp(-10.9)).toEqual(0.1)
})

test('triangle', () => {
	expect(scalar.triangle(0)).toEqual(0)
	expect(scalar.triangle(0.25)).toEqual(0.5)
	expect(scalar.triangle(0.5)).toEqual(1)
	expect(scalar.triangle(0.8)).toEqual(0.4)
	expect(scalar.triangle(1)).toEqual(0)
	expect(scalar.triangle(1.4)).toEqual(0.8)
	expect(scalar.triangle(-0.25)).toEqual(0.5)
	expect(scalar.triangle(-1.4)).toEqual(0.8)
})

test('coswave', () => {
	expect(scalar.coswave(0)).toEqual(0)
	expect(scalar.coswave(0.25)).toEqual(0.5)
	expect(scalar.coswave(0.5)).toEqual(1)
	expect(scalar.coswave(1)).toEqual(0)
	expect(scalar.coswave(1.5)).toEqual(1)
	expect(scalar.coswave(-0.25)).toEqual(0.5)
	expect(scalar.coswave(-1.5)).toEqual(1)
})
