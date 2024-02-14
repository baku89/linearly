---
home: true
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

Linearly is a library providing a collection of utility functions that relates to linear algebra and graphics programming. It is deeply inspired by [glMatrix](https://github.com/toji/gl-matrix), but adopts functional programming manner and immutable data structure.

```ts
import {mat2d, vec3} from 'linearly'

// Unlike glMatrix, you don't need to specify a receiver matrix as the first argument.
const p0 = vec2.add([1, 2], [3, 4])
const p1 = vec2.transformMat2d(p0, mat2d.fromRotation(scalar.rad(45)))

const dir = vec3.normalize([2, 1, 3])
const b = vec3.cross(dir, [0, 1, 0])
const c = vec3.scale(out, 3)

// As the values of Linearly are plain 1D arrays,
// you can initialize a vector by either way.
const a: vec2 = [1, 2]
const b = vec2.of(1, 2)

// But since vector and matrix are immutable
// and annotated with readonly flags,
// a mutation such as below are handled as an error in TypeScript.
a[0] = 3
// ^
// Cannot assign to '0' because it is a read-only property.

// Some constants such as mat2.identity are also readonly
// and defined as frozen array (applied Object.freeze).
// You can use `clone` to mutate them.
const m = mat2d.clone(mat2d.ident)
m[4] *= 2.0
m[5] = -4.5
```

In addition to functions that can be found on [glMatrix docs](https://glmatrix.net/), the library also provides some useful functions. For example:

- [GLSL](https://registry.khronos.org/OpenGL-Refpages/gl4/html/indexflat.php) - `step`, `mix`, `smoothstep`
- [Vex in Houdini](https://www.sidefx.com/docs/houdini/vex/functions/) - `fit`, `efit`, `invlerp`, `degrees`, `radians`
- [Unity](https://docs.unity3d.com/Manual/index.html) - `inverseLerp`, `oneMinus`

## Modules

The names of modules are derived from glMatrix.

- [scalar](./api/modules/scalar): A single number
- [mat2](./api/modules/mat2): 2D linear transformation (rotation, scaling, skewing)
- [mat2d](./api/modules/mat2d): 2D affine transformation, omitting redundant third rows, which is always set to `[0, 0, 1]` (translation, rotation, scaling, skewing)
- [mat3](./api/modules/mat3): 2D affine transformation (translation, rotation, scaling, skewing)
- [mat4](./api/modules/mat4): 3D transformation
- [quat](./api/modules/quat): 3D rotation
