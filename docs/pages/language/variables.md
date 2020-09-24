# Variable definitions

Classical `var` is working to be compatible with javascript

```ts
var simpleVar = 1;
```

It has problems with scoping, so it is usually forbidden to use by tsc options

Recommended to use:

- `let` for variables changing values
- `const` for constants having one value all time.

```ts
const databaseAdapter = {};
let index = 0;
```

You could still modify internal properties of objects and arrays defined with `const`:

```ts
const object = {
  a: 1,
  b: 2,
};
object.a = 10;
```

object = {a: 10, b:2 } // will not work

```ts
const myArray = [];
myArray.push(10); // ok
```

Object key short notation

```ts
const userId = 10;
const userObject = {
  userId, // this mean: take `userId` as property name and assign value from `userId` variable
};
```

# Block-scoping

```ts
function checkForError(isError: boolean) {
  let errorPrefix = "Error: ";
  if (isError) {
    let fullError = errorPrefix + "here";
    return fullError;
  }
  // @ts-ignore
  return fullError; // Error: 'fullError' doesn't exist here
}
```

`let` works within scope and could be shadowed within child scope

```ts
function checkForErrorAnother(isError: boolean) {
  const errorPrefix = "Error: ";
  if (isError) {
    const errorPrefix = "Internal Error: ";
    let fullError = errorPrefix + "here";
    return fullError;
  }
  return errorPrefix + " not happened";
}
```

`checkForErrorAnother(true)` will return "Internal Error: here"
`checkForErrorAnother(false)` will return "Error: not happened"
