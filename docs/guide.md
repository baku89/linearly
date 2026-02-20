# Getting Started

## Installation

```sh
npm install linearly
```

```ts
import {vec2, vec3, mat2d, mat4, scalar} from 'linearly'
```

## Design Principles

### Immutable Data Types

All vectors and matrices are plain readonly arrays. You cannot mutate them directly.

```ts
const a: vec2 = [1, 2]

a[0] = 3
// ^  Cannot assign to '0' because it is a read-only property.
```

Built-in constants like `mat2d.ident` are frozen via `Object.freeze`. Use `clone` to create a mutable copy.

```ts
const m = mat2d.clone(mat2d.ident)
m[4] = 10 // OK: m is Mutable
```

### Degrees, Not Radians

All angle parameters are in **degrees**. The trigonometric functions in `scalar`, `vec2`, and `vec3` also expect degrees.

```ts
mat2d.fromRotation(45) // 45 degrees, not π/4

scalar.cos(90)  // 0
scalar.sin(180) // 0
```

Use `scalar.rad` and `scalar.deg` if you need to convert between radians and degrees.

```ts
scalar.rad(180)       // → Math.PI
scalar.deg(Math.PI)   // → 180
```

## Matrix Layout

Linearly follows the same conventions as [glMatrix](https://glmatrix.net/docs/) and WebGL: matrices are stored in **column-major** order. When typed out as a flat array, it _looks_ like row-major, but each row in the code corresponds to a column in the mathematical notation.

For a `mat4`:

```
Code (flat array)              Math notation

[xx, xy, xz, 0,               xx  yx  zx  tx
 yx, yy, yz, 0,               xy  yy  zy  ty
 zx, zy, zz, 0,               xz  yz  zz  tz
 tx, ty, tz, 1]                0   0   0   1
```

The translation components (`tx`, `ty`, `tz`) are at indices 12, 13, 14 — the same as in glMatrix and OpenGL.

For a `mat2d` (2D affine transform, omitting the redundant third column `[0, 0, 1]`):

```
Code (flat array)              Math notation

[a,  b,                        a  c  tx
 c,  d,                        b  d  ty
 tx, ty]                       0  0  1
```
