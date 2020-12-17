/**
 * Practical lesson for https://omakoleg.github.io/typescript-practices/pages/topics/errors.html
 */
describe("[errors] lessons/topics/errors.test.ts", () => {
  it("1. Catching error and retrieving error message", () => {
    let message;
    try {
      JSON.parse("x");
    } catch (e) {
      message = e.toString();
    }
    // TODO: provide correct message
    expect(message).toBe("SyntaxError: ");
  });

  it("2. Catching custom errors", () => {
    // TODO: Finish custom error Implementation by providing error `name` and `message`
    class MyError extends Error {}
    let error;
    try {
      throw new MyError("My error");
    } catch (e) {
      error = e;
    }
    // TODO: Fix expectation
    expect(error.name).toBe("MyError");
    expect(error.message).toBe("My error");
    expect(error).toBeInstanceOf(MyError);
  });

  it("3. Selectively process errors", () => {
    let count = 0;
    const countOnlyRangeErrors = (error: any) => {
      /**TODO: Implement function to increment `count` only for `RangeError`s using `instanceof` */
    };
    try {
      throw new RangeError("Out of range");
    } catch (e) {
      countOnlyRangeErrors(e);
    }
    try {
      throw new TypeError("My my kind");
    } catch (e) {
      countOnlyRangeErrors(e);
    }
    expect(count).toBe(1);
  });
});
