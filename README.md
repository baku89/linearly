# Linearly

[![NPM Version](https://img.shields.io/npm/v/linearly.svg)](https://www.npmjs.com/package/linearly)
![CI Test Result](https://github.com/baku89/linearly/actions/workflows/ci.yml/badge.svg)
![MIT License](https://img.shields.io/npm/l/linearly.svg)

A collection of utility functions that relates to linear algebra and graphics programming.

🍡 I'd be appreciate to receive PRs from anyone willing to help with tedious tasks like writing JSDoc, adding necessary functions, or writing tests.

This library is based on [glMatrix](https://github.com/toji/gl-matrix), but adopts immutable data structure. So you don't need to specify a receiver matrix as the first argument.

### glMatrix

```js
// In glMatrix, you have to manually pass an output vector by reference to reuse allocated memory space efficiently.
const dir = vec3.fromValues(2, 1, 3)
vec3.normalize(dir, dir)

const out = vec3.create()
vec3.cross(out, dir, [0, 1, 0])
vec2.scale(out, out, 3)
```

### Linearly

```ts
// In linearly, you can simply write like this:
import {mat2d, type Mat2d, vec3} from 'linearly'

const dir = vec3.normalize([2, 1, 3])
let out = vec3.cross(dir, [0, 1, 0])
out = vec3.scale(out, 3)

// As the values of Linearly are plain 1D arrays, you can initialize a vector by either way.
const a: Vec2 = [1, 2]
const b = vec2.of(1, 2)

// But since vector and matrix are immutable and annotated with readonly flags, a mutation such as below are handled as an error in TypeScript.
a[0] = 3
// ^
// Cannot assign to '0' because it is a read-only property.

// Some constants such as mat2.identity are also readonly and defined as frozen array (applied Object.freeze). You can use `clone` to mutate them.
const m: Mat2d = mat2d.clone(mat2d.ident)
m[4] *= 2.0
m[5] = -4.5
```

In addition to functions that can be found on [glMatrix docs](https://glmatrix.net/), the library also provides some useful functions. For example:

- [GLSL](https://registry.khronos.org/OpenGL-Refpages/gl4/html/indexflat.php) - `step`, `mix`, `smoothstep`
- [Vex in Houdini](https://www.sidefx.com/docs/houdini/vex/functions/) - `fit`, `efit`, `invlerp`, `degrees`, `radians`
- [Unity](https://docs.unity3d.com/Manual/index.html) - `inverseLerp`, `oneMinus`

## Modules

The names of modules are derived from glMatrix.

- `scalar`: A single number
- `mat2`: 2D linear transformation (rotation + scale + skew)
- `mat2d`: 2D affine transformation, omitting redundant third rows, which is always set to `[0, 0, 1]` (translation + rotation + scale + skew)
- `mat3`: 2D homogeneous transformation (translation + rotation + scale + skew + perspective)
- `mat4`: 3D affine transformation
- `quat`: 3D rotation

See the [Full API documentation](https://baku89.github.io/linearly) for further information.

## Development

```
git clone https://github.com/baku89/lnearly
cd linearly
yarn install
yarn test --watch
```

## License

This repository is published under an MIT License. See the included [LICENSE file](./LICENSE).
