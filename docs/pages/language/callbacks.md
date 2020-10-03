# Callbacks

Callbacks allowing to utilise so called "async nature" of `javascript` (and `typescript`) by detaching current
execution and continue it later.

Defined in a way that function except data parameters have also `callback` as last parameter.

Callback is a function with 2 parameters:

- `error` on a first place to reflect case when some issues happened, usually second parameter will not have value in this case
- `data` useful function result, in this case `err` usually is set explicitly to `null` or `undefined`

Return type of both mentioned functions is `void`. Because no-one is waiting for them to return value synchronous.

Callback still can use `return` inside, but it is used to stop its execution and exit.

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

Function doing division, and returning an error when someone will try to divide by `0`

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
    cb(undefined, a / b); // this returns `Infinity`
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

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAJgSwG4LgUxgXhgCgFAwwCGAXDGAK4C2ARmgE4A0BMNZltDzhwbuD9APxkAovXogmMemggUANlGHlqdegEosAPhhIQqPJsw6A3iyj0AnjDOFCCAGa4aWTNgAMm23cIyoFejAYXhwwNAB3GDEJehwAAwBhIjBYRBR0Vmt3OPV1AG4WQgBfQuCaHAowdAcEMLhGYhgAelZ85paoAAsECGk0f0DeuIBJMBqwBChLOJYi4KIoYE7+L1KQtAA6KBAAZQtagHMcXILivCKC0EhYYCJ5eRoiYABrLH5xZWjJBpk5RWUOGojKYWI53hobKU-AEglcICB5Jt5CAjgAiASSGCdIgABxxaDqqIaAnysxYcIRSJROFRvwUUCJfT+UFJFzwaVQaBwAEYGrz5vdHi82k0Wjj6LUoBAyLTZPSYNzUezkJyeQ13A1boKns8RWKJSlpTB0eJMdi8QS0HAoqb6GQkil4CqMjQsqigA)

When many callbacks are used it is easy to mess-up things and produce complex code

```ts
import { stat, readFile, writeFile } from "fs";

type Err = NodeJS.ErrnoException | null;
const fileToUpdate = "/tmp/some-file.txt";

stat(fileToUpdate, (err: Err, stats: any) => {
  if (err) {
    return console.error(`Stats error: ${err}`);
  } else {
    console.log(`File stats: ${stats}`);
    readFile(fileToUpdate, (errRead: Err, contents: any) => {
      if (errRead) {
        return console.error(`File reading error: ${errRead}`);
      } else {
        const newContents = `${contents}-updated`;
        // throw new Error(`Nobody will handle me`)
        writeFile(fileToUpdate, newContents, (errWrite: Err) => {
          if (errWrite) {
            return console.error(`File writing error: ${errRead}`);
          } else {
            console.log(`Write finished`);
          }
        });
      }
    });
  }
});
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgZxgQxgGjlApmgEwDFgAbXbAdymBlxPLgF84AzKCEOAIleW4DcAKCEwAnmFxwAolChwAvHAByEArgBSAZQB0sqADsI0gB4BjXGBjAIBuAB84BgK6lSws7dRsyuACoQAKpgBBhSStwA9DDgkcicuAC0rL46MCYwgiKoGAAUKeQBwaF02Lm4cgBcMnLYOTDI1WgGYgCUigB8iEJwcMCscOVy7Qg9vTi4MM6GcJ4G8eQ6FRxQuQAGWugNcMvQ1QAkCMtMa63CvSy4pMhSo+OzXhCLpBAA5usMUvWNcIffJ2cxr08IRPvlfEUQmEyssAEr4AjVfTYOZ0AwNJotdoKLp3e59AZDKDwwgjIH4vBTGZzBa4JZyaAfXwTQjAAyvHYMqAHI5yEkEAHnfGXa63cn3GnwAy4SgAYVsaO2SjWh1RuHRyCYiWcULoBDWQvxcEikTgMAAFhxKE4ZTUVutVAAjNRiOCUMikODm5oERggXCncXjai0ei+cGFIK6ig2uUK9UNGFyADqNDoSOGnW6Rvu-UGy1TobJOYpk2mdhpTzpu1Wa0+brTbI5NZ5cIRgqD9xFN2zJfGleeb3WhboPgMwGQ5tw+sBfeYneYs+F5KYS6YQlXAiAA)

Maintaining such code is complex and easy to make mistakes

Currently unhandled errors will be just logged to stderr, if they are not given to callbacks.
