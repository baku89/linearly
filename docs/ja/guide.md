# はじめに

## インストール

```sh
npm install linearly
```

```ts
import {vec2, vec3, mat2d, mat4, scalar} from 'linearly'
```

## 設計思想

### イミュータブルなデータ型

すべてのベクトルと行列は、readonlyなプレーンな配列です。直接中身を変更することはできません。

```ts
// vec2の例: 足し算とスカラー倍（イミュータブル）
const a = [1, 2] as const
const b = [4, 6] as const

const c = vec2.add(a, b) // [5, 8]
const d = vec2.mul(c, 2) // [10, 16]

// a, b, cは変更されません。すべての関数は新しい配列を返します
console.log(a) // [1, 2]
console.log(b) // [4, 6]
console.log(c) // [5, 8]
console.log(d) // [10, 16]

a[0] = 3
// ^  TypeScriptでは、aはreadonlyなので型エラーになります
```

`mat2d.ident`のようなビルトインの定数は`Object.freeze`で凍結されています。変更可能なコピーが欲しい場合は`clone`を使ってください。

```ts
const m = mat2d.clone(mat2d.ident)
m[4] = 10 // OK: mはミュータブル
```

### ラジアンではなく度数法

角度のパラメーターはすべて**度数法（degrees）**です。`scalar`、`vec2`、`vec3`の三角関数も度数法を期待します。

```ts
mat2d.rotation(45) // 45度。π/4ではない

scalar.cos(90) // 0
scalar.sin(180) // 0

// 逆に、vec2.angle()やscalar.atan2()の返り値も度数法です
vec2.angle([0, 1]) // 90
scalar.atan2(1, 0) // 90
```

ラジアンと度数法を変換したい場合は`scalar.rad`と`scalar.deg`を使ってください。

```ts
scalar.rad(180) // → Math.PI
scalar.deg(Math.PI) // → 180
```

## 行列のレイアウト

Linearlyは[glMatrix](https://glmatrix.net/docs/)やWebGLと同じ規約に従っていて、行列は**列優先（column-major）**で格納されます。

`mat4`の場合:

```
[xx, xy, xz, 0,
 yx, yy, yz, 0,
 zx, zy, zz, 0,
 tx, ty, tz, 1]
```

平行移動成分（`tx`, `ty`, `tz`）はインデックス12, 13, 14にあります。glMatrixやOpenGLと同じ配置ですね。

`mat2d`（2Dアフィン変換。常に`[0, 0, 1]`となる冗長な第3列を省略したもの）の場合:

```
[a,  b,
 c,  d,
 tx, ty]
```
