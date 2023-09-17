# Linearly

[![NPM Version](https://img.shields.io/npm/v/linearly.svg)](https://www.npmjs.com/package/linearly)
![CI Test Result](https://github.com/baku89/linearly/actions/workflows/ci.yml/badge.svg)

[glMatrix](https://github.com/toji/gl-matrix)-like library but using immutable data structure.

```js
// in gl-Matrix
const dir = vec3.fromValues(2, 1, 3)
vec3.normalize(dir, dir)

const out = vec3.create()
vec3.cross(out, dir, [0, 1, 0])
vec2.scale(out, out, 3)

// in linearly, you can simply write like this:
const dir = vec3.normalize([2, 1, 3])
let out = vec3.cross(dir, [0, 1, 0])
out = vec3.scale(out, 3)
```

## Development

```
git clone https://github.com/baku89/lnearly
cd linearly
yarn install
yarn test --watch
```

## LICENSE

This repository is published under an MIT License. See the included [LICENSE file](./LICENSE).
