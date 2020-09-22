/**
 * # Using callbacks
 *
 * Callbacks allowing to utilise so called "async nature" of `javascript` (and `typescript`) by detaching current
 * execution and continue it later.
 */
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
/**
 * In this example callback function will be executed "after" file descriptor is returned by OS and file contents were read out.
 *
 * Or some error happened. In this case `err` will have some value and `data` will be empty Buffer
 *
 * It is common pattern to have callback function with 2 arguments:
 * - `error` on a first place when some issues happened, usually second parameter will not have value in this case
 * - `data` useful function result, in this case `err` usually is `null` or `undefined`
 *
 * Callback functions usually have `void` as result type because no-one is waiting for them to return value,
 * but rather perform some action later. Callback still have `return` inside but it is used to stop its execution.
 *
 * Function doing division, and sometime exploding when someone will try to divide by `0`
 */
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
/**
 * It is used like this
 */
const callback = (err?: Error, result?: number) => {
  if (err) {
    console.log("error happened", err);
  }
  console.log("result", result);
};
divide(1, 1, callback); // prints: "result 1"
divide(1, 0, callback); // prints: "error happened Error: Cant divide by 0"
/**
 * When many callbacks are used it is easy to mess-up things and produce unreadable code
 */
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
/**
 * All this is hard to read and maintain
 */
