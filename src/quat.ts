import * as Common from './common'
import type {mat3} from './mat3'
import {mat4} from './mat4'
import {vec3} from './vec3'
import {vec4} from './vec4'

/**
 * Represents rotation in 3D space with the quaternion format XYZW.
 * @category Types
 */
export type quat = readonly [x: number, y: number, z: number, w: number]

/**
 * FUnctions for {@link quat}, a format for representing rotation in 3D space.
 */
export namespace quat {
	/**
	 * Mutable version of {@link quat}
	 * @category Types
	 */
	export type Mutable = [x: number, y: number, z: number, w: number]

	/**
	 * Creates a new quaternion from given elements
	 * @category Generators
	 */
	export function of(x: number, y: number, z: number, w: number): quat {
		return [x, y, z, w]
	}

	/**
	 * Creates a mutable clone of given quat
	 * @category Generators
	 */
	export function clone(a: quat): Mutable {
		return [...a]
	}

	/**
	 * The identity quaternion.
	 * @category Constants
	 *
	 * @shorthands
	 * - {@link id}
	 * - {@link ident}
	 */
	export const identity: quat = Object.freeze([0, 0, 0, 1])

	/**
	 * Alias for {@link identity}
	 * @category Shorthands
	 */
	export const I = identity

	/**
	 * Alias for {@link identity}
	 * @category Shorthands
	 */
	export const id = identity

	/**
	 * Alias for {@link identity}
	 * @category Shorthands
	 */
	export const ident = identity

	/**
	 * The zero quaternion.
	 * @category Constants
	 */
	export const zero: quat = Object.freeze([0, 0, 0, 0])

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 * @category Generators
	 * @param axis the axis around which to rotate
	 * @param deg the angle in degrees
	 **/
	export function fromAxisAngle(axis: vec3, deg: number): quat {
		const rad = deg * Common.DEG2RAD * 0.5
		const s = Math.sin(rad)

		return [
			s * axis[0], //
			s * axis[1],
			s * axis[2],
			Math.cos(rad),
		]
	}

	/**
	 * Gets the rotation axis and angle for a given
	 *  quaternion. If a quaternion is created with
	 *  fromAxisAngle, this method will return the same
	 *  values as providied in the original parameter list
	 *  OR functionally equivalent values.
	 * Example: The quaternion formed by axis [0, 0, 1] and
	 *  angle -90 is the same as the quaternion formed by
	 *  [0, 0, 1] and 270. This method favors the latter.
	 *
	 * @param  q Quaternion to be decomposed
	 */
	export function axisAngle(q: quat): {axis: vec3; deg: number} {
		const rad = Math.acos(q[3]) * 2
		const s = Math.sin(rad / 2)

		let axis: vec3

		if (s > Common.EPSILON) {
			axis = [q[0] / s, q[1] / s, q[2] / s]
		} else {
			// If s is zero, return any axis (no rotation - axis does not matter)
			axis = [1, 0, 0]
		}
		return {axis, deg: rad * Common.RAD2DEG}
	}

	/**
	 * Gets the angular distance between two unit quaternions
	 *
	 * @param  a     Origin unit quaternion
	 * @param  b     Destination unit quaternion
	 * @return  Angle, in degrees, between the two quaternions
	 */
	export function angle(a: quat, b: quat): number {
		const dotproduct = dot(a, b)

		return Math.acos(2 * dotproduct * dotproduct - 1)
	}

	/**
	 * Multiplies given quat's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 *
	 * @shortands
	 * - {@link mul}
	 */
	export function multiply(...qs: quat[]): quat {
		if (qs.length === 0) {
			return identity
		} else if (qs.length === 1) {
			return qs[0]
		} else if (qs.length > 2) {
			const [a, b, ...rest] = qs
			return multiply(multiply(a, b), ...rest)
		}

		const [ax, ay, az, aw] = qs[0]
		const [bx, by, bz, bw] = qs[1]

		return [
			ax * bw + aw * bx + ay * bz - az * by,
			ay * bw + aw * by + az * bx - ax * bz,
			az * bw + aw * bz + ax * by - ay * bx,
			aw * bw - ax * bx - ay * by - az * bz,
		]
	}

	/**
	 * Alias for {@link multiply}
	 * @category Shorthands
	 */
	export const mul = multiply

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param a quat to rotate
	 * @param deg angle to rotate, in degrees
	 */
	export function rotateX(a: quat, deg: number): quat {
		deg *= 0.5

		const ax = a[0],
			ay = a[1],
			az = a[2],
			aw = a[3]
		const bx = Math.sin(deg * Common.DEG2RAD),
			bw = Math.cos(deg * Common.DEG2RAD)

		return [
			ax * bw + aw * bx,
			ay * bw + az * bx,
			az * bw - ay * bx,
			aw * bw - ax * bx,
		]
	}

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param a quat to rotate
	 * @param deg angle to rotate, in degrees
	 */
	export function rotateY(a: quat, deg: number): quat {
		const rad = deg * Common.DEG2RAD * 0.5

		const ax = a[0],
			ay = a[1],
			az = a[2],
			aw = a[3]
		const by = Math.sin(rad),
			bw = Math.cos(rad)

		return [
			ax * bw - az * by,
			ay * bw + aw * by,
			az * bw + ax * by,
			aw * bw - ay * by,
		]
	}

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param a quat to rotate
	 * @param deg angle (in degrees) to rotate
	 */
	export function rotateZ(a: quat, deg: number): quat {
		const rad = deg * Common.DEG2RAD * 0.5

		const ax = a[0]
		const ay = a[1]
		const az = a[2]
		const aw = a[3]

		const bz = Math.sin(rad)
		const bw = Math.cos(rad)

		return [
			ax * bw + ay * bz,
			ay * bw - ax * bz,
			az * bw + aw * bz,
			aw * bw - az * bz,
		]
	}

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 */
	export function calculateW(q: quat): quat {
		const [x, y, z] = q

		return [x, y, z, Math.sqrt(Math.abs(1 - x * x - y * y - z * z))]
	}

	/**
	 * Calculate the exponential of a unit quaternion.
	 */
	export function exp(q: quat): quat {
		const [x, y, z, w] = q

		const r = Math.hypot(x, y, z)
		const et = Math.exp(w)
		const s = r > 0 ? (et * Math.sin(r)) / r : 0

		return [x * s, y * s, z * s, et * Math.cos(r)]
	}

	/**
	 * Calculate the natural logarithm of a unit quaternion.
	 */
	export function ln(a: quat): quat {
		const [x, y, z, w] = a

		const r = Math.hypot(x, y, z)
		const t = r > 0 ? Math.atan2(r, w) / r : 0

		return [x * t, y * t, z * t, 0.5 * Math.log(x * x + y * y + z * z + w * w)]
	}

	/**
	 * Calculate the scalar power of a unit quaternion.
	 */
	export function pow(a: quat, b: number): quat {
		return exp(scale(ln(a), b))
	}

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount, in the range [0-1], between the two inputs
	 */
	export function slerp(a: quat, b: quat, t: number): quat {
		// benchmarks:
		//    http://jsperf.com/quaternion-slerp-implementations
		const [ax, ay, az, aw] = a
		let [bx, by, bz, bw] = b

		let omega, cosom, sinom, scale0, scale1

		// calc cosine
		cosom = ax * bx + ay * by + az * bz + aw * bw
		// adjust signs (if necessary)
		if (cosom < 0) {
			cosom *= -1
			bx *= -1
			by *= -1
			bz *= -1
			bw *= -1
		}
		// calculate coefficients
		if (1 - cosom > Common.EPSILON) {
			// standard case (slerp)
			omega = Math.acos(cosom)
			sinom = Math.sin(omega)
			scale0 = Math.sin((1 - t) * omega) / sinom
			scale1 = Math.sin(t * omega) / sinom
		} else {
			// "from" and "to" quaternions are very close
			//  ... so we can do a linear interpolation
			scale0 = 1 - t
			scale1 = t
		}
		// calculate final values
		return [
			scale0 * ax + scale1 * bx,
			scale0 * ay + scale1 * by,
			scale0 * az + scale1 * bz,
			scale0 * aw + scale1 * bw,
		]
	}

	/**
	 * Calculates the inverse of a quat
	 */
	export function invert(q: quat): quat {
		const [q0, q1, q2, q3] = q
		const dot = q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3
		const invDot = dot ? 1 / dot : 0

		// TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
		return [-q0 * invDot, -q1 * invDot, -q2 * invDot, q3 * invDot]
	}

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 */
	export function conjugate(a: quat): quat {
		return [-a[0], -a[1], -a[2], a[3]]
	}

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 * @category Generators
	 */
	export function fromMat3(m: mat3): quat {
		// Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
		// article "Quaternion Calculus and Fast Animation".
		const fTrace = m[0] + m[4] + m[8]
		let fRoot
		const out: Mutable = [0, 0, 0, 0]

		if (fTrace > 0) {
			// |w| > 1/2, may as well choose w > 1/2
			fRoot = Math.sqrt(fTrace + 1) // 2w
			out[3] = 0.5 * fRoot
			fRoot = 0.5 / fRoot // 1/(4w)
			out[0] = (m[5] - m[7]) * fRoot
			out[1] = (m[6] - m[2]) * fRoot
			out[2] = (m[1] - m[3]) * fRoot
		} else {
			// |w| <= 1/2
			let i = 0
			if (m[4] > m[0]) i = 1
			if (m[8] > m[i * 3 + i]) i = 2
			const j = (i + 1) % 3
			const k = (i + 2) % 3

			fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1)
			out[i] = 0.5 * fRoot
			fRoot = 0.5 / fRoot
			out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot
			out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot
			out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot
		}

		return out
	}

	/**
	 * Creates a quaternion from the given 4x4 affine matrix. The translation portion of the matrix is ignored. Same as mat4. Alias for {@link mat4.getRotation}.
	 */
	export const fromMat4 = mat4.getRotation

	/**
	 * Creates a quaternion from a normalized direction vector and an up vector.
	 * Equivalent to GLM's `glm::quatLookAt`.
	 *
	 * @param direction Normalized direction vector (forward)
	 * @param up Up vector, default is vec3.unitY
	 * @category Generators
	 */
	export function lookAt(
		direction: vec3,
		up: vec3 = vec3.unitY
	): quat {
		const right = vec3.normalize(vec3.cross(up, direction))
		const correctedUp = vec3.cross(direction, right)

		const m: mat3 = [
			right[0],
			correctedUp[0],
			direction[0],
			right[1],
			correctedUp[1],
			direction[1],
			right[2],
			correctedUp[2],
			direction[2],
		]

		return normalize(fromMat3(m))
	}

	/**
	 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
	 *
	 * @param deg Angles to rotate around X, Y, Z axes in degree.
	 * @param order Intrinsic order for conversion, default is zyx.
	 * @category Generators
	 */
	export function fromEuler(deg: vec3, order = Common.DEFAULT_ANGLE_ORDER) {
		const [xDeg, yDeg, zDeg] = deg

		const halfToRad = Common.DEG2RAD * 0.5
		const xRad = xDeg * halfToRad
		const yRad = yDeg * halfToRad
		const zRad = zDeg * halfToRad

		const sx = Math.sin(xRad)
		const cx = Math.cos(xRad)
		const sy = Math.sin(yRad)
		const cy = Math.cos(yRad)
		const sz = Math.sin(zRad)
		const cz = Math.cos(zRad)

		switch (order) {
			case 'xyz':
				return [
					sx * cy * cz + cx * sy * sz,
					cx * sy * cz - sx * cy * sz,
					cx * cy * sz + sx * sy * cz,
					cx * cy * cz - sx * sy * sz,
				]

			case 'xzy':
				return [
					sx * cy * cz - cx * sy * sz,
					cx * sy * cz - sx * cy * sz,
					cx * cy * sz + sx * sy * cz,
					cx * cy * cz + sx * sy * sz,
				]

			case 'yxz':
				return [
					sx * cy * cz + cx * sy * sz,
					cx * sy * cz - sx * cy * sz,
					cx * cy * sz - sx * sy * cz,
					cx * cy * cz + sx * sy * sz,
				]

			case 'yzx':
				return [
					sx * cy * cz + cx * sy * sz,
					cx * sy * cz + sx * cy * sz,
					cx * cy * sz - sx * sy * cz,
					cx * cy * cz - sx * sy * sz,
				]

			case 'zxy':
				return [
					sx * cy * cz - cx * sy * sz,
					cx * sy * cz + sx * cy * sz,
					cx * cy * sz + sx * sy * cz,
					cx * cy * cz - sx * sy * sz,
				]

			case 'zyx':
				return [
					sx * cy * cz - cx * sy * sz,
					cx * sy * cz + sx * cy * sz,
					cx * cy * sz - sx * sy * cz,
					cx * cy * cz + sx * sy * sz,
				]
		}
	}

	/**
	 * Extracts Euler angles from a quaternion. This is the inverse of {@link fromEuler}.
	 * Equivalent to GLM's `glm::eulerAngles`.
	 *
	 * @param q The quaternion to extract Euler angles from
	 * @param order Intrinsic order for conversion, default is zyx
	 * @returns Euler angles in degrees as vec3 [x, y, z]
	 */
	export function toEuler(
		q: quat,
		order = Common.DEFAULT_ANGLE_ORDER
	): vec3 {
		const [x, y, z, w] = q

		const x2 = x * x
		const y2 = y * y
		const z2 = z * z
		const w2 = w * w

		// Rotation matrix elements from quaternion
		const m00 = w2 + x2 - y2 - z2
		const m01 = 2 * (x * y - w * z)
		const m02 = 2 * (x * z + w * y)
		const m10 = 2 * (x * y + w * z)
		const m11 = w2 - x2 + y2 - z2
		const m12 = 2 * (y * z - w * x)
		const m20 = 2 * (x * z - w * y)
		const m21 = 2 * (y * z + w * x)
		const m22 = w2 - x2 - y2 + z2

		const GIMBAL = 0.9999999

		let ex: number, ey: number, ez: number

		switch (order) {
			case 'zyx': {
				const sinP = -m20
				if (Math.abs(sinP) >= GIMBAL) {
					ex = 0
					ey = Math.sign(sinP) * (Math.PI / 2)
					ez = Math.atan2(-m01, m11)
				} else {
					ex = Math.atan2(m21, m22)
					ey = Math.asin(sinP)
					ez = Math.atan2(m10, m00)
				}
				break
			}
			case 'xyz': {
				const sinP = m02
				if (Math.abs(sinP) >= GIMBAL) {
					ex = Math.atan2(m21, m11)
					ey = Math.sign(sinP) * (Math.PI / 2)
					ez = 0
				} else {
					ex = Math.atan2(-m12, m22)
					ey = Math.asin(sinP)
					ez = Math.atan2(-m01, m00)
				}
				break
			}
			case 'yxz': {
				const sinP = -m12
				if (Math.abs(sinP) >= GIMBAL) {
					ex = Math.sign(sinP) * (Math.PI / 2)
					ey = Math.atan2(-m20, m00)
					ez = 0
				} else {
					ex = Math.asin(sinP)
					ey = Math.atan2(m02, m22)
					ez = Math.atan2(m10, m11)
				}
				break
			}
			case 'yzx': {
				const sinP = m10
				if (Math.abs(sinP) >= GIMBAL) {
					ex = 0
					ey = Math.atan2(m02, m22)
					ez = Math.sign(sinP) * (Math.PI / 2)
				} else {
					ex = Math.atan2(-m12, m11)
					ey = Math.atan2(-m20, m00)
					ez = Math.asin(sinP)
				}
				break
			}
			case 'zxy': {
				const sinP = m21
				if (Math.abs(sinP) >= GIMBAL) {
					ex = Math.sign(sinP) * (Math.PI / 2)
					ey = 0
					ez = Math.atan2(m10, m00)
				} else {
					ex = Math.asin(sinP)
					ey = Math.atan2(-m20, m22)
					ez = Math.atan2(-m01, m11)
				}
				break
			}
			case 'xzy': {
				const sinP = -m01
				if (Math.abs(sinP) >= GIMBAL) {
					ex = Math.atan2(-m12, m22)
					ey = 0
					ez = Math.sign(sinP) * (Math.PI / 2)
				} else {
					ex = Math.atan2(m21, m11)
					ey = Math.atan2(m02, m00)
					ez = Math.asin(sinP)
				}
				break
			}
		}

		return [
			ex * Common.RAD2DEG,
			ey * Common.RAD2DEG,
			ez * Common.RAD2DEG,
		]
	}

	/**
	 * Performs a normalized linear interpolation (nlerp) between two quaternions.
	 * Faster than {@link slerp} and sufficient for small rotation differences.
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount, in the range [0-1], between the two inputs
	 */
	export function lerp(a: quat, b: quat, t: number): quat {
		let [bx, by, bz, bw] = b
		if (dot(a, b) < 0) {
			bx = -bx
			by = -by
			bz = -bz
			bw = -bw
		}
		return normalize([
			a[0] + (bx - a[0]) * t,
			a[1] + (by - a[1]) * t,
			a[2] + (bz - a[2]) * t,
			a[3] + (bw - a[3]) * t,
		])
	}

	/**
	 * Adds given quat's
	 */
	export const add: (a: quat, b: quat) => quat = vec4.add

	/**
	 * Scales a quat by a scalar number
	 */
	export const scale: (a: quat, b: number) => quat = vec4.scale

	/**
	 * Calculates the dot product of two quat's
	 */
	export const dot: (a: quat, b: quat) => number = vec4.dot

	/**
	 * Calculates the length of a quat
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 *
	 * @shorthands
	 * - {@link len}
	 */
	export const length = vec4.length

	/**
	 * Alias for {@link length}
	 * @category Shorthands
	 */
	export const len = length

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 *
	 * @shorthands
	 * - {@link sqrLen}
	 */
	export const squaredLength = vec4.squaredLength

	/**
	 * Alias for {@link squaredLength}
	 * @category Shorthands
	 */
	export const sqrLen = squaredLength

	/**
	 * Normalize a quat
	 *
	 * @param a quaternion to normalize
	 */
	export const normalize = vec4.normalize

	/**
	 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with `===`)
	 *
	 * @shorthands
	 * - {@link eq}
	 */
	export const exactEquals = vec4.exactEquals

	/**
	 * Alias for {@link exactEquals}
	 * @category Shorthands
	 */
	export const eq = exactEquals

	/**
	 * Returns whether or not the quaternions point approximately to the same direction. Both quaternions are assumed to be unit length.
	 *
	 * @shorthands
	 * - {@link approx}
	 * - {@link equals}
	 */
	export function approxEquals(a: quat, b: quat) {
		return Math.abs(vec4.dot(a, b)) >= 1 - Common.EPSILON
	}

	/**
	 * Alias for {@link approxEquals}
	 * @category Shorthands
	 */
	export const approx = approxEquals

	/**
	 * Alias for {@link approxEquals}. This is provided for compatibility with gl-matrix.
	 * @category Shorthands
	 * @deprecated Use {@link approxEquals} instead
	 */
	export const equals = approxEquals
	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param a the initial vector
	 * @param b the destination vector
	 * @category Generators
	 */
	export const rotationTo = (function () {
		return (a: vec3, b: vec3): quat => {
			const dot = vec3.dot(a, b)

			if (dot > 1 - Common.EPSILON) {
				return [...identity]
			} else if (dot < -1 + Common.EPSILON) {
				let temp = vec3.cross(vec3.unitX, a)

				if (vec3.length(temp) < 0.000001) {
					temp = vec3.cross(vec3.unitY, a)
				}

				temp = vec3.normalize(temp)

				return fromAxisAngle(temp, Math.PI)
			} else {
				const tmp = vec3.cross(a, b)

				const out: quat = [tmp[0], tmp[1], tmp[2], 1 + dot]

				return normalize(out)
			}
		}
	})()

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @param c the third operand
	 * @param d the fourth operand
	 * @param t interpolation amount, in the range [0-1], between the two inputs
	 */
	export function sqlerp(a: quat, b: quat, c: quat, d: quat, t: number): quat {
		const temp1 = slerp(a, d, t)
		const temp2 = slerp(b, c, t)
		return slerp(temp1, temp2, 2 * t * (1 - t))
	}

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param view  the vector representing the viewing direction
	 * @param right the vector representing the local "right" direction
	 * @param up    the vector representing the local "up" direction
	 */
	export function setAxes(view: vec3, right: vec3, up: vec3): quat {
		const matr: mat3 = [
			right[0],
			up[0],
			-view[0],
			right[1],
			up[1],
			-view[1],
			right[2],
			up[2],
			-view[2],
		]

		return normalize(fromMat3(matr))
	}
}
