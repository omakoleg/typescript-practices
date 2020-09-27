# Using callbacks

Callbacks allowing to utilise so called "async nature" of `javascript` (and `typescript`) by detaching current
execution and continue it later.

```ts
import fs from "fs";
fs.readFile(
  "filename",
  (err: NodeJS.ErrnoException | null, data: Buffer): void => {
    if (err) {
      return console.error(`Error occur: ${err}`);
    }
    console.log(`Data ${data.toString()}`);
  }
);
```

In this example callback function will be executed "after" file descriptor is returned by OS and file contents were read out.

Or some error happened. In this case `err` will have some value and `data` will be empty Buffer

It is common pattern to have callback function with 2 arguments:

- `error` on a first place when some issues happened, usually second parameter will not have value in this case
- `data` useful function result, in this case `err` usually is `null` or `undefined`

Callback functions usually have `void` as result type because no-one is waiting for them to return value,
but rather perform some action later. Callback still have `return` inside but it is used to stop its execution.

Function doing division, and sometime exploding when someone will try to divide by `0`

```ts
const divide = (
  a: number,
  b: number,
  cb: (err?: Error, result?: number) => void
) => {
  try {
    if (b === 0) {
      return cb(new Error(`Cant divide by 0`));
    }
    cb(undefined, a / b); // this is not exploding, just return `Infinity` :)
  } catch (e) {
    cb(e.toString());
  }
};
const callback = (err?: Error, result?: number) => {
  if (err) {
    return console.log("error happened", err);
  }
  console.log("result", result);
};
divide(1, 1, callback); // prints: "result 1"
divide(1, 0, callback); // prints: "error happened Error: Cant divide by 0"
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAJgSwG4LgUxgXhgCgFAwwCGAXDGAK4C2ARmgE4A0BMNZltDzhwbuD9APxkAovXogmMemggUANlGHlqdegEosAPhhIQqPJsw6A3iyj0AnjDOFCCAGa4aWTNgAMm23cIyoFejAYXhwwNAB3GDEJehwAAwBhIjBYRBR0Vmt3OPV1AG4WQgBfQuCaHAowdAcEMLhGYhgAelZ85paoAAsECBge8hBYNAAPAAd5EEQwAHMGgCsKaGk0f0CYOIBJMBqwBChLOJgSdRYi4KIoYE7+L1KQtAA6KBAAZQta6ZxcguK8IoLQJBYMAiPJ5DQiMAANZYfjiZTRSQNGRyRTKDhqIymFiOOEaGylPwBIKAiAgeSPCafABEAkkME6RFGozQdWpDQE+VOLFJ5MpIBpKIUUHZy1RUC5-zwaVQaBwAEYGorzmCIdC2k0WqN6LUoBAyNShYoYPLqdLkLKFQ13A0QarIVCNVqdSl9TBaeJ6Yzmay0HAop76GQkil4BaMjQstSgA)

When many callbacks are used it is easy to mess-up things and produce unreadable code

```ts
const fileToUpdate = "some-file";
fs.stat(fileToUpdate, (err: NodeJS.ErrnoException | null, stats: any) => {
  if (err) {
    return console.error(`Stats error: ${err}`);
  } else {
    console.log(`File stats: ${stats}`);
    fs.readFile(
      fileToUpdate,
      (errRead: NodeJS.ErrnoException | null, contents: any) => {
        if (errRead) {
          return console.error(`File reading error: ${errRead}`);
        } else {
          const newContents = `${contents}-updated`;
          // throw new Error(`Nobody will handle me`)
          fs.writeFile(
            fileToUpdate,
            newContents,
            (errWrite: NodeJS.ErrnoException | null) => {
              if (errWrite) {
                return console.error(`File writing error: ${errRead}`);
              } else {
                console.log(`Write finished`);
              }
            }
          );
        }
      }
    );
  }
});
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAZgSwDYFMAqICqAHAJgQyhRgF4YAiCEAWxQFpFVyBuAKDggDppCAKR9FjyEUAGhi8UAJykAuGADkQuFACkAypwCiMsCC0APYCmxQE4GAB8YYAK5Ik4nlAjz8YAJ4BKUgD4YAN6sMDAIcBLSUj5BISFSKFC2UmAwoJAgqJyRIFK8AAbqUIQQMNlyMAAkAZEAvnlebCE1pUgQxDGxaVSZSCAA5vkAYsjEzq6VAWN1DcGxHJzx+LjDqLyzsfAjGDgERKLrsZIyAEooS-JKKhrauvpGJmYW1nYO4mlEYC5unj4k-h0bEJhCInM64aIHQEweKJZKpcDdFBZGQ5IYjaFghBgPqlFHlKqRU5LaaNKEwZooVrtSGArqwMAoADuAGFwB8XKQYHkqu8UJ8IDU6LZhERcHlSWSYAB6KUwKAACykIEZNiZMB0StyeSUACNlB4YIzkEgYPL3LhUDBaPUaRt5oypAgiCsUGtJXatkJdmJbYCGSy2XyXPt3YdIgB1R1EC7KNSaDV6QzGUzmFLPexIX7-X1Q4FHKSRp0oCGhqEwpIpLoZJFlNGWh1OrE4sryAmg4n1CWlilUwI5slVnr9fKFoibMAICDylBimal2I1ftNftzsmLqHr2Krxc1BpAA)

When error happened inside of callback handler or thrown, there is no possibility to handle it in current scenario without
additionally wrapping logic in try-catch.

Currently unhandled errors will be just logged to stderr.
