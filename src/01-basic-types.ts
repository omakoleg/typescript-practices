/**
 * Classes will not be included here
 * Try to use functional approaches always!
 * Your code should not have `class` definitions, believe you don't need them
 *
 * DOM types will be omitted, targeting here mostly Node.js
 */

/**
 * Any
 *
 * "Temporary excuse"
 * disabled by compiler flag
 */
const anyValue: any = {};
/**
 * Unknown
 * Better not to use it explicitly
 * Used in `catch` recently
 */
const maybe: unknown = {};
/** sample usage */
const maybeSomething = {} as unknown;
/**
 * Void,
 * aka `nothing`
 */
function none(): void {}
function log(line: string): void {
  console.log(line);
}
/**
 * Basic
 */
const str: string = "1"; // '111', `111 ${variable}`
const yes: boolean = true;
const obj: Object = {};
// Please do not use `Function` it is like `any` amongst functions
const func: Function = () => 1;
/**
 * Symbol
 *
 * Always unique, in practice `enum` is more adopted
 */
let sym1 = Symbol("something");
let symbolYes1 = Symbol("yes");
let symbolYes2 = Symbol("yes");
// symbolYes1 === symbolYes2 // false
/**
 * Numeric
 */
let num: number = 6;
let readableNumber: number = 5_000_000_000;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// from ES2020
let big: bigint = 10000000000000000000000000000n;
/**
 * Arrays
 */
const array: any[] = ["a", "b"];
const anotherArray: Array<number> = [1, 2];
const arrayComplex: string[][] = [
  ["a", "b"],
  ["c", "d"],
];
const mixedArray: (number | string | boolean)[] = [1, "2", true];
const strangeArray: (number | number[])[] = [1, [1]];
/**
 * Tuple
 */
const sampleTuple: [string, number, boolean] = ["a", 1, true];
/**
 * Enum
 */
// Without values
enum Status {
  OK,
  FAILURE,
}
const myStatus: Status = Status.OK;

// With explicit values
enum Counter {
  ONE = "a",
  TWO = "b",
  THREE = "c",
}
const myNumber: Counter = Counter.TWO;

/**
 * Undefined, null
 */
// Undefined is usually used for implicit `nothing there`
// Pure undefined:
let undef: undefined;
const data1: undefined = [].find((x) => x > 0);
// To represent `maybe` ?
const data2: undefined | number = [1].find((x) => x > 0);
// Usually used for explicit `not set` but better to use undefined
let _null: null = null;

/**
 * never
 */

function explode(): never {
  throw new Error("bam");
}

/**
 * Object
 * Everything else except number, string, boolean, symbol, null, or undefined
 */
// Generally, you won’t need to use this
// `Object` is `any` amongst objects
const data3: Object = {};
