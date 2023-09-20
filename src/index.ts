/**
 * Represents a single number.
 */
export * as scalar from './scalar'

/**
 * Represents 2D vector.
 */
export * as vec2 from './vec2'
export type {Vec2} from './vec2'

/**
 * Represents 3D vector.
 */
export * as vec3 from './vec3'
export type {Vec3} from './vec3'

/**
 * Represents 4D vector.
 */
export * as vec4 from './vec4'
export type {Vec4} from './vec4'

/**
 * Represents 2D linear transformation (rotation, scaling, skewing).
 */
export * as mat2 from './mat2'
export type {Mat2} from './mat2'

/**
 * Represents 2D affine transformation (translation, rotation, scaling, skewing), omitting reduction thrid row which is always set to `[0, 0, 1]`. The order of six elements is the same as CSS transform matrix.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
 */
export * as mat2d from './mat2d'
export type {Mat2d} from './mat2d'

/**
 * Rpresents 2D homogeneous transformation (translation, rotation, scaling, skewing, perspective).
 */
export * as mat3 from './mat3'
export type {Mat3} from './mat3'

/**
 * Represents 3D affine transformation (translation, rotation, scaling, skewing).
 */
export * as mat4 from './mat4'
export type {Mat4} from './mat4'

/**
 * Represents rotation in 3D space.
 */
export * as quat from './quat'
export type {Quat} from './quat'
