# Linearly

[![NPM Version](https://img.shields.io/npm/v/linearly.svg)](https://www.npmjs.com/package/linearly)
![CI Test Result](https://github.com/baku89/linearly/actions/workflows/ci.yml/badge.svg)

A Collection of utility functions that relates to linear algebra and graphics programming.

This library is based on [glMatrix](https://github.com/toji/gl-matrix), but adopts immutable data structure.

🍡 I'd be appreciate to receive PRs from anyone willing to help with tedious tasks like writing JSDoc, adding necessary functions, or writing tests.

```js
// In glMatrix, you have to manually pass an output vector by reference to reuse  vectors in efficient way.
const dir = vec3.fromValues(2, 1, 3)
vec3.normalize(dir, dir)

const out = vec3.create()
vec3.cross(out, dir, [0, 1, 0])
vec2.scale(out, out, 3)
```

```js
// In linearly, you can simply write like this:
import {mat2d, type Mat2d, vec3} from 'linearly'

const dir = vec3.normalize([2, 1, 3])
let out = vec3.cross(dir, [0, 1, 0])
out = vec3.scale(out, 3)

// Vector and matrix types are annotated with readonly flags in TypeScript,
// and some constants are defined as frozen array (applied Object.freeze).
// You can use `clone` if you want to mutate the elements of values.
const m: Mat2d = mat2d.clone(mat2d.ident)
m[4] *= 2.0
m[5] = -4.5
```

In addition to functions that can be found on [glMatrix docs](https://glmatrix.net/), the library also provides some useful functions from languages like [GLSL](https://registry.khronos.org/OpenGL-Refpages/gl4/html/indexflat.php) (`step`, `mix` `smoothstep`), Houdini's [VEX](https://www.sidefx.com/docs/houdini/vex/functions/) (`fit`, `efit`, `invlerp`, `degrees`, `radians`), and even Unity C# (`inverseLerp`).

## Modules

The names of modules are derived from glMatrix.

- `mat2`: 2D linear transformation (rotation + scale + skew)
- `mat2d`: 2D affine transformation, omitting redundant third rows which is always set to `[0, 0, 1]` (translation + rotation + scale + skew)
- `mat3`: 2D homogeneous transformation (translation + rotation + scale + skew + perspective)
- `mat4`: 3D affine transformation
- `quat`: 3D rotation

See the [Full API documentation](https://baku89.github.io/linearly) for further informations.

## Development

```
git clone https://github.com/baku89/lnearly
cd linearly
yarn install
yarn test --watch
```

## LICENSE

This repository is published under an MIT License. See the included [LICENSE file](./LICENSE).
