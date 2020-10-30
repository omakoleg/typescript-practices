/**
 * # Callbacks
 *
 * Callbacks allowing to utilise so called "async nature" of `javascript` (and `typescript`) by detaching current
 * execution and continue it later.
 *
 * Defined in a way that function except data parameters have also `callback` as last parameter.
 *
 * Callback is a function with 2 parameters:
 * - `error` on a first place to reflect case when some issues happened, usually second parameter will not have value in this case
 * - `data` useful function result, in this case `err` usually is set explicitly to `null` or `undefined`
 *
 * Return type of both mentioned functions is `void`. Because no-one is waiting for them to return value synchronous.
 *
 * Callback still can use `return` inside, but it is used to stop its execution and exit.
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
 * Function doing division, and returning an error when someone will try to divide by `0`
 */
// @playground-link
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
/**
 * When many callbacks are used it is easy to mess-up things and produce complex code
 */
// @playground-link
import { stat, readFile, writeFile } from "fs";

type Err = NodeJS.ErrnoException | null;
const fileToUpdate = "/tmp/some-file.txt";

stat(fileToUpdate, (err: Err, stats: any) => {
  if (err) {
    return console.error(`Stats error: ${err}`);
  }
  console.log(`File stats: ${stats}`);
  readFile(fileToUpdate, (errRead: Err, contents: any) => {
    if (errRead) {
      return console.error(`File reading error: ${errRead}`);
    }
    const newContents = `${contents}-updated`;
    // throw new Error(`Nobody will handle me`)
    writeFile(fileToUpdate, newContents, (errWrite: Err) => {
      if (errWrite) {
        return console.error(`File writing error: ${errRead}`);
      }
      console.log(`Write finished`);
    });
  });
});
/**
 * Maintaining such code is complex and easy to make mistakes
 *
 * Currently unhandled errors will be just logged to stderr, if they are not given to callbacks.
 */
