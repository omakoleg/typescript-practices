/**
 * # Function
 *
 * Function parameters could be defined using required or optional notations
 */
function withOptionalArgs(a: string, b?: number): void {}
function withOptionalDefaultArgs(a: string, b = 10): void {}
/**
 * Could be used spread operator to capture all parameters into an array
 */
function withPassThruArgs(...other: string[]): void {}
/**
 * Function could have another function as parameter
 */
function convertToNumber(
  data: string,
  cb: (error: string | undefined, result?: number) => void
): void {}
/**
 * Same rules applied to anonymous functions
 */
const withOptionalArgs2 = (a: string, b?: number): void => {};
const withOptionalDefaultArgs2 = (a: string, b = 10): void => {};
const withPassThruArgs2 = (a: string, ...other: string[]): void => {};

/**
 * Anonymous functions could be explicitly typed
 */
type LoggerFunction = (...params: string[]) => void;
const logFunction: LoggerFunction = (...params: string[]) => {
  console.log(...params);
};
const errorFunction: LoggerFunction = (...params: string[]) => {
  console.error(...params);
};

/**
 * To function parameters could be applied destructuring
 */
interface FunctionParams {
  a: string;
  b: number;
}
const appInParams = ({ a }: FunctionParams): void => {
  console.log(a);
};
/**
 * Destructure only subset of parameters
 */
interface PartialFunctionP {
  b: number;
}
const partialParams = (a: number, { b }: PartialFunctionP): void => {
  console.log(a, b);
};

/**
 * Destructuring with optional parameters and applied defaults
 *
 * Parameters order doesn't matter in this case. Optional default is not necessary at last position
 */
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

/**
 * # Async functions
 *
 * As a good practice is to use `await `inside of `async` function otherwise it is just a function returning `Promise`.
 *
 * This is ensured by `eslint` rules, typescript itself allows `async` function without `await`
 */
const mainAsync = async (a: number): Promise<number> => {
  return await Promise.resolve(a);
};
const mainPromise = (): Promise<number> => {
  return Promise.resolve(1);
};
/**
 * Using any of these
 */
async function main() {
  await mainAsync(1); // async function
  await mainPromise(); // Promise function
}
/**
 * In Node.js you could call `async` function on top level and runtime will internally wait it to be resolved
 */
main();

/**
 * Short notation
 *
 * When function have only one line it could be changed to be in short notation
 */
function add(a: number, b: number) {
  return a + b;
}
const addFunction = (a: number, b: number) => a + b;
/**
 * Effectively it removes `{}` and `return`
 */

/**
 * # Curried functions
 *
 * Functions returning functions.
 *
 * They used to keep some context till later time to execute action within that context
 */
type LongCurriedFunction = (a: string) => (code: number) => number;
/**
 * It is better to define all intermediate types to increase readability
 */
type InternalFunction = (code: number) => number;
type WrapperFunction = (a: string) => InternalFunction;

const wrapperFunction: WrapperFunction = (a: string) => {
  console.log("wrapper", a);
  return (justCode: number) => {
    console.log("internal function", a, justCode);
    return justCode + 1;
  };
};
/**
 * Call one then second
 */
const partialFunction = wrapperFunction("test"); // => InternalFunction
partialFunction(200); // => 201
/**
 * Call both same time. Pretty useless scenario
 */
wrapperFunction("test")(200); // => 201

/**
 * Short notation
 *
 * Here is 3 level curried function definition, it sometimes could be hard to read
 */
const shortHardReadableFunction = (a: string) => (justCode: number) => (
  prefix: string
) => `${prefix} for ${a} ${justCode}`;
