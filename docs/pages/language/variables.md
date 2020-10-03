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

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBAFgUwgawGJwE4Ciee+AFDAM5El4BciARnHADZoCGYAlIgN4BQiRGyiI0xfAAU8aYDAAeiALyIARNXz1VAbkGIYwROSoS8PAUKEjEoFiw15lY09NkLEAajXoZOvUJkoEDwkW3tTXSEAXz0AeljEAAEoCgBaGABzMHw0PUDg0JA7B21EeMQHegByMIcqxAATODQKMCrRNHlKUR9cmKA)

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
const result1 = checkForErrorAnother(true); // "Internal Error: here"
const result2 = checkForErrorAnother(false); // "Error:  not happened"
console.log(result1);
console.log(result2);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBAFgUwgawGJwE4Ciee+AgmHFOngBQwDORJeAXIgEZxwA2aAhmACUiAN4AoRMgT0oiNMXwAFPGmAwAHogC8iAERN8bXQG4JiGMER1GCvMPGTJEabPnNlqjdr0BJMFHkwPm5EA1Y9U0dEXllQbm4w7zclFTVNAGo9ajQTM0kVKBA8JDiE20jEAF8zAqKkZLwPNMRM3UQKWRQ+AAdutDA0ABNc6ucwGUQVehBuKABGb1QMHHww8kpqGig8EDRBY0QAekPff0Dg0Ns2bN0xMYmpmagAJkX0LFxCW3WqeRpgYL0PYHY56MJsdqURBdXr9Ia3e48NAAOm4cAA5jRHrM5vs7tIkaiMVi0NNZs88UA)
