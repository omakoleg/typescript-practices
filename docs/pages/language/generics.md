# Cenerics

Usual use cases:

- when actual type is not important
- when solution should be reusable for some cases

## Function Generics

Placeholders `TYPE` and `O` could be named any way, preferable to have one capital letter.

Generic function type to be reusable

```ts
function logSomething<TYPE, O>(data: TYPE, param: O): void {}
const logSomethingAgain = <TYPE>(data: TYPE): void => {};
```

pass-thru generic function `wrapper`:

```ts
const handler = (data: any): void => {};
const wrapper = <T>(param: T) => {
  handler(param);
};
```

# Type Generic

Optional type defined this way

```ts
type Optional<T> = T | undefined;
type OptionalNumber = Optional<number>;
```

Could have 2 values

```ts
const maybeInt: OptionalNumber = 1;
const maybeAnotherOne: OptionalNumber = undefined;
```

# Interface Generic

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
console.log(stringTree);
console.log(numberTree);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgOIRNYCAqUIQA8AMgHzIDeAUMsgG5wA2ArhAFzLEDcNyjEMMAH4O6TFGx4CJUj1oSA5gAthojFlz4iZHgF8qCAPYgAzmGRmJIBVPZp1EzdMugF5ALyVeDFnYBESn4ANLz8ghzUtLQ+rBx+AEbBvPLAymARyVEx-ghJUci6IbSFVLo8RqbmIMwAtvHQtmriklqE1XXQHl7RTLHIAIwADEV8AundWb12AMwjKWkZ+T2+HAAccwUjJWUGxiaG-AB0jIYKABQu1rYAlOV7BxDHp2ft9VA3PEA)

Using multiple type placeholders

```ts
type TwoPlaceholdersType<A, B> = (input: A) => B;
```

Make type aliasing

```ts
type Converter<A, B> = (input: A) => B;

type ConvertToNumber = Converter<string, number>;
type ConvertToString = Converter<number, string>;

const toNumberConverter: ConvertToNumber = (input: string): number =>
  parseInt(input);

const toStringConverter: ConvertToString = (input: number): string =>
  input.toString();

console.log(toNumberConverter("100"));
console.log(toStringConverter(200));
```

[open code in online editor](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwg9gOwG4QE7DQHgIIBooBCAfFALxQAUAlgmAK7ABcU2AlGSQQNwBQPokWIhToAKnABydALYAjNGSHI0GVJgDOwVDQDm+BDPmoivAdHjKxcAMpbdiiyNWYDctPk3aEOk3wDGiJpQwJKGaI4qaMwRVlJuqIrUtAzMnrqszK5GHDxQUGAAhqjqEACSCMBJ9MCsvDwBCEEhtl46MarRwiriLfbkVSlQWWgZUGneOXk01QB0zXbeFLX+gXAANhAza3A6FCFxRu1oFABEAIwADBcnrMsN6uub27vzrUeoFABMV7dcQA)

Generics based on type boundaries.

Here `array: A[]` showing that array methods like `.map`, `.reduce` etc will be available

```ts
const arrayMap = <A, B>(array: A[], func: (x: A) => B): B[] => array.map(func);
```

Custom type as generic type base

`<T extends Sizable>` showing that `T` should be subtype of `Sizable`

```ts
interface Sizable {
  size: number;
}

interface SizableCloth {
  name: string;
  size: number;
}

interface SizableHat {
  radius: number;
  size: number;
}

const sumAllSizes = <T extends Sizable>(array: T[]): number =>
  array.reduce((p: number, c: T) => c.size + p, 0);
const hat: SizableHat = {
  size: 5,
  radius: 1,
};
const cloth: SizableCloth = {
  size: 10,
  name: "cool",
};
const resultSum = sumAllSizes([hat, cloth]); // => 15
console.log(resultSum);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgMrAF5wEYBsUDeAUMsgM6YQBcyIArgLbbQDcRAvkUaJLIiuix4IAYVwB7MAAtkxUiDgNq5MFFABzNqQoZl9Jqw5ce0eEjSYc+ABJwwsksihwAJsDpka+5lC3lKXow+bJxECOIgZPZkjACCuLiCEGTIALzIADwAKsgQAB6QIC4pglYQAHwAFHBQzgCeNFkA2gC6AJSBBlBp5Y419QB0UBAudEiVlQAOnT4ANMgIjW09CwM6KADUyJPzAAxtbOGR9lJ2NKXCtvbpcv66NACss47Obh40AIzP7IcRUQsSaTnSzCMSSGQ3RzrT67Z7yRTKABE4XEuER31+xycyTouDAqEYaXIcQSSTIlSapzA8wQgKk7RYyAA9EyVh8HmE-qiIAMJOpKsMYniCQwDkQgA)

Generic type definition based on another generic type

Index Type Query or `keyof`: It yields the type of permitted property names for a give type.
`extends keyof` will result in having `K` as string with values as property names of `O`

`O[K]` will be type of the value accessible in `O` when using `K` property

```ts
const getProperty = <O, K extends keyof O>(obj: O, key: K): O[K] => obj[key];
```

Here `a` have type `number` so result of `getProperty` will the `number`

```ts
const numberProp: number = getProperty({ a: 1 }, "a");
```

Here `b` have type `string` so result of `getProperty` will the `string`

```ts
const stringProp: string = getProperty({ a: 1, b: "1" }, "b");
```
