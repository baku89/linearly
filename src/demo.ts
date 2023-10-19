import {vec2} from '.'

const x: vec2 = vec2.add([1, 2], [3, 4])

const y = vec2.clone(x)

y[0] = 3
