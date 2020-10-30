# Modules

Starting with ECMAScript 2015, JavaScript has a concept of modules. TypeScript shares this concept.

`file.ts`

```ts
export const Test: string = "abc";
export const Test2: string = "abc";
export function TestFunction() {}
export const constFunction = () => {};
export class Dummy {}
export type Test = string;
```

`index.ts`

```ts
import { Test, Test2, constFunction, TestFunction, Dummy, Test } from "./file";
```

Import with namespace alias including all exported members under one name

```ts
import * as file from "./file";
// file.Test
// file.Test2
// file.constFunction()
```

As alternative classical `require` is the same:

```ts
const file = require("./file");
```

_`require` notation is not flexible and `import` is preferable_

Import value and change imported name

```ts
import { Test as MyTest, Test2 as MyTest2 } from "./file";
```

Name of the exported member could be changed:

```ts
const abc: string = 100;
export abc as otherName
// later
import { otherName } from './'
```

## Default exports

Default exports used when module should provide one value by default, and possibly multiple others.

Using of default exports is not recommended due to not fixed naming on importing side.
Also when changes in default exported member happened, all importing code will be affected

```ts
// exp.ts
interface MyType {
  a: number;
}
const myValue = {
  a: 10,
};
export default myValue;
// tmp.ts
import myAnotherValue from "./exp";
```

Better to use named exports

```ts
export interface MyType {
  a: number;
}
export const myValue = {
  a: 10,
};
// later
import { MyType, myValue } from "./exp";
```

Combine namespaces and destructuring

```ts
import * as myFullModule, {MyType, myValue} from './exp'
```

There are much more ro read about import/export in [docs](https://www.typescriptlang.org/docs/handbook/modules.html)

Many parts there are used for compatibility with javascript commonjs and AMD modules and could be tweaked by tsc options.
