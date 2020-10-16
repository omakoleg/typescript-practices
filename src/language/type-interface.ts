/**
 * # Type
 *
 * Simple type aliasing
 */

type CustomerName = string;
/**
 * Useful when function have many parameters and it is easy to make mistakes when passing them. Just extract `string` as domain specific type
 */

const customerName: CustomerName = "Oleg";
/**
 * Mixed types
 */
type MaybeString = string | undefined;
type SomethingNobodyExpects = string | number | boolean;
/**
 * Represent multiple possibilities when defining error
 */
type Errors = string | string[] | undefined;
/**
 * Type defined out of fixed literals
 */
type FixedNumbers = 1 | 2 | 3 | 4;
type FixedStrings = "ONE" | "TWO" | "THREE";
/**
 * Boolean looks strange, but still used
 */
type IamAlwaysTrue = true;
type IamAlwaysFalse = false;
/**
 * Complex object defined as new type
 */
type SomethingBigger = {
  a: number;
  b: number;
};

/**
 * # Recursive types
 *
 * Could include itself in definitions
 */
// @playground-link
type Tree = {
  value: number;
  left?: Tree;
  right?: Tree;
};
const tree: Tree = {
  value: 10,
  left: {
    value: 5,
    right: {
      value: 7,
    },
  },
};
console.log(tree);
/**
 * # Combining type definitions
 *
 * Done with `|` (OR)  or `&` (AND)
 *
 * `MyError` could be any of listed
 */
class MyErrorClass {}
type MyError = Error | MyErrorClass;

/**
 * And case `&` used to merge types into one
 */
// @playground-link
type WithNumbers = {
  one: number;
  two: number;
};
type WithStrings = {
  three: string;
  four: string;
};
type CombinedObject = WithNumbers & WithStrings;
const combined: CombinedObject = {
  one: 1,
  two: 2,
  three: "3",
  four: "4",
};
console.log(combined.one);
console.log(combined.three);
/**
 * All properties with same name will have resulting type `never`. Do not do this !
 */

/**
 * # Type vs Interface
 *
 * Type generally is used for one liners, simple cases with `|` and `&` or functions
 *
 * Interface is used for complex constructs
 */
type GoodType = string | string[] | undefined;
type GoodFunctionType = (a: string, b: string) => string;
interface GoodDataInterface {
  customerId: number;
  age: number;
  email: string;
}
/**
 * # Interface
 *
 * Could have optional properties
 */
interface WithOptionalProps {
  definitelyHere: number;
  goodDefinedOptional?: string; // prefer this way to define optional
  notSoGood: string | undefined;
}
/**
 * Represent partially undefined shape.
 * `userId` should be there and everything else could present but not required to know how it is looks like
 */
interface JsonDecodedData {
  userId: string;
  [anyNameHere: string]: any;
}
/**
 * Usually keys are of type`string`. `number` is also allowed but it is not convenient to use it.
 *
 * Common use case is to parse json body and pass it to next service
 */
const body = `{"userId": "1", "age":21, "name":"Bob"}`;
const apiRequest = JSON.parse(body) as JsonDecodedData;
if (apiRequest.userId !== undefined) {
  console.log(apiRequest);
}

/**
 * # Extend interface
 */
interface Base {
  length: number;
}
interface Coordinate {
  x: number;
  y: number;
}
/**
 * New interface extending others and adding additional properties
 */
interface Field extends Base, Coordinate {
  name: string;
}
const myField: Field = {
  length: 100,
  x: 10,
  y: 20,
  name: "My stuff",
};
/**
 * New interface extending others but without any additional properties
 */
interface NoNameField extends Base, Coordinate {}
const somebodyField: NoNameField = {
  length: 100,
  x: 10,
  y: 20,
};
/**
 * Could be also defined by `type`
 */
type NoNameFieldType = Base & Coordinate;

/**
 * Interface could force readonly properties
 */
interface TryToAssign {
  a?: number;
  readonly b: string;
}
const readOnlyObject: TryToAssign = { b: "b" };
readOnlyObject.a = 10;
/**
 * This will not work: `readOnlyObject.b = "10"`
 */
