---
home: true
heroImage: /logo.svg
heroHeight: 160
actions:
  - text: API →
    link: /api/

features:
  - title: Immutable Data Structure
    details: All data types are immutable and readonly.
  - title: TypeScript-friendly
    details: The library is fully typed and compatible with TypeScript.
  - title: Compatibility with various environments
    details: The API is a superset of glMatrix, GLSL, Unity, and Vex in Houdini.
---

<div class="badges">
	<p>
		<a href="https://www.npmjs.org/package/linearly">
			<img src="https://img.shields.io/npm/v/linearly.svg?style=flat-square" alt="npm version">
		</a>
		&nbsp;
		<a href="http://spdx.org/licenses/MIT">
			<img src="https://img.shields.io/npm/l/linearly.svg?style=flat-square" alt="npm license">
		</a>
		&nbsp;
		<img src="https://github.com/baku89/linearly/actions/workflows/ci.yml/badge.svg" alt="CI test result" />
	</p>
</div>

Linearly is a library providing a collection of utility functions related to linear algebra and graphics programming. It is deeply inspired by [glMatrix](https://github.com/toji/gl-matrix), but adopts a functional programming style and immutable data structures.

```ts
import {mat2d, vec3} from 'linearly'

// Unlike glMatrix, you don't need to specify a receiver matrix as the first argument.
const p0 = vec2.add([1, 2], [3, 4])
const p1 = vec2.transformMat2d(p0, mat2d.fromRotation(scalar.rad(45)))

const dir = vec3.normalize([2, 1, 3])
const right = vec3.cross(dir, [0, 1, 0])
const c = vec3.scale(right, 3)

// As the values of Linearly are plain 1D arrays,
// you can initialize a vector either way.
const a: vec2 = [1, 2]
const b = vec2.of(1, 2)

// But since vectors and matrices are immutable
// and annotated with readonly flags,
// a mutation such as below is handled as an error in TypeScript.
a[0] = 3
// ^
// Cannot assign to '0' because it is a read-only property.

// Some constants such as mat2d.ident are also readonly
// and defined as frozen arrays (via Object.freeze).
// You can use `clone` to mutate them.
const m = mat2d.clone(mat2d.ident)
m[4] *= 2.0
m[5] = -4.5
```

The library provides functions inspired by the following sources:

- [glMatrix](https://glmatrix.net/) - `add`, `subtract`, `scale`, `normalize`, `dot`, `cross`, `lerp`, `distance`, `transformMat*`
- [GLSL](https://registry.khronos.org/OpenGL-Refpages/gl4/html/indexflat.php) - `step`, `mix`, `smoothstep`, `reflect`, `refract`, `faceforward`
- [Vex in Houdini](https://www.sidefx.com/docs/houdini/vex/functions/) - `fit`, `efit`, `invlerp`, `degrees`, `radians`
- [Unity](https://docs.unity3d.com/Manual/index.html) - `inverseLerp`, `oneMinus`, `saturate`

## Modules

The names of modules are derived from glMatrix.

- [scalar](./api/modules/scalar): A single number
- [vec2](./api/modules/vec2): 2D vector
- [vec3](./api/modules/vec3): 3D vector
- [vec4](./api/modules/vec4): 4D vector
- [mat2](./api/modules/mat2): 2D linear transformation (rotation, scaling, skewing)
- [mat2d](./api/modules/mat2d): 2D affine transformation, omitting redundant third rows, which is always set to `[0, 0, 1]` (translation, rotation, scaling, skewing)
- [mat3](./api/modules/mat3): 2D affine transformation (translation, rotation, scaling, skewing)
- [mat4](./api/modules/mat4): 3D transformation
- [quat](./api/modules/quat): 3D rotation
