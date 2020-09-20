
 Type

```ts

type MyString = string;

const myStringType: MyString = "a";

```
 mix types
```ts

type MaybeString = string | undefined;

type SomethingNobodyExpects = string | number | boolean;

type Errors = string | string[] | undefined;

type FixedNumbers = 1 | 2 | 3 | 4;

type FixedStrings = "ONE" | "TWO" | "THREE";

type IamAlwaysTrue = true;
type IamAlwaysFalse = false;

type SomethingBigger = {
  a: number;
  b: number;
};

```

 Recursive types

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

 Combine definitions

 Or case `|` 
```ts
class MyErrorClass {}
type MyError = Error | MyErrorClass;

```
 And case `&` 
```ts
type WithNumbers = {
  one: number;
  two: number;
};
```
 all properties with same name will be `never`, do not do this !
```ts
type WithStrings = {
  three: string;
  four: string;
};
type CombinedObject = WithNumbers & WithStrings;
const combined: CombinedObject = {} as CombinedObject;
combined.one;
combined.three;

```

 Type vs Interface

 Type = for one liners, simple cases with `|` and `&`
 Interface = for complex constructs

```ts
type GoodType = string | string[] | undefined;
interface GoodInterface {
  customerId: number;
  age: number;
  email: string;
}
```

 Interface

```ts
interface WithOptionalProps {
  definitelyHere: number;
  maybeHere?: string;
}
```
 with undefined shape 
```ts
interface JsonDecodedData {
  userId: string;
```
  // usually keys are `string` (number is also allowed, please don't)
```ts
  [anyNameHere: string]: any;
}
```
 sample usage 
```ts
const body = `{"userId": "1", "age":21, "name":"Bob"}`;
const apiRequest = JSON.parse(body) as JsonDecodedData;
if (apiRequest.userId === "1") {
```
  // save to database
```ts
}

```

 Extends

```ts
interface Base {
  length: number;
}
interface Coordinate {
  x: number;
  y: number;
}
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
 just combine without additional properties 
```ts
interface NoNameField extends Base, Coordinate {}
```
 type NoNameField = Base & Coordinate;
```ts
const somebodyField: NoNameField = {
  length: 100,
  x: 10,
  y: 20,
};

```

 readonly properties

```ts
interface TryToAssign {
  a?: number;
  readonly b: string;
}
const readOnlyObject: TryToAssign = { b: "b" };
```
 This will not work:
 readOnlyObject.b = "10";
```ts
readOnlyObject.a = 10;
```

 Function types

```ts
type MyFunction = (a: string) => string;
const stringFunction: MyFunction = (a: string) => a.toLowerCase();
stringFunction("A"); // => a

const stringFunctionUgly: MyFunction = function (a: string) {
  return a.toLowerCase();
};
```
 as interface
 Looks ugly, isn't it ?
```ts
interface FunctionType {
  (a: string): string;
}
const stringInterfaceFunction: FunctionType = (a: string) => a.toLowerCase();

```
  
 interface Shape {
   color: string;
 }
 interface Square extends Shape {
   sideLength: number;
 }
 const square: Square = { color: "blue", sideLength: 10 };

 Extending interfaces


 Hybrid Type.
 Could mix `function interface` and `properties interface`
 Skipped to not even show it.


 Class Type

 Always try to do functional style :)

```ts

interface DbAdapter {
  databaseName: string;
  put: (item: string) => void;
  get: (id: string) => string | undefined;
}
const buildDatabaseAdapter = (databaseName: string): DbAdapter => {
  const realDatabaseConnector = {} as any;

```
  // function is within scope = private
```ts
  function get(id: string) {
    return realDatabaseConnector.get(id);
  }

```
  // function is within scope = private
```ts
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