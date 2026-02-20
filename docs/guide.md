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
// vec2 example: add and scale (immutable)
const a = [1, 2] as const
const b = [4, 6] as const

const c = vec2.add(a, b) // [5, 8]
const d = vec2.mul(c, 2) // [10, 16]

// a, b, and c are unchanged; all functions return new arrays
console.log(a) // [1, 2]
console.log(b) // [4, 6]
console.log(c) // [5, 8]
console.log(d) // [10, 16]

a[0] = 3
// ^  In TypeScript, this will cause a type error because a is readonly
```

Built-in constants like `mat2d.ident` are frozen via `Object.freeze`. Use `clone` to create a mutable copy.

```ts
const m = mat2d.clone(mat2d.ident)
m[4] = 10 // OK: m is Mutable
```

### Degrees, Not Radians

All angle parameters are in **degrees**. The trigonometric functions in `scalar`, `vec2`, and `vec3` also expect degrees.

```ts
mat2d.rotation(45) // 45 degrees, not π/4

scalar.cos(90) // 0
scalar.sin(180) // 0

// Conversely, returned values from functions like vec2.angle() or scalar.atan2() are also in degrees.
vec2.angle([0, 1]) // 90
scalar.atan2(1, 0) // 90
```

Use `scalar.rad` and `scalar.deg` if you need to convert between radians and degrees.

```ts
scalar.rad(180) // → Math.PI
scalar.deg(Math.PI) // → 180
```

## Matrix Layout

Linearly follows the same conventions as [glMatrix](https://glmatrix.net/docs/) and WebGL: matrices are stored in **column-major** order.

For a `mat4`:

```
[xx, xy, xz, 0,
 yx, yy, yz, 0,
 zx, zy, zz, 0,
 tx, ty, tz, 1]
```

The translation components (`tx`, `ty`, `tz`) are at indices 12, 13, 14 — the same as in glMatrix and OpenGL.

For a `mat2d` (2D affine transform, omitting the redundant third column `[0, 0, 1]`):

```
[a,  b,
 c,  d,
 tx, ty]
```
