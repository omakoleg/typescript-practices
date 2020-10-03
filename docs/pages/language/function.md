# Function definition

Function parameters could be defined using required or optional notations

```ts
function withOptionalArgs(a: string, b?: number): void {}
function withOptionalDefaultArgs(a: string, b = 10): void {}
```

Could be used spread operator to capture all parameters into an array

```ts
function withPassThruArgs(...other: string[]): void {}
```

Function can have another function as parameter

```ts
function convertToNumber(
  data: string,
  cb: (error: string | undefined, result?: number) => void
): void {}
```

Same rules applied to anonymous functions

```ts
const withOptionalArgs2 = (a: string, b?: number): void => {};
const withOptionalDefaultArgs2 = (a: string, b = 10): void => {};
const withPassThruArgs2 = (a: string, ...other: string[]): void => {};
```

Anonymous functions could be explicitly typed

```ts
type LoggerFunction = (...params: string[]) => void;
const logFunction: LoggerFunction = (...params: string[]) => {
  console.log(...params);
};
const errorFunction: LoggerFunction = (...params: string[]) => {
  console.error(...params);
};
```

Function type can also be defined as `interface`

This is not popular way, please don't do this, exists for backwards compatibility with javascript

```ts
interface FunctionType {
  (a: string): string;
}
const stringInterfaceFunction: FunctionType = (a: string) => a.toLowerCase();
```

Could be applied destructuring to the function parameters

```ts
interface FunctionParams {
  a: string;
  b: number;
}
const appInParams = (first: number, { a }: FunctionParams): void => {
  console.log(first, a);
};
```

Destructuring with optional parameters and applied defaults

Parameters order doesn't matter in this case. Optional default is not necessary at last position

```ts
interface PartialFunctionOptionalObject {
  b: number;
  c?: string;
  d?: string;
}
const partialParamsOptional = (
  a: number,
  { b, c = "defined", d }: PartialFunctionOptionalObject
): void => {
  console.log(a, b, c, d); // d = string | undefined, c = string
};
```

# Async functions

As a good practice is to use `await `inside of `async` function otherwise it is just a function returning `Promise`.

This is ensured by `eslint` rules, typescript itself allows `async` function without `await`

```ts
const mainAsync = async (a: number): Promise<number> => {
  return await Promise.resolve(a);
};
const mainPromise = (): Promise<number> => {
  return Promise.resolve(1);
};
```

Using any of these

```ts
async function main() {
  await mainAsync(1); // async function
  await mainPromise(); // Promise function
}
```

In Node.js you could call `async` function on top level and runtime will internally wait it to be resolved

```ts
main();
```

Short notation

When function have only one line it could be changed to be in short notation

```ts
function add(a: number, b: number) {
  return a + b;
}
const addFunction = (a: number, b: number) => a + b;
addFunction(1, 2);

type MyFunction = (a: string) => string;
const stringFunction: MyFunction = (a: string) => a.toLowerCase();
stringFunction("A"); // => a
```

Effectively it removes `{}` and `return`

# Curried functions

Functions returning functions.

They used to keep some context till later time to execute action within that context

```ts
type LongCurriedFunction = (a: string) => (code: number) => number;
```

It is better to define all intermediate types to increase readability

```ts
type InternalFunction = (code: number) => number;
type WrapperFunction = (a: string) => InternalFunction;

const wrapperFunction: WrapperFunction = (a: string) => {
  console.log("wrapper", a);
  return (justCode: number) => {
    console.log("internal function", a, justCode);
    return justCode + 1;
  };
};
```

Call one then second

```ts
const partialFunction = wrapperFunction("test"); // => InternalFunction
partialFunction(200); // => 201
```

Call both same time. Pretty useless scenario

```ts
wrapperFunction("test")(200); // => 201
```

# Short notation

Can be used when function have only one operation which gives result and it could be immediately returned

```ts
const shortNotation = (a: string) => (b: number) => (c: string) =>
  `${a} -> ${b} -> ${c}`;
```

Return an object as only one operation in function

```ts
const addAndReturn = (a: string, b: string) => ({
  sum: a + b,
});
```

Here, extra `()` is required because `{}` in function definition used to define function body.

# "this" capturing

Main difference between `function` and `const` function definitions is the way how they works with `this`

In this sample `set` and `setClassical` doing the same thing, but are different
because of definitions used

```ts
function practiceThisWrapper() {
  // Curried function type
  type Setter = (a: string) => (a: string) => void;
  // Object type definition in needed for `this` usage inside of it's functions
  interface CapturingObject {
    data: Record<string, string>;
    set: Setter;
    setClassical: Setter;
  }
  const thisCapturingObject: CapturingObject = {
    data: {},
    set: function (key: string) {
      // Next arrow function is capturing `this` as current scope
      // classical `function` will not work when using `this` inside
      return (value: string) => {
        this.data[key] = value;
      };
    },
    setClassical: function (key: string) {
      // keep `this` for the `function`
      const self = this;
      return function (value: string) {
        self.data[key] = value;
      };
    },
    // It is wrong definition:
    // `this` will be referencing scope of `thisPracticeWrapper`
    // setShort: (key: string) => (value: string) => {
    //   this.data[key] = value;
    // },
  };
  thisCapturingObject.set("data")("value");
  thisCapturingObject.setClassical("data2")("value2");
  console.log(thisCapturingObject.data);
  // { data: 'value', data2: 'value2' }
}
practiceThisWrapper();
```

As a recommendation here is to use builder to create the object.
This will not require to use `this` and will be more transparent

```ts
function practiceThisBuilderWrapper() {
  // Curried function type
  type Setter = (a: string) => (a: string) => void;
  // Object type definition in needed for `this` usage inside of it's functions
  interface CapturingObject {
    data: Record<string, string>;
    set: Setter;
    setClassical: Setter;
  }
  const buildCapturingObject = (): CapturingObject => {
    const data: Record<string, string> = {};
    // both are `arrow function` definitions
    const set = (key: string) => {
      return (value: string) => {
        data[key] = value;
      };
    };
    // both are `function` definitions
    function setClassical(key: string) {
      return function (value: string) {
        data[key] = value;
      };
    }
    return {
      data,
      set,
      setClassical,
    };
  };
  const thisCapturingObject = buildCapturingObject();
  thisCapturingObject.set("data")("value");
  thisCapturingObject.setClassical("data2")("value2");
  console.log(thisCapturingObject.data);
  // { data: 'value', data2: 'value2' }
}
practiceThisBuilderWrapper();
```
