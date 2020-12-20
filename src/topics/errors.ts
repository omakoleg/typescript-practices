/**
 * ## Errors
 *
 * There are multiple strategies how to handle an error.
 *
 * It is always performed by `try-catch` statement.
 *
 * > Remember: Async function invoking will throw rejected value. It can be captured by try-catch
 *
 * [Read more at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
 *
 * ### Catch all
 */
// @playground-link
function throwError() {
  try {
    throw new Error("My Error");
  } catch (e) {
    console.log(e);
  }
}
throwError();
/**
 * ### Re-throwing errors
 *
 * In some cases you can expect some error, perform an action and throw the same error to be processed
 * on higher levels.
 */
// @playground-link
function reThrow() {
  try {
    throw new Error("My Error");
  } catch (e) {
    console.log(`Error happened: ${e}`);
    throw e;
  }
}
reThrow();
/**
 * ### Catching only subset
 *
 * You can filter out only necessary errors in `catch` using `instanceof`
 */
// @playground-link
function filterErrorInstanceOf() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(`Expected type error: ${e}`);
    } else if (e instanceof RangeError) {
      console.log(`Expected range error: ${e}`);
    } else {
      // re-throw all others
      throw e;
    }
  }
}
filterErrorInstanceOf();

/**
 * Or as variation use `switch` case:
 */
// @playground-link
function filterErrorSwitch() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    switch (e.constructor) {
      case TypeError:
      case RangeError:
        console.log(`Expected error: ${e}`);
        break;
      default:
        throw e;
    }
  }
}
filterErrorSwitch();

/**
 * ### Use finally
 *
 * `finally` is called each time after `try` or `catch` been called, regardless of thrown exceptions
 */
function errorFinally() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(`Expected type error: ${e}`);
      throw e;
    }
  } finally {
    console.log("I will be called always");
  }
}
errorFinally();

/**
 * ### Custom Errors
 *
 * Custom errors can be thrown as well. To be able to do it, just extend `Error` class, and throw newly created instance.
 *
 * > Remember: Do not `throw` anything except Error or it's subclasses
 */
// @playground-link
class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
const invalidValue = 100;
try {
  if (invalidValue > 0) {
    throw new InvalidInputError("Some field is not valid");
  }
} catch (e) {
  console.log(e.name); // InvalidInputError
  console.log(e.message); // Some field is not valid
  console.log(e.stack);
  // Some field is not valid
  // Error
  //    at new InvalidInputError (...)
  //    at eval (...)
  console.log(`Error happened: ${e}`); // Error happened: InvalidInputError: Some field is not valid
}
