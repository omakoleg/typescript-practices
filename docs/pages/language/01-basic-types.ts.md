Classes will not be included here

Try to use functional approaches always.
Your code should not have `class` definitions, believe you don't need them.

# Any

Could be disabled by compiler flag `--noImplicitAny`

```ts
const anyValue: any = {};
```

# Unknown

Better not to use it explicitly

Recently was added as a type for an error is `catch`

```ts
const maybe: unknown = {};

const maybeSomething = {} as unknown;

try {
  throw 42;
} catch (err: unknown) {}
```

# Void

Usually used to define that function do not return any value

```ts
function none(): void {}
function log(line: string): void {
  console.log(line);
}
```

# String

```ts
const str: string = "1"; // '111'
const strTwo: string = `123`;
```

# Boolean

```ts
const yes: boolean = true;
```

# Symbol

Always unique, in practice `enum` is more adopted

```ts
let sym1 = Symbol("something");
let symbolYes1 = Symbol("yes");
let symbolYes2 = Symbol("yes");
```

symbolYes1 === symbolYes2 // false

# Numeric

```ts
let num: number = 6;
```

Could have "\_" separators to increase readability

```ts
let readableNumber: number = 5_000_000_000;
```

Could be defined directly with oct/bin/hex literals

```ts
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

Available starting from `ES2020` (`tsconfig.json "target": "es2020"`)

```ts
let big: bigint = 10000000000000000000000000000n;
```

# Arrays

Could be defined by `[]` or `Array` generic

```ts
const array: any[] = ["a", "b"];
const anotherArray: Array<number> = [1, 2];
```

2 levels array definition

```ts
const arrayComplex: string[][] = [
  ["a", "b"],
  ["c", "d"],
];
```

Arrays could mix different types. This is not very practical

```ts
const mixedArray: (number | string | boolean)[] = [1, "2", true];
const strangeArray: (number | number[])[] = [1, [1]];
```

# Tuple

Do not confuse with `Array`

```ts
const sampleTuple: [string, number, boolean] = ["a", 1, true];
```

# Enum

Without explicit values provided. This will by default apply numbers sequence starting from `0` in transpiled javascript code

```ts
enum Status {
  OK,
  FAILURE,
}
const myStatus: Status = Status.OK;
```

With explicit values

```ts
enum Counter {
  ONE = "a",
  TWO = "b",
  THREE = "c",
}
const myNumber: Counter = Counter.TWO;
```

# Undefined, null

Undefined is usually used to define implicitly that nothing is there, it is empty, not defined

Pure undefined

```ts
let undef: undefined;
const data1: undefined = [].find((x) => x > 0);
```

To represent "maybe" case, when value possibly is not set

```ts
const data2: undefined | number = [1].find((x) => x > 0);
```

Usually is used for explicit "not set" but better to use `undefined`

```ts
let _null: null = null;
```

# Never

Used in functions that will definitely not return

```ts
function explode(): never {
  throw new Error("bam");
}
```

# Object

Everything else except number, string, boolean, symbol, null, or undefined

Generally, you won’t need to use this.

`Object` type is like `any` amongst objects

```ts
const data3: Object = {};
```

# Function

Please do not use `Function` type explicitly, it is like `any` amongst functions

```ts
const func: Function = () => 1;
```
