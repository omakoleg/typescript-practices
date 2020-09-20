Tuple destructuring

```ts
const tuple: [string, number, boolean] = ["awerqwer", 1, false];

const [e1, b2, c3] = tuple;
const [firstOnly] = tuple;
const [, secondElement] = tuple;
const [first, , last] = tuple;
```

Not really convenient, easy to make `commas` mistake

```ts
const [, , last_only] = tuple;
```

sample: take part of tuple into another type

```ts
const [head, ...tail] = tuple;
```

sample: return multiple values from function

```ts
const someValidation = (): [Object?, string[]?] => [{}];
const [result, maybeErrors] = someValidation();
```

For arrays looks the same

```ts
const numbersArray = [1, 2, 3, 4, 5];
const [arrayHead, ...arrayTail] = numbersArray;
```

Object destructuring

```ts
interface DestroyMe {
  error: string;
  data: number;
  probably?: number;
}
const { error, data, probably } = {} as DestroyMe;
```

sample: Deep

```ts
interface DestroyMeDeep {
  message: string;
  data: {
    a: string;
    b: number;
  };
}
const {
  data: { a, b },
} = {} as DestroyMeDeep;
```

sample: Change name

```ts
const {
  message: someMessage,
  data: { a: aOther },
} = {} as DestroyMeDeep;
```

Common use cases

pick one property

```ts
interface ApplicationConfig {
  database: Object;
  api: Object;
  logger: Object;
}
const { api } = {} as ApplicationConfig;
```
