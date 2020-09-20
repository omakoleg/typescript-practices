Used:

- when actual type is not important
- when solution should be reusable for some cases

Function Generics

reusable

```ts
function logSomething<TYPE, O>(data: TYPE, param: O): void {}
const logSomethingAgain = <TYPE>(data: TYPE): void => {};
```

pass-thru data

```ts
const handler = (data: any): void => {};
```

don't care what is inside

```ts
const wrapper = <T>(param: T) => {
  console.log("Start");
  handler(param);
  console.log("End");
};
```

Type / Interface Generics

type sample

```ts
type Optional<T> = T | undefined;
const maybeInt: Optional<number> = 1;
const maybeAnotherOne: Optional<number> = undefined;
```

interface sample

```ts
interface GenericTree<L> {
  value: L;
  left?: GenericTree<L>;
  right?: GenericTree<L>;
}
const stringTree: GenericTree<string> = {
  value: "h",
  left: {
    value: "b",
    right: {
      value: "c",
    },
  },
};
const numberTree: GenericTree<number> = {
  value: 10,
  left: {
    value: 3,
    right: {
      value: 8,
    },
  },
};
```

Multiple

```ts
type Converter<A, B> = (input: A) => B;

const toNumberConverter: Converter<string, number> = (input: string): number =>
  parseInt(input);

const toStringConverter: Converter<number, string> = (input: number): string =>
  input.toString(input);
```

Generics based on subtype

automatically understands array

```ts
const arrayMap = <A, B>(array: A[], func: (x: A) => B): B[] => array.map(func);
```

custom

```ts
interface Sizable {
  size: number;
}
const sumAllSizes = <T extends Sizable>(array: T[]): number =>
  array.reduce((p: number, c: T) => c.size, 0);
```

Generic out of another generic

```ts
const getProperty = <O, K extends keyof O>(obj: O, key: K): O[K] => obj[key];

const numberProp: number = getProperty({ a: 1 }, "a");
const stringProp: string = getProperty({ a: 1, b: "1" }, "b");
```

interface sample

```ts
interface Ids {
  id: number;
}
interface FakeDatabase<D extends Ids, K extends keyof D> {
  version: number;
  records: () => D[];
  save: (data: D) => boolean;
  getProperty: (id: number, prop: K) => D[K];
}
```
