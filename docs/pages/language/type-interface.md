# Type

Simple type aliasing

```ts
type CustomerName = string;
```

Useful when function have many parameters and it is easy to make mistakes when passing them. Just extract `string` as domain specific type

```ts
const customerName: CustomerName = "Oleg";
```

Mixed types

```ts
type MaybeString = string | undefined;
type SomethingNobodyExpects = string | number | boolean;
```

Represent multiple possibilities when defining error

```ts
type Errors = string | string[] | undefined;
```

Type defined out of fixed literals

```ts
type FixedNumbers = 1 | 2 | 3 | 4;
type FixedStrings = "ONE" | "TWO" | "THREE";
```

Boolean looks strange, but still used

```ts
type IamAlwaysTrue = true;
type IamAlwaysFalse = false;
```

Complex object defined as new type

```ts
type SomethingBigger = {
  a: number;
  b: number;
};
```

# Recursive types

Could include itself in definitions

```ts
type Tree = {
  value: number;
  left?: Tree;
  right?: Tree;
};
const tree: Tree = {
  value: 10,
  left: {
    value: 5,
    right: {
      value: 7,
    },
  },
};
```

# Combining type definitions

Done with `|` (OR) or `&` (AND)

`MyError` could be any of listed

```ts
class MyErrorClass {}
type MyError = Error | MyErrorClass;
```

And case `&` used to merge types into one

```ts
type WithNumbers = {
  one: number;
  two: number;
};
type WithStrings = {
  three: string;
  four: string;
};
type CombinedObject = WithNumbers & WithStrings;
const combined: CombinedObject = {
  one: 1,
  two: 2,
  three: "3",
  four: "4",
};
combined.one;
combined.three;
```

All properties with same name will have resulting type `never`. Do not do this !

# Type vs Interface

Type generally is used for one liners, simple cases with `|` and `&`

Interface is used for complex constructs

```ts
type GoodType = string | string[] | undefined;
interface GoodInterface {
  customerId: number;
  age: number;
  email: string;
}
```

# Interface

Could have optional properties

```ts
interface WithOptionalProps {
  definitelyHere: number;
  goodDefinedOptional?: string; // prefer this way to define optional
  notSoGood: string | undefined;
}
```

Represent partially undefined shape.
`userId` should be there and everything else could present but not required to know how it is looks like

```ts
interface JsonDecodedData {
  userId: string;
  [anyNameHere: string]: any;
}
```

Usually keys are of type`string`. `number` is also allowed but it is not convenient to use it.

Common use case is to parse json body and pass it to next service

```ts
const body = `{"userId": "1", "age":21, "name":"Bob"}`;
const apiRequest = JSON.parse(body) as JsonDecodedData;
if (apiRequest.userId !== undefined) {
}
```

# Extend interface

```ts
interface Base {
  length: number;
}
interface Coordinate {
  x: number;
  y: number;
}
```

New interface extending others and adding additional properties

```ts
interface Field extends Base, Coordinate {
  name: string;
}
const myField: Field = {
  length: 100,
  x: 10,
  y: 20,
  name: "My stuff",
};
```

New interface extending others but without any additional properties

```ts
interface NoNameField extends Base, Coordinate {}
const somebodyField: NoNameField = {
  length: 100,
  x: 10,
  y: 20,
};
```

Could be also defined by `type`

```ts
type NoNameFieldType = Base & Coordinate;
```

Interface could force readonly properties

```ts
interface TryToAssign {
  a?: number;
  readonly b: string;
}
const readOnlyObject: TryToAssign = { b: "b" };
readOnlyObject.a = 10;
```

This will not work: `readOnlyObject.b = "10"`

# Function types

```ts
type MyFunction = (a: string) => string;
const stringFunction: MyFunction = (a: string) => a.toLowerCase();
stringFunction("A"); // => a
```

Could be also used to assign full `function` definition

```ts
const anotherFunction: MyFunction = function (a: string) {
  return a.toLowerCase();
};
```

Function type can also be defined as `interface`

This is not popular way, please don't do this

```ts
interface FunctionType {
  (a: string): string;
}
const stringInterfaceFunction: FunctionType = (a: string) => a.toLowerCase();
```

# Use `interface` instead of `class`

`class` definition can be replaced by function returning required object interface instance `DbAdapter`.
This is more popular approach compared to define new `class` and using `new`

> Always try to use functional style

Sample database adapter with few methods and property

```ts
interface DbAdapter {
  databaseName: string;
  put: (item: string) => void;
  get: (id: string) => string | undefined;
}
```

Could be created inside of `buildDatabaseAdapter` which receive "constructor" parameter `databaseName`
Both functions `get` and `put` are exposed by interface definition

```ts
const buildDatabaseAdapter = (databaseName: string): DbAdapter => {
  const realDatabaseConnector = {} as any;
  function get(id: string) {
    return realDatabaseConnector.get(id);
  }
  function put(item: string) {
    return realDatabaseConnector.put(item);
  }

  return {
    databaseName,
    put,
    get,
  };
};
const myDbAdapter: DbAdapter = buildDatabaseAdapter("sample");
```
