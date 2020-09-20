/**
 * Function definitions
 */
/* classical */
function withOptionalArgs(a: string, b?: number): void {}
function withOptionalDefaultArgs(a: string, b = 10): void {}
// aka console.log
function withPassThruArgs(...other: string[]): void {}
// function as parameter in function
function convertToNumber(
  data: string,
  cb: (error: string | undefined, result?: number) => void
): void {}

/* `const` notation */
const withOptionalArgs2 = (a: string, b?: number): void => {};
const withOptionalDefaultArgs2 = (a: string, b = 10): void => {};
const withPassThruArgs2 = (a: string, ...other: string[]): void => {};

/* explicit typings */
type LoggerFunction = (...params: string[]) => void;
const logFunction: LoggerFunction = (...params: string[]) => {
  console.log(...params);
};

/**
 * Function parameters destructuring
 */
/* all in one */
interface FunctionParams {
  a: string;
  b: number;
}
const appInParams = ({ a }: FunctionParams): void => {
  console.log(a);
};

/* partial object */
interface PartialFunctionObject {
  b: number;
}
const partialParams = (a: number, { b }: PartialFunctionObject): void => {
  console.log(a, b);
};

/* optionals */
interface PartialFunctionOptionalObject {
  b: number;
  c?: string;
  d?: string;
}
// Optional default is not necessary at last position !
const partialParamsOptional = (
  a: number,
  { b, d, c = "defined" }: PartialFunctionOptionalObject
): void => {
  console.log(a, b, c, d); // d = string | undefined
};

/**
 * Async functions
 */

// Async could be `run` at top level (remember: not in Lambda)
async function main() {
  await Promise.resolve(1);
}
main();
// `async` function should contain `await` always !
const mainAsync = async (a: number): Promise<number> => {
  return await Promise.resolve(a);
};
// Otherwise it is `Promise` function:
// You could still await it
const mainPromise = (): Promise<number> => {
  return Promise.resolve(1);
};
async function runPromise() {
  await mainPromise(); // await Promise
}
