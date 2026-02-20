---
home: true
heroImage: /logo.svg
heroHeight: 160
actions:
  - text: API →
    link: /api/

features:
  - title: イミュータブルなデータ構造
    details: すべてのデータ型はイミュータブルかつreadonlyです。
  - title: TypeScriptフレンドリー
    details: ライブラリ全体が型付けされており、TypeScriptとの相性が良いです。
  - title: さまざまな環境との互換性
    details: APIはglMatrix、GLSL、Unity、HoudiniのVexのスーパーセットになっています。
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

Linearlyは、線形代数やグラフィックスプログラミングに関わるユーティリティ関数を集めたライブラリです。[glMatrix](https://github.com/toji/gl-matrix)に強くインスパイアされていますが、関数型プログラミングのスタイルとイミュータブルなデータ構造を採用しています。

```ts
import {mat2d, vec3} from 'linearly'

// glMatrixと違って、第一引数にレシーバーとなる行列を渡す必要がありません
const p0 = vec2.add([1, 2], [3, 4])
const p1 = vec2.transformMat2d(p0, mat2d.fromRotation(scalar.rad(45)))

const dir = vec3.normalize([2, 1, 3])
const right = vec3.cross(dir, [0, 1, 0])
const c = vec3.scale(right, 3)

// Linearlyの値はただの1次元配列なので、
// ベクトルの初期化はどちらの方法でもOKです
const a: vec2 = [1, 2]
const b = vec2.of(1, 2)

// ただし、ベクトルや行列はイミュータブルで
// readonlyフラグがついているので、
// 以下のような代入はTypeScript上でエラーになります
a[0] = 3
// ^
// Cannot assign to '0' because it is a read-only property.

// mat2d.identのような定数もreadonlyで、
// Object.freezeされた配列として定義されています。
// 変更したい場合は `clone` を使ってください
const m = mat2d.clone(mat2d.ident)
m[4] *= 2.0
m[5] = -4.5
```

このライブラリの関数は、以下のライブラリの影響下にあります。実際、使える関数も共通しています：

- [glMatrix](https://glmatrix.net/) - `add`, `subtract`, `scale`, `normalize`, `dot`, `cross`, `lerp`, `distance`, `transformMat*`
- [GLSL](https://registry.khronos.org/OpenGL-Refpages/gl4/html/indexflat.php) - `step`, `mix`, `smoothstep`, `reflect`, `refract`, `faceforward`
- [HoudiniのVex言語](https://www.sidefx.com/docs/houdini/vex/functions/) - `fit`, `efit`, `invlerp`, `degrees`, `radians`
- [Unity](https://docs.unity3d.com/Manual/index.html) - `inverseLerp`, `oneMinus`, `saturate`

## モジュール

モジュール名はglMatrixに由来しています。

- [scalar](../api/modules/scalar): スカラー値（単一の数値）
- [vec2](../api/modules/vec2): 2Dベクトル
- [vec3](../api/modules/vec3): 3Dベクトル
- [vec4](../api/modules/vec4): 4Dベクトル
- [mat2](../api/modules/mat2): 2D線形変換（回転、拡大縮小、せん断）
- [mat2d](../api/modules/mat2d): 2Dアフィン変換。常に `[0, 0, 1]` となる冗長な第3行を省略したもの（平行移動、回転、拡大縮小、せん断）
- [mat3](../api/modules/mat3): 2Dアフィン変換（平行移動、回転、拡大縮小、せん断）
- [mat4](../api/modules/mat4): 3D変換
- [quat](../api/modules/quat): 3D回転
