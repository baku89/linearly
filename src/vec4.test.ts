import * as vec4 from './vec4'

// https://github.com/stackgl/gl-vec3/blob/master/test/index.js

test('of', () => {
	expect(vec4.of(1, 2, 3, 4)).toStrictEqual([1, 2, 3, 4])
	expect(vec4.of(1)).toStrictEqual([1, 1, 1, 1])
	expect(vec4.of(1, 2)).toStrictEqual([1, 2, 0, 0])
	expect(vec4.of(1, 2, 3)).toStrictEqual([1, 2, 3, 0])
	expect(vec4.of(1, undefined, 3, undefined)).toStrictEqual([1, 0, 3, 0])
})
