/**
 * Tuple destructuring
 */
const tuple: [string, number, boolean] = ["awerqwer", 1, false];

const [e1, b2, c3] = tuple;
const [firstOnly] = tuple;
const [, secondElement] = tuple;
const [first, , last] = tuple;
// Not really convenient, easy to make `commas` mistake
const [, , last_only] = tuple;

/* sample: take part of tuple into another type */
const [head, ...tail] = tuple;

/* sample: return multiple values from function */
const someValidation = (): [Object?, string[]?] => [{}];
const [result, maybeErrors] = someValidation();

/**
 * For arrays looks the same
 */
const numbersArray = [1, 2, 3, 4, 5];
const [arrayHead, ...arrayTail] = numbersArray;

/**
 * Object destructuring
 */
interface DestroyMe {
  error: string;
  data: number;
  probably?: number;
}
const { error, data, probably } = {} as DestroyMe;

/* sample:  Deep */
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

/* sample:  Change name */
const {
  message: someMessage,
  data: { a: aOther },
} = {} as DestroyMeDeep;

/**
 * Common use cases
 */
// pick one property
interface ApplicationConfig {
  database: Object;
  api: Object;
  logger: Object;
}
const { api } = {} as ApplicationConfig;
