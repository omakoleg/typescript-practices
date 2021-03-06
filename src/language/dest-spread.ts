/**
 * # Destructuring
 *
 * Generally it is operation when complex object split into pieces and assigned to variables
 *
 * ## Tuples
 */
const tuple: [string, number, boolean] = ["test", 1, true];
/**
 * All elements
 */
const [e1, b2, c3] = tuple;
/**
 * taking only some of elements
 */
const [firstOnly] = tuple;
const [, secondElement] = tuple;
const [first, , last] = tuple;
/**
 * Not really convenient and easy to make "commas" mistake when trying to take only last element
 */
const [, , last_only] = tuple;
/**
 * In combination with `spread` operator could take part of tuple into another tuple
 *
 * `tail` will be tuple: `[number, boolean]`
 */
const [head, ...tail] = tuple;

/**
 * Common use case: return multiple values from a function
 */
const someValidation = (): [Object?, string[]?] => [{}];
const [result, maybeErrors] = someValidation();

/**
 * For arrays destructuring looks the same
 */
const numbersArray = [1, 2, 3, 4, 5];
const [arrayHead, ...arrayTail] = numbersArray;

/**
 * # Object destructuring
 *
 * Allows to assign one or more values based on object properties
 */
interface SplitIntoPieces {
  error: string;
  data: number;
  probably?: number;
}
const { error, data, probably } = {} as SplitIntoPieces;

/**
 * Destructuring deep properties
 */
interface DestroyMeDeep {
  message: string;
  data: {
    a: string;
    b: number;
  };
}
const {
  data: { a, b },
} = {} as DestroyMeDeep;

/**
 * Destructuring with changing parameter name
 */
const {
  message: someMessage,
  data: { a: aOther },
} = {} as DestroyMeDeep;

/**
 * Destructuring: Common use case
 * Provide Dependency container to your application and pick services when they needed
 */
interface ApplicationConfig {
  database: Object;
  api: Object;
  logger: Object;
  config: Object;
}
const applicationConfigInstance = {
  database: {},
  api: {},
  logger: {},
  config: {},
};
const { api } = applicationConfigInstance;

/**
 * # Spread operator
 *
 * ## In functions
 *
 * It is opposite of destructuring
 *
 * Spread of function arguments from the tuple.
 * All parameters are required and tuple has fixed length, it is perfect match
 */
const args: [number, number, string] = [1, 2, "3"];
function spreadTuple(a: number, b: number, c: string): void {}
spreadTuple(...args);

/**
 * From an array.
 *
 * Array has more elements, so remaining will be ignored.
 *
 * Also due to array variable nature all function parameters should be optional and match type
 */
const args2 = [1, 2, 3, 4];
function spreadAccept(a?: number, b?: number): void {}
spreadAccept(...args2);

/**
 * Spread as function parameter
 *
 * `console.log` is the most common example of this practice
 */
function acceptAll(...strings: string[]): void {}
acceptAll("a", "b", "c");

/**
 * ## In objects
 *
 * Could add properties from one object into another (merge).
 *
 * Usually used as alternative to `Object.assign()`
 */
interface BaseProperties {
  a: number;
  b: number;
  c: number;
}
interface ExtendedProperties extends BaseProperties {
  run: () => void;
}
const dataObject = {
  a: 1,
  b: 2,
  c: 3,
};
const extendedDataObject: ExtendedProperties = {
  run: () => console.log("Running"),
  ...dataObject,
};
/**
 * Important to keep spreads order.
 *
 * Often used to define `default` values
 */
const defaultUser = {
  name: "default name",
  email: "default email",
};
const apiRequestData = {
  name: "Test",
  age: 21,
};
const resultingUser = {
  userId: "abc",
  ...defaultUser,
  ...apiRequestData,
};
/**
 * will result in:
 */
const resultingUserShape = {
  userId: "abc",
  name: "Test",
  age: 21,
  email: "default email",
};
/**
 * Spread deep properties
 *
 * Each object should be specified explicitly like `address` here
 */
interface DeepProperties {
  name: string;
  names: string[];
  age: number;
  address: {
    country: string;
    city: string;
    street: string;
  };
}
const userA: DeepProperties = {} as DeepProperties;
const userB: DeepProperties = {} as DeepProperties;

const resultingUserAB: DeepProperties = {
  ...userA,
  ...userB,
  // merge arrays manually
  names: [...userA.names, ...userB.names],
  // merge "deep" objects manually
  address: {
    ...userA.address,
    ...userB.address,
  },
};
